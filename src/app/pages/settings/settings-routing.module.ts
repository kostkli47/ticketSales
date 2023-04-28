import { NgModule, OnInit } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SettingsComponent } from './settings.component';
import { AuthService } from 'src/app/services/auth/auth.service';
import { MessageService } from 'primeng/api';

const routes: Routes = [
  {
    path: '',
    component: SettingsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SettingsRoutingModule implements OnInit { 
  oldPsw:string;
  newPsw:string;
  repeatPsw:string;


  constructor(private authService:AuthService,
    private messageService:MessageService,) { }

  ngOnInit(): void {

}



}
  