import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import { PetsModel } from '../../../models/pets-model';
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
    this.uid = this.route.snapshot.paramMap.get('uid')?.toString();
    this.token = this.route.snapshot.paramMap.get('token')?.toString();
    this.pets.getMyPets(this.uid,this.token).subscribe((result: PetsModel[]) => {
      this.listOfPets = result;
    })
  }

  

}
