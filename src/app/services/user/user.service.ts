import { Injectable } from '@angular/core';
import { IUser } from 'src/app/models/users';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private user: IUser;
  constructor() { }

  getUser(): IUser { 
    return this.user// возвращается user
  };

  setUser(user: IUser) {
    this.user = user
  };
}




