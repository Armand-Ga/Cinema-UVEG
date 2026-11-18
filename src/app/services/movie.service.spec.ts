import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { detallePrueba, respuestaPrueba } from '../testing/datos-prueba';
import { MovieService } from './movie.service';

describe('MovieService', () => {
  let servicio: MovieService;
  let http: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({ providers: [provideHttpClient(), provideHttpClientTesting()] });
    servicio = TestBed.inject(MovieService);
    http = TestBed.inject(HttpTestingController);
  });

  afterEach(() => http.verify());

  it('debe pedir las películas mejor valoradas a /movie/top_rated con idioma y página', () => {
    let resultado;
    servicio.obtenerMejorValoradas(2).subscribe((r) => (resultado = r));

    const peticion = http.expectOne((req) => req.url.endsWith('/movie/top_rated'));
    expect(peticion.request.method).toBe('GET');
    expect(peticion.request.params.get('page')).toBe('2');
    expect(peticion.request.params.get('language')).toBe('es-MX');
    peticion.flush(respuestaPrueba);

    expect(resultado).toEqual(respuestaPrueba);
  });

  it('debe pedir el detalle de una película a /movie/{id}', () => {
    let resultado;
    servicio.obtenerDetalle(278).subscribe((r) => (resultado = r));

    const peticion = http.expectOne((req) => req.url.endsWith('/movie/278'));
    expect(peticion.request.method).toBe('GET');
    peticion.flush(detallePrueba);

    expect(resultado).toEqual(detallePrueba);
  });

  it('debe construir la URL de la imagen y devolver null cuando no hay ruta', () => {
    expect(servicio.urlImagen('/abc.jpg', 'w342')).toBe('https://image.tmdb.org/t/p/w342/abc.jpg');
    expect(servicio.urlImagen(null)).toBeNull();
  });
});
