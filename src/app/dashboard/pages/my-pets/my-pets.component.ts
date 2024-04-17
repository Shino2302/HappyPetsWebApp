import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DispenserService } from '../../../services/dispenser.service';
import { DispenserModel } from '../../../models/dispenser-model';
import { MyPetsService } from '../../../services/my-pets.service';
import { PetsModel, PetsWithIdModel } from '../../../models/pets-model';
import { Observable } from 'rxjs';

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
  listaDeMascotas: PetsModel[] = [];
  listaDeIds: string[] = [];
  listaCompletaDeMascotas: PetsWithIdModel[] = [];


  constructor(private route: ActivatedRoute, private http:HttpClient,private router:Router, private dispenserService:DispenserService, private petsService:MyPetsService) {  }
  
  ngOnInit(): void {
    this.uid = this.route.snapshot.paramMap.get('uid')?.toString();
    this.token = this.route.snapshot.paramMap.get('token')?.toString();
    this.uidLimpio = this.uid.toString();
    this.uidLimpio = this.uidLimpio.replace(/uid:/g, "");
    this.tokenLimpio = this.token.toString();
    this.tokenLimpio = this.tokenLimpio.replace(/token:/g, "");
    this.petsService.getMyPets(this.uidLimpio,this.tokenLimpio).subscribe(data => {
      this.listaDeIds = Object.keys(data);
      this.listaDeMascotas = Object.values(data);
      console.log(this.listaDeIds);
      console.log(this.listaDeMascotas);
  
      for (let index = 0; index < this.listaDeMascotas.length; index++) {
        this.listaCompletaDeMascotas[index] = {
          id: this.listaDeIds[index].toString(),
          petAge: this.listaDeMascotas[index].petAge.toString(),
          petImage: this.listaDeMascotas[index].petImage,
          petName: this.listaDeMascotas[index].petName,
          petRace: this.listaDeMascotas[index].petRace,
          petSize: this.listaDeMascotas[index].petSize
        };
      }
      console.log(this.listaCompletaDeMascotas);
    });
  }
  

  goToAddNewPet():void{
    this.router.navigate(['dashboard/add-pet/uid:'+this.uidLimpio.toString()+'/token:'+this.tokenLimpio.toString()]);
  }

  goToConfigDispenser(petId:string):void{
    this.router.navigate(['dashboard/config-dispenser/uid:'+this.uidLimpio.toString()+'/token:'+this.tokenLimpio.toString()+'/petId:'+petId]);
  }

  agregarDispensador(petId:string):void{
    let dispensadorGenerico: DispenserModel = new DispenserModel;
    dispensadorGenerico.foodInContainer = 0;
    dispensadorGenerico.foodInPlate = 0;
    dispensadorGenerico.onOff = false;
    this.dispenserService.addDispenser(petId,dispensadorGenerico);
  }

  dispensadorONo(petId:string):boolean{
    return this.dispenserService.haveDispenser(petId);
  }

}
