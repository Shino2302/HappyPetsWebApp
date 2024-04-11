import { Component } from '@angular/core';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { routes } from '../../../app.routes';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { AuthRegister } from '../../../models/users-model';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterOutlet, RouterModule,ReactiveFormsModule],
  templateUrl: './login.component.html',
  styles: ``
})
//deifinir a las clases como default para poder utilizarlas como ruta en app.router.ts
export default class LoginComponent {
  

  token:string = "";
  uid:string = "";

  loginForm: FormGroup;
  
  constructor(private http:HttpClient, private router:Router) {
    this.loginForm = new FormGroup({
      email: new FormControl(''),
      password: new FormControl('')
    });
  }

  loginAction():boolean{
    let user: AuthRegister = {
      email: this.loginForm.get('email')?.value,
      password: this.loginForm.get('password')?.value,
      returnSecureToken: true
    }
    try{
      this.http.post<any>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDSNgDmkvGv6a18hAk0CymT-_EgMORW50A',user)
      .subscribe(response  => {
        this.token = response.idToken;
        this.uid = response.localId;
        this.router.navigate(['dashboard/my-profile/uid:'+this.uid.toString()+'/token:'+this.token.toString()]);
      });
    } 
    catch{
      return false;
    }
    return true;
  }



}
