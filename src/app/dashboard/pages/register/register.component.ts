import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit, input } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { AuthRegister, UsersModel } from '../../../models/users-model';
import { empty, switchMap } from 'rxjs';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [RouterOutlet, RouterModule, ReactiveFormsModule],
  templateUrl: './register.component.html'
})
// export default class RegisterComponent implements OnInit{
export default class RegisterComponent{


  token:string = "";
  uid:string = "";

  registerForm:FormGroup;

  constructor(private http: HttpClient, private router: Router) {
    this.registerForm = new FormGroup({
      name: new FormControl(''),
      email: new FormControl(''),
      phoneNumber: new FormControl(''),
      password: new FormControl(''),
      passwordConfirm: new FormControl(''),
      profileImage: new FormControl('')
    })
  }

  // dataValidation(): boolean {
  //   let data:UsersModel = {
  //     name: this.registerForm.get('name')?.value,
  //     email: this.registerForm.get('email')?.value,
  //     phoneNumber: this.registerForm.get('phoneNumber')?.value,
  //     password: this.registerForm.get('password')?.value,
  //     profileImage: this.registerForm.get('profileImage')?.value,
  //   };
  //   if(data.password.length > 5){
  //     return true;
  //   }
  //   else{
  //     return false;
  //   }
  // }
  registerAuth(): void {
    let authData: AuthRegister = {
      email: this.registerForm.get('email')?.value,
      password: this.registerForm.get('password')?.value,
      returnSecureToken: true
    }
  
    this.http.post<any>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDSNgDmkvGv6a18hAk0CymT-_EgMORW50A', authData).pipe(
      switchMap(response => {
        console.log('Todo en orden');
        console.log(response); // Aquí puedes ver la respuesta completa del servidor
        this.token = response.idToken;
        this.uid = response.localId; // Aquí asumimos que el token se encuentra en la propiedad 'idToken' de la respuesta // Aquí puedes ver el token
  
        let data:UsersModel = {
          name: this.registerForm.get('name')?.value,
          email: this.registerForm.get('email')?.value,
          phoneNumber: this.registerForm.get('phoneNumber')?.value,
          password: this.registerForm.get('password')?.value,
          profileImage: this.registerForm.get('profileImage')?.value,
        }
        return this.http.post('https://happydogdb-55b97-default-rtdb.firebaseio.com/Users/'+this.uid.toString()+'.json?auth='+this.token.toString(),data);
      })
    ).subscribe(
      response => {
        console.log(response);
        this.router.navigate(['./login']);
      },
      error =>{
        console.log('Tenemos un problema', error);
        
      }
    )
  }

  // ngOnInit(): void {
  //   this.debugInputs();
  // } 
  // debugInputs():void{
  //   const interval = setInterval(() =>{
  //     console.log(this.registerForm.value);
  //   },1000);
  // }
}
