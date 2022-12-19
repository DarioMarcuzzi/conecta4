import React, { useState, useEffect } from "react";
import { IoIosCloseCircleOutline, IoMdWarning } from "react-icons/io";
import { IoIosCheckmarkCircleOutline } from "react-icons/io";
import { BsFillBackspaceFill } from "react-icons/bs";
import Home from "../Home.jsx";
import Fondo from "../fondo/Fondo.jsx";

import Swal from "sweetalert2";
import { BsFillInfoCircleFill } from "react-icons/bs";
import "./landing.css";

const regex = /^[a-zA-Z]+ ?$/g;

function Landing() {
  const [jugadores, setJugadores] = useState({
    jugador1: "",
    jugador2: "",
  });

  const [state, setState] = useState(0);

  const handeName = (e) => {
    if (e.target.value.match(regex)) {
      setJugadores({
        ...jugadores,
        [e.target.name]: e.target.value.toUpperCase(),
      });
    } else {
      setJugadores({
        ...jugadores,
        [e.target.name]: false,
      });
    }
  };
  const info = () => {
    Swal.fire({
      title: "Informacion del juego",
      text: "Las reglas son simples, gana el que ponga primero 4 fichas en linea en vertical o en diagonal, el tablero se llena de abajo hacia arriba y los turnos se alternan entre los dos jugadores. Buena Suerte!",
      icon: "warning",
      button: "aceptar",
    });
  };

  const changeStado = (e) => {
    console.log("hola");
    if (e.target.name === "play") {
      Swal.fire({
        title: `Listos para Jugar ${jugadores.jugador1} y ${jugadores.jugador2}!`,
        icon: "success",
        button: "aceptar",
      });
      setState(3);
    } else {
      setState(1);
    }
  };

  const back = () => {
    setState(0);
    setJugadores({
      jugador1: "",
      jugador2: "",
    });
  };

  const vsPc = () => {
    Swal.fire({
      title: "Oops",
      text: "Proximamente disponible",
      icon: "warning",
      button: "acepta",
    });
  };

  if (state === 0) {
    return (
      <div className="contenedor-landing">
        <Fondo />
        <div className="contenedor-landinga">
          <button className="btn" onClick={info}>
            <BsFillInfoCircleFill />
          </button>
          <div className="opcionesDeJuego">
            <button className="btn" onClick={vsPc}>
              {" "}
              Jugador1 vs Pc
            </button>
            <button onClick={changeStado} className="btn">
              {" "}
              Jugador1 vs Jugador2
            </button>
          </div>
        </div>
      </div>
    );
  }
  if (state === 1) {
    return (
      <div className="contenedor-landing">
        <Fondo />
        <div className="contenedor-landinga">
          <div className="btns">
            <button className="btn" onClick={back}>
              {" "}
              <BsFillBackspaceFill />
            </button>
            <button className="btn" onClick={info}>
              <BsFillInfoCircleFill />
            </button>
          </div>
          <div className="opcionesDeJuego">
            <label>
              Jugador 1{" "}
              <input
                type="text"
                placeholder="nombre de jugador "
                onChange={handeName}
                name="jugador1"
              />
              {jugadores.jugador1 === false || jugadores.jugador1 === "" ? (
                <label className="error">
                  <IoIosCloseCircleOutline />
                </label>
              ) : (
                <label className="good">
                  <IoIosCheckmarkCircleOutline />
                </label>
              )}
            </label>
            <label>
              Jugador 2{" "}
              <input
                type="text"
                placeholder="nombre de jugador "
                onChange={handeName}
                name="jugador2"
              />
              {jugadores.jugador2 === false || jugadores.jugador2 === "" ? (
                <label className="error">
                  <IoIosCloseCircleOutline />
                </label>
              ) : (
                <label className="good">
                  <IoIosCheckmarkCircleOutline />
                </label>
              )}
            </label>

            <button
              className="btn"
              name="play"
              onClick={changeStado}
              disabled={
                jugadores.jugador1 === false ||
                jugadores.jugador2 === false ||
                jugadores.jugador1 === "" ||
                jugadores.jugador2 === ""
              }
            >
              {" "}
              PLay
            </button>
          </div>
        </div>
      </div>
    );
  }
  if (state === 3) {
    return <Home jugadores={jugadores} />;
  }
}

export default Landing;
