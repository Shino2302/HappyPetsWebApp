import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import { PetsModel, PetsWithIdModel } from '../../../models/pets-model';
import { DispenserService } from '../../../services/dispenser.service';
import { MyPetsService } from '../../../services/my-pets.service';
import { DispenserModel } from '../../../models/dispenser-model';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-config-dispenser',
  standalone: true,
  imports: [RouterOutlet,ReactiveFormsModule],
  templateUrl: './config-dispenser.component.html',
  styles: ``
})
export default class ConfigDispenserComponent implements OnInit{
  uid:any;
  token:any;
  uidLimpio: string = "";
  tokenLimpio: string = "";
  listaDeMascotas: PetsModel[] = [];
  listaDeIds: string[] = [];
  listaCompletaDeMascotas: PetsWithIdModel[] = [];

  formDispenser:FormGroup;

  listOfPets:PetsModel[]=[];
  infoDispenser:DispenserModel= new DispenserModel();

  constructor(private route: ActivatedRoute, 
    private dispenser:DispenserService, 
    private pets:MyPetsService,
    private router: Router) 
  {
    this.formDispenser = new FormGroup({
      cameraOnOff: new FormControl(''),
      foodInContainer: new FormControl(''),
      fooInPlate: new FormControl(''),
      onOff: new FormControl('')
    });
  }

  ngOnInit(): void {
    this.uidLimpio = this.uid.toString();
    this.uidLimpio = this.uidLimpio.replace(/uid:/g, "");
    this.tokenLimpio = this.token.toString();
    this.tokenLimpio = this.tokenLimpio.replace(/token:/g, "");
    this.pets.getMyPets(this.uidLimpio,this.tokenLimpio).subscribe(data => {
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

  

}
