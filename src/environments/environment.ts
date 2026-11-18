// Configuración de la API de TMDB.
// Escribe aquí tu clave. Usa UNA de las dos opciones:
//  - accessToken: "Token de acceso de lectura a la API" (recomendado por TMDB, se envía en el encabezado Authorization)
//  - apiKey: "Clave de API" v3 (se envía como parámetro api_key en la URL)
export const environment = {
  apiUrl: 'https://api.themoviedb.org/3',
  imageUrl: 'https://image.tmdb.org/t/p',
  accessToken: '',
  apiKey: '',
  idioma: 'es-MX',
};
