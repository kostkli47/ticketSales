import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SettingsRoutingModule } from './settings-routing.module';
import { SettingsComponent } from './settings.component';

import { TabViewModule } from 'primeng/tabview';
import { InputTextModule } from 'primeng/inputtext';
import { ToastModule } from 'primeng/toast';
import { FormsModule } from '@angular/forms';
import { PanelModule } from 'primeng/panel';
import { MessageService } from 'primeng/api';
import { StatisticComponent } from './statistic/statistic.component';
import { TableModule } from 'primeng/table';



@NgModule({
  declarations: [
    SettingsComponent,
    StatisticComponent
  ],
  imports: [
    CommonModule,
    SettingsRoutingModule,
    TabViewModule,
    InputTextModule,
    FormsModule,
    ToastModule,
    PanelModule,
    TableModule
  ],
  providers:[MessageService]
})
export class SettingsModule { }


