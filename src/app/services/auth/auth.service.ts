import { Injectable } from '@angular/core';
import { IUser } from 'src/app/models/users';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private usersStorage: IUser[] = [];

  constructor() { }

  checkUser(user:IUser): boolean{
    const isUserExists = this.usersStorage.find((el) => el.login === user.login);

    let isUserSavedInStore = window.localStorage.getItem("user_"+user?.login);
    let userInStore: IUser =<IUser>{};

    if (isUserSavedInStore){
      userInStore = JSON.parse(isUserSavedInStore);
    }
    
    if (isUserExists) {
      return isUserExists.psw === user.psw;
    } else if (userInStore?.login){
      return userInStore.psw === user.psw;
    }
    return false;
  }

  setUser(user:IUser):void{
    const isUserExists = this.usersStorage.find((el:IUser) => el.login === user.login);
    if(!isUserExists && user?.login)  {
      this.usersStorage.push(user);
    }
  }

  isUserExists(user:IUser): boolean{
    const isUserExists = this.usersStorage.find((el:IUser) => el.login === user.login);
    return !!isUserExists;
  }

  delUser(user:IUser): void{
    const isUserExists = this.usersStorage.find((el:IUser) => el.login === user.login);
    if (isUserExists) {
      const value = this.usersStorage.findIndex (v => v.login === user.login);

      this.usersStorage.splice (value, 1);
    };
  }
}
