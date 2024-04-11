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
}
