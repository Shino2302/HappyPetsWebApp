import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MyUserService } from '../../../services/my-user.service';
import { UsersModel } from '../../../models/users-model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-my-user',
  standalone: true,
  imports: [],
  templateUrl: './my-user.component.html',
  styles: ``
})
export default class MyUserComponent implements OnInit {
  
  uid:any;
  token:any;
  //variables para limpiar el contenido de las cadenas
  uidLimpio: string = "";
  tokenLimpio: string = "";

  //variable para deserealizar el JSON
  JSONs:string = "";

  userDataSinLimpiar:Observable<any> | undefined;
  userDataLimpio:UsersModel = 
  {
    name: "",
    email: "",
    phoneNumber: "",
    password: "",
    profileImage: ""
  };

  constructor(private route: ActivatedRoute,private userService:MyUserService, private router:Router) {  }

  userDelete(): void {
    this.userService.userDelete(this.uidLimpio, this.tokenLimpio).subscribe(
      response => {
        console.log('Usuario eliminado con éxito', response);
        this.router.navigate(['dashboard/happy-dogs']);
      },
      error => {
        console.error('Error al eliminar el usuario', error);
      }
    );
  }

  navigateToYourPets():void{
    this.router.navigate(['dashboard/my-pets/uid:'+this.uidLimpio.toString()+'/token:'+this.tokenLimpio.toString()]);
  }
  goToAddNewPet():void{
    this.router.navigate(['dashboard/add-pet/uid:'+this.uidLimpio.toString()+'/token:'+this.tokenLimpio.toString()]);
  }

  ngOnInit(): void {
    //Metodo para mapear la informacion en el URL de la app:
    //en este caso obtenemos el uid y token del usuario para estar navegando entre si
    this.uid = this.route.snapshot.paramMap.get('uid')?.toString();
    this.token = this.route.snapshot.paramMap.get('token')?.toString();
    //limpiado de cadenas solo para obtner la información de estas y no el nombre del parametro
    this.uidLimpio = this.uid.toString();
    this.uidLimpio = this.uidLimpio.replace(/uid:/g, "");
    this.tokenLimpio = this.token.toString();
    this.tokenLimpio = this.tokenLimpio.replace(/token:/g, "");
    //solicitud de datos mediante el servicio:
    this.userService.getMyInfo(this.uidLimpio,this.tokenLimpio).subscribe(userData => {
      console.log(userData); // Aquí puedes ver los datos emitidos por el Observable
      this.userDataLimpio = userData; // Ahora puedes asignar los datos a tu variable userDataLimpio
    });
    
    
    console.log(this.userDataLimpio)
    console.log(this.tokenLimpio);
    console.log(this.uidLimpio);
    this.JSONs = JSON.stringify(this.userDataSinLimpiar);
    console.log(this.JSONs);

    

    

  }
}
