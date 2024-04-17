import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-my-pets',
  standalone: true,
  imports: [],
  templateUrl: './my-pets.component.html',
  styles: ``
})
export default class MyPetsComponent implements OnInit {
  
  uid:any;
  token:any;
  uidLimpio: string = "";
  tokenLimpio: string = "";
  

  constructor(private route: ActivatedRoute, private http:HttpClient,private router:Router) {  }
  
  ngOnInit(): void {
    this.uid = this.route.snapshot.paramMap.get('uid')?.toString();
    this.token = this.route.snapshot.paramMap.get('token')?.toString();
    this.uidLimpio = this.uid.toString();
    this.uidLimpio = this.uidLimpio.replace(/uid:/g, "");
    this.tokenLimpio = this.token.toString();
    this.tokenLimpio = this.tokenLimpio.replace(/token:/g, "");
  }

  goToAddNewPet():void{
    this.router.navigate(['dashboard/add-pet/uid:'+this.uidLimpio.toString()+'/token:'+this.tokenLimpio.toString()]);
  }

}
