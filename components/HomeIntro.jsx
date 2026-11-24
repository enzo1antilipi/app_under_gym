import React from 'react';
import styles from './HomeIntro.module.css';

export default function HomeIntro() {
  return (
    <div className={styles.container}>
      {/* 1. Título principal */}
      <h1 className={styles.title}>¿Cómo estuvo tu clase?</h1>

      {/* 2. Subtítulo */}
      <p className={styles.subtitle}>Calificá tu experiencia de hoy</p>
      
      {/* 3. Opción de botón "Entrené solo" */}
      <button className={styles.optionButton}>
        Entrené solo
      </button>

      {/* 4. Texto aclaratorio */}
      <p className={styles.helperText}>Por favor, selecciona una opción para continuar.</p>

      {/* 5. Separador "O calificá tu profe" */}
      <div className={styles.separatorContainer}>
        <hr className={styles.line} />
        <span className={styles.separatorText}>O calificá tu profe</span>
        <hr className={styles.line} />
      </div>
    </div>
  );
}