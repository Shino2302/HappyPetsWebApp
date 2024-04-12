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
  uidLimpio: string = "";
  tokenLimpio: string = "";

  userData:Observable<UsersModel> | undefined;

  constructor(private route: ActivatedRoute,private userService:MyUserService) {  }

  ngOnInit(): void {
    //Metodo para mapear la informacion en el URL de la app:
    //en este caso obtenemos el uid y token del usuario para estar navegando entre si
    this.uid = this.route.snapshot.paramMap.get('uid')?.toString();
    this.token = this.route.snapshot.paramMap.get('token')?.toString();
    this.uidLimpio = this.uid.toString();
    this.uidLimpio = this.uidLimpio.replace(/uid:/g, "");
    this.tokenLimpio = this.token.toString();
    this.tokenLimpio = this.tokenLimpio.replace(/token:/g, "");
    this.userData = this.userService.getMyInfo(this.uidLimpio,this.tokenLimpio);
    console.log(this.tokenLimpio);
    console.log(this.uidLimpio);
    console.log(this.userData);
  }
}
