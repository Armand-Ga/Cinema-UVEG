import { DatePipe, DecimalPipe, NgFor, NgIf } from '@angular/common';
import { Component, inject, input, output } from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { catchError, map, of, startWith, switchMap } from 'rxjs';
import { MovieDetail } from '../models/movie.model';
import { MovieService } from '../services/movie.service';

interface EstadoDetalle {
  cargando: boolean;
  error: boolean;
  pelicula: MovieDetail | null;
}

@Component({
  imports: [NgIf, NgFor, DatePipe, DecimalPipe],
  selector: 'app-movie-detail',
  styleUrl: './movie-detail.component.css',
  templateUrl: './movie-detail.component.html',
})
export class MovieDetailComponent {
  private readonly servicio = inject(MovieService);

  /** Entrada: identificador de la película que envía el componente padre. */
  readonly movieId = input.required<number>();

  /** Salida: avisa al padre que el usuario cerró el detalle. */
  readonly cerrar = output<void>();

  /** Cada vez que cambia movieId se consulta el detalle en la API (switchMap cancela la consulta anterior). */
  readonly estado = toSignal(
    toObservable(this.movieId).pipe(
      switchMap((id) =>
        this.servicio.obtenerDetalle(id).pipe(
          map((pelicula): EstadoDetalle => ({ cargando: false, error: false, pelicula })),
          startWith<EstadoDetalle>({ cargando: true, error: false, pelicula: null }),
          catchError(() => of<EstadoDetalle>({ cargando: false, error: true, pelicula: null })),
        ),
      ),
    ),
    { initialValue: { cargando: true, error: false, pelicula: null } as EstadoDetalle },
  );

  imagen(pelicula: MovieDetail): string | null {
    return this.servicio.urlImagen(pelicula.poster_path, 'w500');
  }

  cerrarDetalle(): void {
    this.cerrar.emit();
  }
}
