import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PetsModel } from '../models/pets-model';

@Injectable({
  providedIn: 'root'
})
export class MyPetsService {

  constructor(private http:HttpClient) { }

  public getMyPets(uid:string,token:string):Observable<PetsModel[]>{
    return this.http.get<PetsModel[]>('https://happydogdb-55b97-default-rtdb.firebaseio.com/Pets/'+uid+'.json?auth='+token);
  }

  public addPet(uid:string, token:string, jsonToAdd:PetsModel):void{
    this.http.post('https://happydogdb-55b97-default-rtdb.firebaseio.com/Pets/'+uid.toString()+'.json?auth='+token.toString(),jsonToAdd);
  }
  
  public deletePet(uid:string, token:string,petId:string):void{
    this.http.delete('https://happydogdb-55b97-default-rtdb.firebaseio.com/Pets/'+uid.toString()+'.json?auth='+token.toString());
  }
  
  public editPet(uid:string,token:string,petId:string, jsonToPut:PetsModel):void{
    this.http.post('https://happydogdb-55b97-default-rtdb.firebaseio.com/Pets/'+uid.toString()+'.json?auth='+token.toString(),jsonToPut);
  }

}
