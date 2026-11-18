import { TestBed } from '@angular/core/testing';
import { of, throwError } from 'rxjs';
import { MovieService } from '../services/movie.service';
import { detallePrueba } from '../testing/datos-prueba';
import { MovieDetailComponent } from './movie-detail.component';

function crear(servicio: Partial<MovieService>) {
  TestBed.configureTestingModule({
    imports: [MovieDetailComponent],
    providers: [{ provide: MovieService, useValue: servicio }],
  });
  const fixture = TestBed.createComponent(MovieDetailComponent);
  fixture.componentRef.setInput('movieId', 278);
  return fixture;
}

describe('MovieDetailComponent', () => {
  it('debe mostrar el detalle de la película recibida', async () => {
    const fixture = crear({ obtenerDetalle: () => of(detallePrueba), urlImagen: () => 'https://imagen/p.jpg' });
    await fixture.whenStable();
    const html = fixture.nativeElement as HTMLElement;

    expect(html.querySelector('h2')?.textContent).toContain('Cadena perpetua');
    expect(html.querySelectorAll('.generos .etiqueta').length).toBe(2);
    expect(html.textContent).toContain('142 minutos');
    expect(html.querySelector('.detalle__poster')).toBeTruthy();
  });

  it('debe mostrar un mensaje si la API falla', async () => {
    const fixture = crear({ obtenerDetalle: () => throwError(() => new Error('fallo')), urlImagen: () => null });
    await fixture.whenStable();
    expect(fixture.nativeElement.querySelector('.estado--error')).toBeTruthy();
  });

  it('debe emitir el evento cerrar al presionar el botón', async () => {
    const fixture = crear({ obtenerDetalle: () => of(detallePrueba), urlImagen: () => null });
    let emitido = false;
    fixture.componentInstance.cerrar.subscribe(() => (emitido = true));
    await fixture.whenStable();

    (fixture.nativeElement.querySelector('.panel__cerrar') as HTMLButtonElement).click();
    expect(emitido).toBe(true);
  });
});
