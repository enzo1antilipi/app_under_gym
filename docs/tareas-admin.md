# Tareas del panel de administración

Este documento separa responsabilidades para reducir conflictos entre ramas.

## Integrantes que trabajan ahora

### Módulo de profesores

- Rama sugerida: `feature/admin-profesores`.
- Trabajar principalmente en `app/admin/profesores/` y en componentes nuevos de profesores.
- Crear listado, buscador y estados vacíos.
- Agregar interfaces para crear, editar y desactivar profesores.
- Primero usar datos locales; la conexión real se incorpora cuando esté definida la capa de datos.

### Módulo de calificaciones

- Rama sugerida: `feature/admin-calificaciones`.
- Trabajar principalmente en `app/admin/calificaciones/` y en componentes nuevos de calificaciones.
- Crear listado y filtros por estado.
- Agregar interfaces para aprobar, ocultar o eliminar una calificación.
- Primero usar datos locales; la conexión real se incorpora cuando esté definida la capa de datos.

## Tareas reservadas para los dos integrantes que se sumarán después

### Integrante 3: acceso y permisos de administración

- Rama sugerida: `feature/admin-auth`.
- Implementar inicio y cierre de sesión.
- Proteger todas las rutas bajo `/admin`.
- Definir roles `admin` y `moderador`.
- Impedir que un usuario sin permisos ejecute acciones administrativas.
- Documentar las variables de entorno sin subir claves ni secretos.
- Esta tarea comienza después de elegir el proveedor de autenticación y la base de datos.

### Integrante 4: estadísticas y calidad del panel

- Rama sugerida: `feature/admin-estadisticas`.
- Reemplazar los valores temporales del resumen por métricas reales.
- Calcular votos totales, promedio general, profesor mejor puntuado y profesor más votado.
- Crear estados de carga, error y ausencia de datos.
- Agregar pruebas para los cálculos y revisar accesibilidad y diseño responsive.
- Esta tarea comienza después de integrar profesores y calificaciones con la capa de datos.

## Archivos compartidos

Los siguientes archivos deben modificarse sólo con coordinación previa:

- `app/admin/layout.jsx`
- `app/admin/page.jsx`
- `app/admin/admin.module.css`
- `components/admin/AdminSidebar.jsx`
- `components/admin/AdminStatCard.jsx`

Antes de abrir un Pull Request, cada integrante debe ejecutar:

```bash
npm run lint
npm run build
```
