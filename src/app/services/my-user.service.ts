import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UsersModel } from '../models/users-model';

@Injectable({
  providedIn: 'root'
})
export class MyUserService {

  constructor(private http:HttpClient) { }

  public getMyInfo(uid:string, token:string):Observable<UsersModel>{
    return this.http.get<UsersModel>('https://happydogdb-55b97-default-rtdb.firebaseio.com/Users/'+uid.toString()+'/.json?auth='+token.toString());
  }

  public userDelete(uid:string,token:string):void{
    this.http.delete('https://happydogdb-55b97-default-rtdb.firebaseio.com/Users/'+uid+'.json?auth='+token);
  }

  public userUpdate(uid:string,token:string,userData:UsersModel):void{
    this.http.put('https://happydogdb-55b97-default-rtdb.firebaseio.com/Users/'+uid+'.json?auth='+token,userData);
  }

}
