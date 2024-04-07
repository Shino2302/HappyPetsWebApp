import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { routes } from '../../../app.routes';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterOutlet, RouterModule],
  templateUrl: './login.component.html',
  styles: ``
})
//deifinir a las clases como default para poder utilizarlas como ruta en app.router.ts
export default class LoginComponent {
    constructor() {  }
}
