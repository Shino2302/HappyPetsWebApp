import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DispenserModel } from '../models/dispenser-model';

@Injectable({
  providedIn: 'root'
})
export class DispenserService {

  constructor(private http: HttpClient) { }

  public getInfoDispenser(uid:string, token:string, petId:string):Observable<DispenserModel>{
    return this.http.get<DispenserModel>('https://happydogdb-55b97-default-rtdb.firebaseio.com/Dispenser/'+uid+'/'+petId+'.json?auth='+token);
  }

  public addDispenser(uid:string, token:string,petId:string,jsonToAdd:DispenserModel):void{
    this.http
    .post('https://happydogdb-55b97-default-rtdb.firebaseio.com/Dispenser/'+
    uid.toString()+'/'+petId+'.json?auth='+token.toString(),jsonToAdd);
  }

  public deleteDispenser(uid:string,token:string,petId:string):void{
    this.http.delete('https://happydogdb-55b97-default-rtdb.firebaseio.com/Dispenser/'+
    uid.toString()+'/'+petId+'.json?auth='+token.toString());
  }
  public putDispenser(uid:string,token:string,petId:string,jsonToPut:DispenserModel):void{
    this.http.put('https://happydogdb-55b97-default-rtdb.firebaseio.com/Dispenser/'+
    uid.toString()+'/'+petId+'.json?auth='+token.toString(),jsonToPut);
  }

  public haveDispenser(uid:string,token:string,petId:string):boolean{
    let checkOut:Observable<DispenserModel> = this.getInfoDispenser(uid,token,petId);
    if(checkOut !== null)
      return true;
    else
      return true;
  }
}
