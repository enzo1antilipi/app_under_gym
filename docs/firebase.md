# Configuración de Firebase

La aplicación utiliza Cloud Firestore mediante el SDK modular de Firebase.

## 1. Crear el proyecto

1. Crear un proyecto en Firebase Console.
2. Registrar una aplicación web.
3. Crear una base de datos Cloud Firestore.
4. Elegir una región cercana a los usuarios.

## 2. Configurar las variables

Copiar `.env.example` como `.env.local` y completar los valores del objeto de
configuración que entrega Firebase:

```bash
Copy-Item .env.example .env.local
```

Nunca subir `.env.local` al repositorio.

## 3. Crear las colecciones

### `profesores`

- `name`: string
- `subject`: string
- `area`: string
- `status`: `active` o `inactive`
- `createdAt`: timestamp
- `updatedAt`: timestamp

### `ratings`

- `professorId`: string
- `professorName`: string
- `score`: number entre 1 y 5
- `comment`: string
- `author`: string
- `status`: `pending`, `approved` o `hidden`
- `createdAt`: timestamp
- `updatedAt`: timestamp opcional

## 4. Reglas

El archivo `firestore.rules` permite leer profesores públicamente y crear una
calificación pendiente. La administración requiere un usuario autenticado con
el custom claim `admin: true`.

No usar reglas abiertas como `allow read, write: if true` en producción.

## 5. Repositorios

Los componentes deben consumir estas funciones en lugar de importar Firebase:

- `lib/repositories/professors.js`
- `lib/repositories/ratings.js`

Mientras no exista `.env.local`, las funciones de lectura conservan los datos
ficticios. Las operaciones de escritura requieren Firebase configurado.
