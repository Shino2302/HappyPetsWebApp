import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { routes } from '../../../app.routes';
import { FormControl, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterOutlet, RouterModule],
  templateUrl: './login.component.html',
  styles: ``
})
//deifinir a las clases como default para poder utilizarlas como ruta en app.router.ts
export default class LoginComponent {
  
  loginForm: FormGroup;
  
  constructor(private http:HttpClient) {
    this.loginForm = new FormGroup({
      email: new FormControl(''),
      password: new FormControl('')
    });
  }

  loginAction():boolean{
    try{
      this.http
    } 
    catch{
      return false;
    }
    return true;
  }


}
