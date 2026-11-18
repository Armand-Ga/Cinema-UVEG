import { DatePipe, DecimalPipe, NgFor, NgIf } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { Movie } from '../models/movie.model';
import { MovieDetailComponent } from '../movie-detail/movie-detail.component';
import { MovieService } from '../services/movie.service';

@Component({
  imports: [NgFor, NgIf, DatePipe, DecimalPipe, MovieDetailComponent],
  selector: 'app-movie-list',
  styleUrl: './movie-list.component.css',
  templateUrl: './movie-list.component.html',
})
export class MovieListComponent {
  private readonly servicio = inject(MovieService);

  readonly peliculas = signal<Movie[]>([]);
  readonly cargando = signal(false);
  readonly error = signal(false);
  readonly paginaActual = signal(0);
  readonly totalPaginas = signal(1);

  /** Identificador de la película que el usuario presionó (null = ninguna). */
  readonly idSeleccionado = signal<number | null>(null);

  constructor() {
    this.cargarSiguientePagina();
  }

  cargarSiguientePagina(): void {
    if (this.cargando()) {
      return;
    }
    this.cargando.set(true);
    this.error.set(false);

    this.servicio.obtenerMejorValoradas(this.paginaActual() + 1).subscribe({
      next: (respuesta) => {
        this.peliculas.update((lista) => [...lista, ...respuesta.results]);
        this.paginaActual.set(respuesta.page);
        this.totalPaginas.set(respuesta.total_pages);
        this.cargando.set(false);
      },
      error: () => {
        this.error.set(true);
        this.cargando.set(false);
      },
    });
  }

  hayMasPaginas(): boolean {
    return this.paginaActual() < this.totalPaginas();
  }

  imagen(pelicula: Movie): string | null {
    return this.servicio.urlImagen(pelicula.poster_path, 'w342');
  }

  seleccionar(id: number | null): void {
    this.idSeleccionado.set(id);
  }
}
