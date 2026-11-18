import { Movie, MovieDetail, MovieListResponse } from '../models/movie.model';

export const peliculasPrueba: Movie[] = [
  {
    id: 278,
    title: 'Cadena perpetua',
    original_title: 'The Shawshank Redemption',
    overview: 'Un banquero es condenado por un crimen que no cometió.',
    poster_path: '/poster1.jpg',
    backdrop_path: null,
    release_date: '1994-09-23',
    vote_average: 8.7,
    vote_count: 28000,
  },
  {
    id: 238,
    title: 'El padrino',
    original_title: 'The Godfather',
    overview: 'La historia de una familia de la mafia.',
    poster_path: null,
    backdrop_path: null,
    release_date: '1972-03-14',
    vote_average: 8.7,
    vote_count: 21000,
  },
];

export const respuestaPrueba: MovieListResponse = {
  page: 1,
  results: peliculasPrueba,
  total_pages: 3,
  total_results: 60,
};

export const detallePrueba: MovieDetail = {
  ...peliculasPrueba[0],
  genres: [
    { id: 18, name: 'Drama' },
    { id: 80, name: 'Crimen' },
  ],
  runtime: 142,
  tagline: 'El miedo te mantiene prisionero. La esperanza puede liberarte.',
  status: 'Released',
  homepage: '',
  original_language: 'en',
};
