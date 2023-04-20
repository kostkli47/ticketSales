import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { IMenuType } from 'src/app/models/menuType';
import { IUser } from 'src/app/models/users';
import { UserService } from 'src/app/services/user/user.service';
import { SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  @Input() menuType: IMenuType;
  items: MenuItem[];
  time: Date;
  user: IUser | null; //

  private timerInterval: number;
  private settingsActive: boolean = false;
 
  
  constructor(private userService:UserService) { } //

  ngOnInit(): void {
      this.items = this.initMenuItems();

      this.timerInterval = window.setInterval(()=>{
        this.time = new Date();
        console.log('run')
      }, 1000);

      this.user = <IUser> this.userService.getUser(); //
  }

 
  ngOnDestroy():void {
    if (this.timerInterval){
      window.clearInterval(this.timerInterval)
    }
  }

  ngOnChanges(ev: SimpleChanges): void {
    console.log('ev', ev)
    if (ev['menuType']) {
    this.settingsActive = this.menuType?.type === "extended";
    this.items = this.initMenuItems();
  }
 }
  initMenuItems(): MenuItem[] {
    return [
      {
        label: 'Билеты',
        routerLink:['tickets-list']
      },
      {
        label: 'Настройки',
        routerLink:['settings'],
        visible: this.settingsActive
      },
      {
        label: 'Выйти',
        routerLink:['/auth'],
        command: () => {
          this.userService.deleteToken();
        } 
      },
 
    ];
  }

}

