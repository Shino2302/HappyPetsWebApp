import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { UsersModel } from '../models/users-model';

@Injectable({
  providedIn: 'root'
})
export class MyUserService {

  constructor(private http:HttpClient) { }

  public getMyInfo(uid: string, token: string): Observable<any> {
    const url = `https://happydogdb-55b97-default-rtdb.firebaseio.com/Users/${uid}/.json?auth=${token}`;
    return this.http.get<any>(url).pipe(
      map(data => {
        let keys = Object.keys(data); // Aquí obtienes un array de las claves del objeto
        let id = keys[0]; // Aquí obtienes el primer ID (asumiendo que solo hay un objeto en los datos)
        return data[id]; // Aquí accedes a la información dentro del ID
      })
    );
  }
  
  

  public userDelete(uid: string, token: string): Observable<any> {
    const url = `https://happydogdb-55b97-default-rtdb.firebaseio.com/Users/${uid}.json?auth=${token}`;
    return this.http.delete(url);
  }

  public userUpdate(uid:string,token:string,userData:UsersModel):void{
    this.http.put('https://happydogdb-55b97-default-rtdb.firebaseio.com/Users/'+uid+'.json?auth='+token,userData);
  }

}
