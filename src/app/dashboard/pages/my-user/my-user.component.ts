import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

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

  constructor(private route: ActivatedRoute) {  }

  ngOnInit(): void {
    //Metodo para mapear la informacion en el URL de la app:
    //en este caso obtenemos el uid y token del usuario para estar navegando entre si
    this.uid = this.route.snapshot.paramMap.get('uid')?.toString();
    this.token = this.route.snapshot.paramMap.get('token')?.toString();
  }

}
