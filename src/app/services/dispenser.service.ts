import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { DispenserModel } from '../models/dispenser-model';

@Injectable({
  providedIn: 'root'
})
export class DispenserService {

  constructor(private http: HttpClient) { }
//Servicios utilizando Firebase Auth:
  public getInfoDispenser(petId:string):Observable<any>{
    return this.http.get<any>('https://usodeemergencia-adfa1-default-rtdb.firebaseio.com/Dispenser/'+petId+'.json')
    .pipe(
      map(data => {
        let keys = Object.keys(data);
        let id = keys[0];
        return data[id];
      })
    );
  }

  public addDispenser(petId:string,jsonToAdd:DispenserModel):void{
    this.http
    .post('https://usodeemergencia-adfa1-default-rtdb.firebaseio.com/Dispenser/'+petId+'.json',jsonToAdd);
  }

  public deleteDispenser(petId:string):void{
    this.http.delete('https://usodeemergencia-adfa1-default-rtdb.firebaseio.com/Dispenser/'+petId+'.json');
  }
  public activateDispenser(petId:string):void{
    let jsonToPut: boolean = true;
    this.http.put('https://usodeemergencia-adfa1-default-rtdb.firebaseio.com/Dispenser/'+petId+'+/OnOff.json',jsonToPut);
  }

  public haveDispenser(petId:string):boolean{
    let checkOut:Observable<DispenserModel> = this.getInfoDispenser(petId);
    if(checkOut !== null)
      return false;
    else
      return true;
  }
}
