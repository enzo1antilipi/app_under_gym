'use client';
import { useState } from 'react';

export default function AdminRatingsClient({ initialRatings }) {
  // Estado con los datos hardcodeados
  const [ratings, setRatings] = useState(initialRatings || []);

  // Estados para los Filtros
  const [filtroProfesor, setFiltroProfesor] = useState('');
  const [filtroPuntuacion, setFiltroPuntuacion] = useState('');
  const [filtroEstado, setFiltroEstado] = useState('');

  // ---------------------------------------------------------------------------
  // ACCIONES: Aprobar, Ocultar y Eliminar con confirmación
  // ---------------------------------------------------------------------------
  const handleAprobar = (id) => {
    setRatings(ratings.map(r => r.id === id ? { ...r, status: 'approved' } : r));
  };

  const handleOcultar = (id) => {
    setRatings(ratings.map(r => r.id === id ? { ...r, status: 'hidden' } : r));
  };

  const handleEliminar = (id) => {
    // Confirmación antes de eliminar
    const confirmacion = window.confirm("¿Estás seguro de que deseas eliminar esta calificación?");
    if (confirmacion) {
      setRatings(ratings.filter(r => r.id !== id));
    }
  };

  // ---------------------------------------------------------------------------
  // FILTRADO: Por profesor, puntuación y estado
  // ---------------------------------------------------------------------------
  const filteredRatings = ratings.filter(r => {
    const matchProfesor = r.professorName.toLowerCase().includes(filtroProfesor.toLowerCase());
    const matchPuntuacion = filtroPuntuacion ? r.score === Number(filtroPuntuacion) : true;
    const matchEstado = filtroEstado ? r.status === filtroEstado : true;
    return matchProfesor && matchPuntuacion && matchEstado;
  });

  return (
    <div style={{ marginTop: '20px' }}>
      {/* 1. COMPONENTE DE FILTROS */}
      <div style={{ display: 'flex', gap: '10px', marginBottom: '20px', flexWrap: 'wrap' }}>
        <input 
          type="text" 
          placeholder="Filtrar por profesor..." 
          value={filtroProfesor}
          onChange={(e) => setFiltroProfesor(e.target.value)}
          style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
        />

        <select 
          value={filtroPuntuacion} 
          onChange={(e) => setFiltroPuntuacion(e.target.value)}
          style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
        >
          <option value="">Todas las puntuaciones</option>
          <option value="5">5 Estrellas</option>
          <option value="4">4 Estrellas</option>
          <option value="3">3 Estrellas</option>
          <option value="2">2 Estrellas</option>
          <option value="1">1 Estrella</option>
        </select>

        <select 
          value={filtroEstado} 
          onChange={(e) => setFiltroEstado(e.target.value)}
          style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
        >
          <option value="">Todos los estados</option>
          <option value="approved">Aprobado</option>
          <option value="pending">Pendiente</option>
          <option value="hidden">Oculto</option>
        </select>
      </div>

      {/* 2. ESTADO DE LISTA VACÍA */}
      {filteredRatings.length === 0 ? (
        <p style={{ padding: '20px', backgroundColor: '#f9f9f9', borderRadius: '5px' }}>
          No se encontraron calificaciones con los filtros seleccionados.
        </p>
      ) : (
        /* 3. TABLA DE CALIFICACIONES */
        <table border="1" cellPadding="10" style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead>
            <tr style={{ backgroundColor: '#f0f0f0' }}>
              <th>Profesor</th>
              <th>Puntuación</th>
              <th>Estado</th>
              <th>Comentario, Fecha y Autor</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {filteredRatings.map((rating) => (
              <tr key={rating.id}>
                <td><strong>{rating.professorName}</strong></td>
                <td>{rating.score} / 5 ⭐</td>
                <td>
                  <span style={{ 
                    padding: '3px 8px', 
                    borderRadius: '4px',
                    fontSize: '12px',
                    backgroundColor: rating.status === 'approved' ? '#d4edda' : rating.status === 'hidden' ? '#e2e3e5' : '#fff3cd'
                  }}>
                    {rating.status}
                  </span>
                </td>
                {/* Mostrar comentario, fecha y autor */}
                <td>
                  <p style={{ margin: '0 0 5px 0' }}>"{rating.comment}"</p>
                  <small style={{ color: '#666' }}>
                    Por: <strong>{rating.author}</strong> | Fecha: {rating.date || 'Sin fecha'}
                  </small>
                </td>
                {/* Acciones */}
                <td>
                  <button onClick={() => handleAprobar(rating.id)} style={{ marginRight: '5px', cursor: 'pointer' }}>Aprobar</button>
                  <button onClick={() => handleOcultar(rating.id)} style={{ marginRight: '5px', cursor: 'pointer' }}>Ocultar</button>
                  <button onClick={() => handleEliminar(rating.id)} style={{ backgroundColor: '#ff4d4d', color: 'white', border: 'none', padding: '5px 10px', borderRadius: '3px', cursor: 'pointer' }}>Eliminar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}