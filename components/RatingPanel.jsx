"use client";

import Link from "next/link";
import estilos from "./RatingPanel.module.css";
import { useState } from "react"; //Tarea 5 para el ESTADO

export default function RatingPanel({ professor }) {
  const inicial = professor.name.charAt(0);
  
  const [puntuacion, setPuntuacion] = useState(0); //Tarea 5
  const [enviado, setEnviado] = useState(false); //Tarea 5

  function enviarCalificacion() {
    setEnviado(true);
  }

  return (
    <section className={estilos.panel}>

       <Link href="/" className={estilos.backButton}>← Volver</Link>

        <header className={estilos.profesor}>
          <span className={estilos.inicial}>{inicial}</span>
          <h1>{professor.name}</h1>
          <p>{professor.area}</p>
        </header>

        <h2 className={estilos.pregunta}>¿Cómo fue la clase hoy?</h2>

        <div className={estilos.estrellas}> 
          {[1, 2, 3, 4, 5].map((numero) => (
            <button
              key={numero}
              type="button"
              className={numero <= puntuacion ? estilos.estrellaActiva : estilos.estrella}
              onClick={() => setPuntuacion(numero)}
            >
              {numero <= puntuacion ? "★" : "☆"}
            </button>
          ))}
        </div>

        <p className={estilos.puntuacionTexto}>
          {puntuacion === 0 ? "Tocá una estrella" : `Elegiste ${puntuacion} de 5`}
        </p>

      <button
        type="button"
        className={estilos.enviarButton}
        onClick={enviarCalificacion}
        disabled={puntuacion === 0}
      >
        Enviar calificación
      </button>

      {enviado && (
        <p className={estilos.gracias}>¡Gracias! Registramos tu calificación.</p>
      )}

    </section>
  );
}
