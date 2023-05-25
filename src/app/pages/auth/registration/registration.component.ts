import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { ServerError } from 'src/app/models/error';
import { IUser } from 'src/app/models/users';
import { AuthService } from 'src/app/services/auth/auth.service';
import { ConfigService } from 'src/app/services/config/config.service';


@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {
  login:string;
  psw:string;
  pswRepeat:string; 
  email:string;
  cardNumber:string;
  saveLocalStorage: boolean; 
  showCardNumber: boolean

  constructor(private messageService: MessageService,
              private authService: AuthService,
              private http: HttpClient) { }

  ngOnInit(): void {
    this.showCardNumber = ConfigService.config.useUserCard;
  }

 vipStatus(): void {
  } 
  
  registration(ev: Event):void | boolean{
    if (this.psw !== this.pswRepeat){
      this.messageService.add({severity:'error', summary:'Пароли не совпадают'});
      return false;
    }

    const userObj: IUser ={
      psw: this.psw,
      cardNumber: this.cardNumber,
      login: this.login,
      email: this.email,
    }

    const userNest = {
      age: 30,
      name: 'Test'
    }

    this.http.post<IUser>('http://localhost:3000/users/', userObj).subscribe((data) => {
      if (this.saveLocalStorage) {
        const objUserJsonStr = JSON.stringify(userObj);
        window.localStorage.setItem('user_'+userObj.login, objUserJsonStr);
      }
      this.messageService.add({severity:'success', summary:'Регистрация прошла успешно'});
 
    }, (err: HttpErrorResponse)=> {
      console.log('err', err)
      const serverError = <ServerError>err.error;
      this.messageService.add({severity:'warn', summary: serverError.errorText})
      
    });


  /*   this.http.post('http://localhost:3000/users/', userObj).subscribe((data)=>{})

    if (!this.authService.isUserExists(userObj)){
      this.authService.setUser(userObj);
      if (this.saveLocalStorage === true){
        window.localStorage.setItem("user_"+userObj.login, JSON.stringify(userObj));
      }

      this.messageService.add({severity:'success', summary:'Регистрация прошла успешно'});
    } else {
      this.messageService.add({severity:'warn', summary:'Пользователь уже зарегистрирован'});
    } */

    
  }
}


