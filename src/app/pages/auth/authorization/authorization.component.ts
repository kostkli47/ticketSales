import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { IUser } from 'src/app/models/users';
import { MessageService } from 'primeng/api';
import { ActivatedRoute, Router } from '@angular/router';
import { Input } from '@angular/core';
import { UserService } from 'src/app/services/user/user.service';


@Component({
  selector: 'app-authorization',
  templateUrl: './authorization.component.html',
  styleUrls: ['./authorization.component.scss']
})

export class AuthorizationComponent implements OnInit, OnDestroy {
  loginText = 'Логин';
  pswText = 'Пароль';
  psw: string;
  login: string;
  selectedValue: boolean;
  cardNumber: string;
  authTextButton: string;
  @Input() InputProp: string;
  
  
  
  constructor(private authService:AuthService,
              private messageService: MessageService,
              private router: Router,
              private route: ActivatedRoute,
              private userService: UserService) { }

  ngOnInit(): void {
    this.authTextButton = "Авторизоваться";
  }

  ngOnDestroy(): void {
    console.log('destroy');
  }

  vipStatusSelected(): void {
    }

  onAuth(ev: Event):void  {

      const authUser: IUser ={
        psw: this.psw,
        login: this.login,
        cardNumber: this.cardNumber
      }
      
      if(this.authService.checkUser(authUser)){
        this.userService.setUser(authUser)
        this.userService.setToken(this.login); // в качестве значения передаем рандомный токен типа стринг

        this.router.navigate(['tickets/tickets-list'])
    } else {
      this.messageService.add({severity:'error', summary:'Неверные данные'})
    }
  }


}