import { Component } from '@angular/core';
import { MovieListComponent } from './movie-list/movie-list.component';

@Component({
  imports: [MovieListComponent],
  selector: 'app-root',
  styleUrl: './app.component.css',
  templateUrl: './app.component.html',
})
export class AppComponent {
  readonly titulo = 'Cinema UVEG';
}
