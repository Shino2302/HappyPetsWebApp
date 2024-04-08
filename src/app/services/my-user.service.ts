import { Injectable } from '@angular/core';
import {AngularFireDatabase} from '@angular/fire/compat/database' 

@Injectable({
  providedIn: 'root'
})
export class MyUserService {
  private dbPath = '/Users';
  constructor(private db:AngularFireDatabase) { }
}
