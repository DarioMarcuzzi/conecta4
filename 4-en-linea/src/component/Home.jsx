import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import "./home.css";

function Home({ jugadores }) {
  const [jugadas1, setJugadas1] = useState(0);
  const [jugadas2, setJugadas2] = useState(0);
  const [jugador, setJugador] = useState(1);
  const [ganadasJugador1, setGanadasJugador1] = useState(0);
  const [ganadasJugador2, setGanadasJugador2] = useState(0);
  const [ganador, setGanador] = useState(0);
  const [tablero, setTablero] = useState([
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
  ]);

  useEffect(() => {
    let jugadasTotal = jugadas1 + jugadas2;

    if (jugadasTotal < 42) {
      setGanador(checkGanador());
      if (ganador === 1) {
        setJugador(1);
        Swal.fire({
          title: `Has ganado ${jugadores.jugador1}!`,
          icon: "success",
          confirmButtonText: "aceptar",
        }).then((result) => {
          if (result.isConfirmed) {
            setGanadasJugador1(ganadasJugador1 + 1);
            setGanador(0);
            resetTablero();
          } else {
            setGanadasJugador2(ganadasJugador2 + 1);
            setGanador(0);
            resetTablero();
          }
        });
      } else if (ganador === 2) {
        setJugador(2);
        Swal.fire({
          title: `Has ganado ${jugadores.jugador2}!`,
          icon: "success",
          confirmButtonText: "aceptar",
        }).then((result) => {
          if (result.isConfirmed) {
            setGanadasJugador2(ganadasJugador2 + 1);
            setGanador(0);
            resetTablero();
          } else {
            setGanadasJugador2(ganadasJugador2 + 1);
            setGanador(0);
            resetTablero();
          }
        });
      }
    } else {
      setGanadasJugador1(ganadasJugador1 + 1);
      setGanadasJugador2(ganadasJugador2 + 1);
      Swal.fire({
        title: "Empate!!",
        icon: "warning",
        text: "Se les dara un punto a cada uno.",
        confirmButtonText: "aceptar",
      }).then((result) => {
        if (result.isConfirmed) {
          setGanadasJugador1(ganadasJugador1 + 1);
          setGanadasJugador2(ganadasJugador2 + 1);
          setGanador(0);
          resetTablero();
        } else {
          setGanador(0);
          resetTablero();
        }
      });
      // resetTablero();
    }
  }, [jugador, ganador]);

  const changeCelda = (f, c) => {
    let cantFilas = tablero.length - 1;

    for (let i = cantFilas; i >= tablero.length - 6; i--) {
      if (tablero[i][c] === 0) {
        if (jugador === 1) {
          tablero[i][c] = 1;
          setJugadas1(jugadas1 + 1);
          setJugador(2);
        } else {
          tablero[i][c] = 2;
          setJugadas2(jugadas2 + 1);
          setJugador(1);
        }

        break;
      } else {
        continue;
      }
    }
  };

  const checkGanador = () => {
    let ganador = 0;
    for (let i = 0; i < 6; i++) {
      for (let j = 0; j < 7; j++) {
        if (tablero[i][j] !== 0) {
          if (i <= 2) {
            if (
              tablero[i][j] === tablero[i + 1][j] &&
              tablero[i][j] === tablero[i + 2][j] &&
              tablero[i][j] === tablero[i + 3][j]
            ) {
              ganador = tablero[i][j];
            }
          }
          if (j <= 3) {
            if (
              tablero[i][j] === tablero[i][j + 1] &&
              tablero[i][j] === tablero[i][j + 2] &&
              tablero[i][j] === tablero[i][j + 3]
            ) {
              ganador = tablero[i][j];
            }
          }
          if (i <= 2 && j <= 3) {
            if (
              tablero[i][j] === tablero[i + 1][j + 1] &&
              tablero[i][j] === tablero[i + 2][j + 2] &&
              tablero[i][j] === tablero[i + 3][j + 3]
            ) {
              ganador = tablero[i][j];
            }
          }
          if (i >= 3 && j <= 3) {
            if (
              tablero[i][j] === tablero[i - 1][j + 1] &&
              tablero[i][j] === tablero[i - 2][j + 2] &&
              tablero[i][j] === tablero[i - 3][j + 3]
            ) {
              ganador = tablero[i][j];
            }
          }
        }
      }
    }

    return ganador;
  };

  const resetTablero = () => {
    setTablero([
      [0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0],
    ]);
    setJugadas1(0);
    setJugadas2(0);

    setJugador(1);
  };

  const resetGame = () => {
    Swal.fire({
      title: "Esta seguro?",
      text: "Esta a punto de reiniciar el tablero",
      showCancelButton: true,
      confirmButtonText: "Si",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire("Listo!", "", "success");
        setGanadasJugador1(0);
        setGanadasJugador2(0);
        resetTablero();
      } else if (result.isDenied) {
        Swal.fire("Changes are not saved", "", "info");
      }
    });
  };

  return (
    <div className="contenedor-principal">
      <div className="menu">
        <div
          className={jugador === 1 ? "jugador1-activo" : "jugador1-inactivo"}
        >
          <strong>{jugadores.jugador1}</strong>
          <ul>
            <li>Fichas jugadas: {jugadas1}</li>
            <li>Juegos ganados: {ganadasJugador1}</li>
          </ul>
        </div>
        <div
          className={jugador === 2 ? "jugador2-activo" : "jugador2-inactivo"}
        >
          <strong> {jugadores.jugador2}</strong>
          <ul>
            <li>Fichas jugadas: {jugadas2}</li>
            <li>Juegos ganados: {ganadasJugador2}</li>
          </ul>
        </div>
      </div>
      <div className="contenedor-juego">
        <div className="header"></div>
        <div className="juego">
          {tablero?.map((fila, f) => {
            return fila?.map((celda, c) => {
              return (
                <div className="celda">
                  <button
                    className={
                      celda === 1
                        ? "btn-jugador1"
                        : celda === 2
                        ? "btn-jugador2"
                        : "btn-comun"
                    }
                    onClick={() => changeCelda(f, c)}
                  ></button>
                </div>
              );
            });
          })}
        </div>

        <button className="btn" onClick={resetGame}>
          Reiniciar contadores
        </button>
      </div>
    </div>
  );
}

export default Home;
