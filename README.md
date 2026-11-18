# Cinema UVEG

Aplicación Angular que muestra las películas mejor valoradas usando la API de TMDB (The Movie Database).

## Requisitos

- Node.js ^22.22.3, ^24.15.0 o superior (requisito de Angular CLI 22) y npm
- Una cuenta en https://www.themoviedb.org y su clave de API

## Configuración de la clave de TMDB

1. Inicia sesión en TMDB y entra a Configuración > API para solicitar tu clave.
2. Abre `src/environments/environment.ts` y también `src/environments/environment.development.ts`.
3. Escribe tu "Token de acceso de lectura a la API" en `accessToken` (recomendado) o tu "Clave de API" v3 en `apiKey`.
4. No subas tu clave a un repositorio público.

## Cómo ejecutar el proyecto

1. `npm install`
2. `npm start` (equivale a `ng serve`)
3. Abre http://localhost:4200

## Pruebas

`npx ng test --watch=false` (las pruebas no usan internet: simulan la respuesta de la API).

## Estructura principal

- `src/app/app.component.*`: componente raíz
- `src/app/movie-list/`: MovieListComponent (lista; componente padre)
- `src/app/movie-detail/`: MovieDetailComponent (detalle; componente hijo)
- `src/app/services/movie.service.ts`: servicio con las llamadas a TMDB
- `src/app/models/movie.model.ts`: interfaces de TypeScript
- `src/environments/`: configuración de la API

Este producto utiliza la API de TMDB pero no está respaldado ni certificado por TMDB.
