import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { detallePrueba, respuestaPrueba } from './testing/datos-prueba';

describe('AppComponent (prueba en conjunto con el servicio y la API simulada)', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent],
      providers: [provideHttpClient(), provideHttpClientTesting()],
    }).compileComponents();
  });

  it('debe crear la aplicación y mostrar el nombre', async () => {
    const fixture = TestBed.createComponent(AppComponent);
    await fixture.whenStable();
    expect(fixture.nativeElement.querySelector('h1')?.textContent).toContain('Cinema UVEG');
    expect(fixture.nativeElement.querySelector('app-movie-list')).toBeTruthy();
  });

  it('debe recorrer el flujo completo: lista, selección y detalle', async () => {
    const fixture = TestBed.createComponent(AppComponent);
    const http = TestBed.inject(HttpTestingController);
    const html = fixture.nativeElement as HTMLElement;
    await fixture.whenStable();

    // 1. La lista pide las películas mejor valoradas
    http.expectOne((r) => r.url.endsWith('/movie/top_rated')).flush(respuestaPrueba);
    await fixture.whenStable();
    expect(html.querySelectorAll('.pelicula').length).toBe(2);

    // 2. Al presionar una película, el hijo pide el detalle de esa película
    (html.querySelector('.pelicula__boton') as HTMLButtonElement).click();
    await fixture.whenStable();
    http.expectOne((r) => r.url.endsWith('/movie/278')).flush(detallePrueba);
    await fixture.whenStable();

    expect(html.querySelector('app-movie-detail h2')?.textContent).toContain('Cadena perpetua');
    http.verify();
  });
});
