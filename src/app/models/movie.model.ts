/** Película tal como aparece en una lista de TMDB. */
export interface Movie {
  id: number;
  title: string;
  original_title: string;
  overview: string;
  poster_path: string | null;
  backdrop_path: string | null;
  release_date: string;
  vote_average: number;
  vote_count: number;
}

/** Respuesta paginada del endpoint /movie/top_rated. */
export interface MovieListResponse {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
}

export interface Genre {
  id: number;
  name: string;
}

/** Respuesta del endpoint /movie/{movie_id}. */
export interface MovieDetail extends Movie {
  genres: Genre[];
  runtime: number | null;
  tagline: string;
  status: string;
  homepage: string;
  original_language: string;
}
