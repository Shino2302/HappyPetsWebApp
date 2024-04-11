import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DispenserModel } from '../models/dispenser-model';

@Injectable({
  providedIn: 'root'
})
export class DispenserService {

  constructor(private http: HttpClient) { }

  public getInfoDispenser(uid:string, token:string, petId:string):Observable<DispenserModel[]>{
    return this.http.get<DispenserModel[]>('https://happydogdb-55b97-default-rtdb.firebaseio.com/Dispenser/'+uid+'.json?auth='+token);
  }
}
