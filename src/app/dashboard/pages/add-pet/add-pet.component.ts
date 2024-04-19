import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PetsModel } from '../../../models/pets-model';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MyPetsService } from '../../../services/my-pets.service';
import { DispenserService } from '../../../services/dispenser.service';
import { DispenserModel } from '../../../models/dispenser-model';

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

  constructor(private route: ActivatedRoute, private http: HttpClient, private petService:MyPetsService, private router:Router, private dispenserService:DispenserService) 
  {
    this.addPetForm = new FormGroup({
      petAge: new FormControl(''),
      petName: new FormControl(''),
      petRace: new FormControl(''),
      petSize: new FormControl('')
    })
  }

  addPet():void{

    let data:PetsModel = {
      idPet: this.generarGUID(),
      petAge: this.addPetForm.get('petAge')?.value,
      petName: this.addPetForm.get('petName')?.value,
      petRace: this.addPetForm.get('petRace')?.value,
      petSize: this.addPetForm.get('petSize')?.value
    };
    this.http.post('https://happydogsdb-default-rtdb.firebaseio.com/Pets/'+this.uidLimpio+'.json',data).subscribe(response => {
      console.log(response);
    })
    let dispenserBase: DispenserModel = ({
      foodInContainer: 0,
      foodInPlate: 0,
      onOff: false
    })
    this.http.post('https://happydogsdb-default-rtdb.firebaseio.com/Dispenser/'+this.uidLimpio+'/'+data.idPet.toString()+'.json',dispenserBase).subscribe(response => {
      console.log(response);
    });
    this.router.navigate(['dashboard/my-pets/uid:'+this.uidLimpio.toString()]);
    
  }
  ngOnInit(): void {
    this.uid = this.route.snapshot.paramMap.get('uid')?.toString();
    this.token = this.route.snapshot.paramMap.get('token')?.toString();
    this.uidLimpio = this.uid.toString();
    this.uidLimpio = this.uidLimpio.replace(/uid:/g, "");
    this.tokenLimpio = this.token.toString();
    this.tokenLimpio = this.tokenLimpio.replace(/token:/g, "");
  }
  generarGUID():string {
    //Generamos un formato de 32 caracteres y le pasamos un Exprecion regular para filtrar datos
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      //ahora en la funcion de primer orden aplicamos un random para regenerar el ID
      var r = Math.random() * 16 | 0,
          v = c === 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }
}
