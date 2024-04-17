import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PetsModel } from '../../../models/pets-model';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MyPetsService } from '../../../services/my-pets.service';
import { DispenserService } from '../../../services/dispenser.service';

@Component({
  selector: 'app-add-pet',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './add-pet.component.html',
  styles: ``
})
export default class AddPetComponent implements OnInit{

  uid:any;
  token:any;
  addPetForm:FormGroup;
  uidLimpio: string = "";
  tokenLimpio: string = "";

  constructor(private route: ActivatedRoute, private http: HttpClient, private petService:MyPetsService, private dispenserService:DispenserService) 
  {
    this.addPetForm = new FormGroup({
      petAge: new FormControl(''),
      petImage: new FormControl(''),
      petName: new FormControl(''),
      petRace: new FormControl(''),
      petSize: new FormControl('')
    })
  }

  addPet():void{

    let data:PetsModel = {
      petAge: this.addPetForm.get('petAge')?.value,
      petImage: this.addPetForm.get('petImage')?.value,
      petName: this.addPetForm.get('petName')?.value,
      petRace: this.addPetForm.get('petRace')?.value,
      petSize: this.addPetForm.get('petSize')?.value
    };
    this.petService.addPet(this.uid,this.token,data);
    
  }
  ngOnInit(): void {
    this.uid = this.route.snapshot.paramMap.get('uid')?.toString();
    this.token = this.route.snapshot.paramMap.get('token')?.toString();
    this.uidLimpio = this.uid.toString();
    this.uidLimpio = this.uidLimpio.replace(/uid:/g, "");
    this.tokenLimpio = this.token.toString();
    this.tokenLimpio = this.tokenLimpio.replace(/token:/g, "");
  }

  agregarDispensador():void{
    
  }



}
