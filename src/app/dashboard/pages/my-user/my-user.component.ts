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

  userData:Observable<UsersModel> | undefined;

  constructor(private route: ActivatedRoute,private userService:MyUserService) {  }

  ngOnInit(): void {
    //Metodo para mapear la informacion en el URL de la app:
    //en este caso obtenemos el uid y token del usuario para estar navegando entre si
    this.uid = this.route.snapshot.paramMap.get('uid')?.toString();
    this.token = this.route.snapshot.paramMap.get('token')?.toString();
    this.userData = this.userService.getMyInfo(this.uid,this.token);
    this.userData.forEach(element => {
      console.log(element.email);
      console.log(element.name);
      console.log(element.password);
      console.log(element.phoneNumber);
      console.log(element.profileImage);
    });
  }





}
