import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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

  userData:Observable<any> | undefined;

  constructor(private route: ActivatedRoute,private userService:MyUserService) {  }

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
    this.userData = this.userService.getMyInfo(this.uidLimpio,this.tokenLimpio);
    console.log(this.tokenLimpio);
    console.log(this.uidLimpio);
    console.log(this.userData);
  }
}
