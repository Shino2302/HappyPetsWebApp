import { Component } from '@angular/core';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { routes } from '../../../app.routes';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { AuthRegister, LoginModel, UserModel } from '../../../models/users-model';
import { Observable, catchError, map, throwError } from 'rxjs';

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

  gudid:string = "";

  loginForm: FormGroup;
  
  constructor(private http:HttpClient, private router:Router) {
    this.loginForm = new FormGroup({
      email: new FormControl(''),
      password: new FormControl('')
    });
  }
  //Método con servicio de Firebase Auth:
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
  //Método sin servicio de Firebase Auth:
  loginVersionTwo(): void {
    let user: LoginModel = {
      email: this.loginForm.get('email')?.value,
      password: this.loginForm.get('password')?.value
    };
    this.http.get<Record<string, UserModel>>('https://happydogsdb-default-rtdb.firebaseio.com/Users.json')
  .pipe(
    map(users => Object.entries(users).map(([key, value]) => ({ ...value, firebaseKey: key }))),
    map(users => users.find(u => u.email === user.email && u.password === user.password)),
    catchError(error => {
      console.error('Error al buscar al usuario:', error);
      return throwError('Usuario no encontrado, favor de volverlo a intentar');
    })
  )
  .subscribe(
    foundUser => {
      if (foundUser) {
        console.log('Usuario encontrado:', foundUser);
        this.router.navigate(['dashboard/my-profile/uid:'+foundUser.idUser]);
      }
    },
    error => {
      console.error(error);
    }
  );
}
  
  // login():void{
  //   let response:Observable<string> = this.loginVersionTwo();
  //   this.router.navigate(['dashboard/my-profile/uid:'+response.subscribe()]);
  // }
}
