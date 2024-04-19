import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { UserModel, UsersModel } from '../models/users-model';

@Injectable({
  providedIn: 'root'
})
export class MyUserService {

  constructor(private http:HttpClient) { }
  //métodos con Auth:
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

  public userDeleteOnlyRTDB(guid:string):Observable<any>{
    const url = `https://happydogdb-55b97-default-rtdb.firebaseio.com/Users/.json`;
    return this.http.delete(url);
  }

  //Métodos sin Auht:
  public getMyData(guid:string): Observable<UserModel> {
    const url = `https://happydogsdb-default-rtdb.firebaseio.com/Users.json`;
    console.log("Id por parametro: "+guid)
    return this.http.get<any>(url).pipe(
      map(data => {
        console.log('Data received:', data); // This will log all the data received
        let keys = Object.keys(data);
        console.log(keys);
        let filteredKey = keys.find(key => data[key].IdUser === guid || data[key].idUser === guid);
        console.log('Filtered key:', filteredKey); // This will log the filtered key
        if (filteredKey) {
          let userData = data[filteredKey];
          console.log(userData);
          let userModel: UserModel = {
            email: userData.Email || userData.email || "",
            idUser: userData.IdUser || userData.idUser || "",
            name: userData.Name || userData.name || "",
            password: userData.Password || userData.password || "",
            phoneNumber: userData.PhoneNumber || userData.phoneNumber || ""
          };
          return userModel;
        }
        throw new Error('User not found');
      })
    );
  }
  


}
