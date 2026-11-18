import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Service, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { MovieDetail, MovieListResponse } from '../models/movie.model';

@Service()
export class MovieService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = environment.apiUrl;

  /** Obtiene una página de las películas mejor valoradas (GET /movie/top_rated). */
  obtenerMejorValoradas(pagina = 1): Observable<MovieListResponse> {
    return this.http.get<MovieListResponse>(`${this.apiUrl}/movie/top_rated`, {
      headers: this.encabezados(),
      params: this.parametros().set('page', pagina),
    });
  }

  /** Obtiene el detalle de una película (GET /movie/{movie_id}). */
  obtenerDetalle(id: number): Observable<MovieDetail> {
    return this.http.get<MovieDetail>(`${this.apiUrl}/movie/${id}`, {
      headers: this.encabezados(),
      params: this.parametros(),
    });
  }

  /** Construye la URL completa de una imagen (póster o fondo) a partir de la ruta que devuelve TMDB. */
  urlImagen(ruta: string | null, tamano = 'w500'): string | null {
    return ruta ? `${environment.imageUrl}/${tamano}${ruta}` : null;
  }

  private encabezados(): HttpHeaders {
    let encabezados = new HttpHeaders({ accept: 'application/json' });
    if (environment.accessToken) {
      encabezados = encabezados.set('Authorization', `Bearer ${environment.accessToken}`);
    }
    return encabezados;
  }

  private parametros(): HttpParams {
    let parametros = new HttpParams().set('language', environment.idioma);
    if (!environment.accessToken && environment.apiKey) {
      parametros = parametros.set('api_key', environment.apiKey);
    }
    return parametros;
  }
}
