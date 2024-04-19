import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { PetsModel } from '../models/pets-model';

@Injectable({
  providedIn: 'root'
})
export class MyPetsService {

  constructor(private http:HttpClient) { }

  public getMyPets(uid:string,token:string):Observable<PetsModel[]>{
    return this.http.get<PetsModel[]>('https://happydogdb-55b97-default-rtdb.firebaseio.com/Pets/'+uid+'.json?auth='+token)
      .pipe(
        catchError(error => {
          console.error('Error fetching pets:', error);
          return throwError(error);
        })
      );
  }
  public getMyPetsOnlyRTDB(guid:string):Observable<PetsModel[]>{
    return this.http.get<PetsModel[]>('https://happydogsdb-default-rtdb.firebaseio.com/Pets/'+guid+'.json')
      .pipe(
        catchError(error => {
          console.error('Error fetching pets:', error);
          return throwError(error);
        })
      );
  }
  public addPetOnlyRTDB(guid:string, newPet:PetsModel):void{
    this.http.post('https://happydogsdb-default-rtdb.firebaseio.com/Pets/'+guid+'.json',newPet);
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
