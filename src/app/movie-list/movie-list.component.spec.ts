import { TestBed } from '@angular/core/testing';
import { of, throwError } from 'rxjs';
import { MovieService } from '../services/movie.service';
import { detallePrueba, respuestaPrueba } from '../testing/datos-prueba';
import { MovieListComponent } from './movie-list.component';

function crear(servicio: Partial<MovieService>) {
  TestBed.configureTestingModule({
    imports: [MovieListComponent],
    providers: [{ provide: MovieService, useValue: servicio }],
  });
  return TestBed.createComponent(MovieListComponent);
}

const servicioFalso = (): Partial<MovieService> => ({
  obtenerMejorValoradas: () => of(respuestaPrueba),
  obtenerDetalle: () => of(detallePrueba),
  urlImagen: (ruta) => (ruta ? 'https://imagen' + ruta : null),
});

describe('MovieListComponent', () => {
  it('debe mostrar una tarjeta por cada película que devuelve el servicio', async () => {
    const fixture = crear(servicioFalso());
    await fixture.whenStable();
    const html = fixture.nativeElement as HTMLElement;

    expect(html.querySelectorAll('.pelicula').length).toBe(2);
    expect(html.textContent).toContain('El padrino');
    expect(html.querySelector('.pelicula__poster--vacio')).toBeTruthy(); // la 2.ª película no tiene póster
  });

  it('debe mostrar el mensaje de error y permitir reintentar', async () => {
    const fixture = crear({ ...servicioFalso(), obtenerMejorValoradas: () => throwError(() => new Error('fallo')) });
    await fixture.whenStable();
    expect(fixture.nativeElement.querySelector('.mensaje--error')).toBeTruthy();
    expect(fixture.nativeElement.querySelectorAll('.pelicula').length).toBe(0);
  });

  it('debe cargar la siguiente página y agregar las películas a la lista', async () => {
    const fixture = crear(servicioFalso());
    await fixture.whenStable();
    expect(fixture.componentInstance.hayMasPaginas()).toBe(true);

    fixture.componentInstance.cargarSiguientePagina();
    await fixture.whenStable();
    expect(fixture.componentInstance.peliculas().length).toBe(4);
  });

  it('debe mostrar el componente de detalle al presionar una película (padre e hijo)', async () => {
    const fixture = crear(servicioFalso());
    await fixture.whenStable();
    const html = fixture.nativeElement as HTMLElement;
    expect(html.querySelector('app-movie-detail')).toBeNull();

    (html.querySelector('.pelicula__boton') as HTMLButtonElement).click();
    await fixture.whenStable();

    expect(fixture.componentInstance.idSeleccionado()).toBe(278);
    expect(html.querySelector('app-movie-detail')).toBeTruthy();
    expect(html.querySelector('app-movie-detail h2')?.textContent).toContain('Cadena perpetua');

    (html.querySelector('.panel__cerrar') as HTMLButtonElement).click();
    await fixture.whenStable();
    expect(html.querySelector('app-movie-detail')).toBeNull();
  });
});
