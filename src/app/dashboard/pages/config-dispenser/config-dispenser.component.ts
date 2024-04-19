import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import { PetsModel, PetsWithIdModel, PetsWithIdModelAndDispenser } from '../../../models/pets-model';
import { DispenserService } from '../../../services/dispenser.service';
import { MyPetsService } from '../../../services/my-pets.service';
import { DispenserModel } from '../../../models/dispenser-model';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map, throwError } from 'rxjs';

@Component({
  selector: 'app-config-dispenser',
  standalone: true,
  imports: [RouterOutlet,ReactiveFormsModule],
  templateUrl: './config-dispenser.component.html',
  styles: ``
})
export default class ConfigDispenserComponent implements OnInit{
  uid:any;
  uidLimpio: string = "";
  listaDeMascotas: PetsModel[] = [];
  listaDeIds: string[] = [];
  listaCompletaDeMascotas: PetsWithIdModelAndDispenser[] = [];
  dispensadores: DispenserModel[] = [];

  formDispenser:FormGroup;

  listOfPets:PetsModel[]=[];
  infoDispenser:DispenserModel= new DispenserModel();

  constructor(private route: ActivatedRoute, 
    private dispenser:DispenserService, 
    private pets:MyPetsService,
    private router: Router, private http:HttpClient) 
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
    this.uidLimpio = this.uid.toString();
    this.uidLimpio = this.uidLimpio.replace(/uid:/g, "");    
    this.pets.getMyPetsOnlyRTDB(this.uidLimpio).subscribe(dataPets => {
      this.listaDeIds = Object.keys(dataPets);
      this.listaDeMascotas = Object.values(dataPets);
      console.log("Lista de Id: "+this.listaDeIds);
      console.log(this.listaDeMascotas);
      for (let index = 0; index < this.listaDeMascotas.length; index++) {
        this.obtenerDatosDelContenerdor(this.listaDeMascotas[index].idPet).subscribe(response =>{
          this.dispensadores = Object.values(response);
          console.log(this.dispensadores)
          this.listaCompletaDeMascotas[index] = {
            idPet: this.listaDeMascotas[index].idPet,
            petAge: this.listaDeMascotas[index].petAge,
            petName: this.listaDeMascotas[index].petName,
            petRace: this.listaDeMascotas[index].petRace,
            petSize: this.listaDeMascotas[index].petSize,
            foodInContainer: this.dispensadores[index].foodInContainer,
            foodInPlate: this.dispensadores[index].foodInPlate,
            onOff: this.dispensadores[index].onOff
          };
          console.log("Hola2: "+this.listaCompletaDeMascotas);
        })
      }
    });
  }
  

  public activateDispenser(petId:string):void{
    let jsonToPut: boolean = true;
    this.http.get<string>('https://happydogsdb-default-rtdb.firebaseio.com/Dispenser/'+petId+'.json').pipe(map(data =>{
      return Object.keys(data)[0]; // Asume que quieres la primera clave
    })).subscribe(firebaseKey => {
      this.http.put('https://happydogsdb-default-rtdb.firebaseio.com/Dispenser/'+petId+'/'+firebaseKey+'/onOff.json',jsonToPut).subscribe(response => {
        console.log(response);
      });
    });
  }
  
  obtenerDatosDelContenerdor(guid:string):Observable<DispenserModel[]>{
    return this.http.get<DispenserModel[]>('https://happydogsdb-default-rtdb.firebaseio.com/Dispenser/'+guid+'.json')
      .pipe(
        catchError(error => {
          console.error('Error fetching pets:', error);
          return throwError(error);
        })
      );
  }

  // public getMyPetsOnlyRTDB(guid:string):Observable<PetsModel[]>{
  //   return this.http.get<PetsModel[]>('https://happydogsdb-default-rtdb.firebaseio.com/Pets/'+guid+'.json')
  //     .pipe(
  //       catchError(error => {
  //         console.error('Error fetching pets:', error);
  //         return throwError(error);
  //       })
  //     );
  // }
}
