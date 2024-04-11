import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PetsModel } from '../../../models/pets-model';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-add-pet',
  standalone: true,
  imports: [],
  templateUrl: './add-pet.component.html',
  styles: ``
})
export default class AddPetComponent implements OnInit{

  uid:any;
  token:any;
  addPetForm:FormGroup;

  constructor(private route: ActivatedRoute, private http: HttpClient) 
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
    this.http.post('https://happydogdb-55b97-default-rtdb.firebaseio.com/Pets/'+this.uid.toString()+'.json?auth='+this.token.toString(),data);
  }

  ngOnInit(): void {
    this.uid = this.route.snapshot.paramMap.get('uid')?.toString();
    this.token = this.route.snapshot.paramMap.get('token')?.toString();
  }



}
