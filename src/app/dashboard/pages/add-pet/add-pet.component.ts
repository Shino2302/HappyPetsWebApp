import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PetsModel } from '../../../models/pets-model';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MyPetsService } from '../../../services/my-pets.service';

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
  uidLimpio: string = "";
  tokenLimpio: string = "";
  //Data to Form
  addPetForm:FormGroup;
  constructor(private route: ActivatedRoute, private http: HttpClient, private petService:MyPetsService) 
  {
    this.addPetForm = new FormGroup({
      petAge: new FormControl(''),
      petImage: new FormControl(''),
      petName: new FormControl(''),
      petRace: new FormControl(''),
      petSize: new FormControl('')
    })
  }

  onFileSelected(event:any) {
    const file = event.target.files[0];
    
    if (file) {
      const reader = new FileReader();
      
      reader.onload = this.handleReaderLoaded.bind(this);
      reader.readAsBinaryString(file);
    }
  }

  handleReaderLoaded(readerEvt:any) {
    let binaryString = readerEvt.target.result;
    let base64textString = btoa(binaryString);
    this.addPetForm.get('petImage')?.setValue(base64textString);
  }

  addPet():void{

    let data:PetsModel = {
      petAge: this.addPetForm.get('petAge')?.value,
      petImage: this.addPetForm.get('petImage')?.value,
      petName: this.addPetForm.get('petName')?.value,
      petRace: this.addPetForm.get('petRace')?.value,
      petSize: this.addPetForm.get('petSize')?.value
    };
    this.petService.addPet(this.uidLimpio,this.tokenLimpio,data);
  }
  ngOnInit(): void {
    this.uid = this.route.snapshot.paramMap.get('uid')?.toString();
    this.token = this.route.snapshot.paramMap.get('token')?.toString();
    this.uidLimpio = this.uid.toString();
    this.uidLimpio = this.uidLimpio.replace(/uid:/g, "");
    this.tokenLimpio = this.token.toString();
    this.tokenLimpio = this.tokenLimpio.replace(/token:/g, "");
  }
}
