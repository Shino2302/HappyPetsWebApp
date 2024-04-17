import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CameraService {

  constructor(private http: HttpClient) { }
  public getStream(petId:string): Observable<any>{
    return this.http.get<any>('https://usodeemergencia-adfa1-default-rtdb.firebaseio.com/Camera/'+petId+'.json').pipe(
      map(data => {
        let keys = Object.keys(data);
        let id = keys[0];
        return data[id];
      })
    );
  }

  public activateCamera(petId:string):void{
    let jsonToPut: boolean = true;
    this.http.put('https://usodeemergencia-adfa1-default-rtdb.firebaseio.com/Camera/'+petId+'+/OnOff.json',jsonToPut);
  }
}
