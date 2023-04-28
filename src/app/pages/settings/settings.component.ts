import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Subject, Subscription, take, takeUntil } from 'rxjs';
import { IUser } from 'src/app/models/users';
import { AuthService } from 'src/app/services/auth/auth.service';
import { SettingsService } from 'src/app/services/settings/settings.service';
import { ObservableExampleService } from 'src/app/services/testing/observable-example.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit, OnDestroy {
  public user: IUser;
  psw: string;
  newPsw: string;
  newPswRepeat: string;
  login: string;
  private subjectForUnsubscribe = new Subject();

  constructor(private testing: ObservableExampleService,
              private settingsService:SettingsService,
              private userService: UserService,
              private authService: AuthService,
              private router: Router,
              private messageService: MessageService) { }

  ngOnInit(): void {
    this.user = <IUser>this.userService.getUser();
    this.settingsService.loadUserSettings().pipe(takeUntil(this.subjectForUnsubscribe)).subscribe((data)=>{
      console.log('settings data', data)
    });

     this.settingsService.getSettingsSubjectObservable().pipe(takeUntil(this.subjectForUnsubscribe)).subscribe(
      (data)=> {
        console.log('settings data from subject', data)
      })
  }
  ngOnDestroy(): void {
    this.subjectForUnsubscribe.next(true);
    this.subjectForUnsubscribe.complete();
  }

  ChangePsw(ev: Event): void {

    if (this.psw === this.user.psw) {
      
      if (this.newPsw === this.newPswRepeat){
        
        this.user.psw = this.newPsw
        this.userService.setUser(this.user)
    
        window.localStorage.setItem("user_"+this.user.login, JSON.stringify(this.user));
        this.messageService.add({severity:'success', summary:'Пароль изменен успешно'});
        this.router.navigate(['auth']);
    
      }  else {
        this.messageService.add({severity:'error', summary:'Пароли не совпадают'});
      } 
    }   else {
      this.messageService.add({severity:'error', summary:'Текущий пароль введен неправильно'});
    } 
    }
  }       

  





