import { Component } from '@angular/core';

import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  welcome = 'Bienvenido a Todo-App';
  tasks = [
    'Intalar Angular CLI',
    'Crear proyecto',
    'Crear componentes'
  ]
}
