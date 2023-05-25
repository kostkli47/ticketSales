import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';

import { OrdersRoutingModule } from './orders-routing.module';
import { OrdersComponent } from './orders.component';
import { TabViewModule } from 'primeng/tabview';
import { FormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';


@NgModule({
  declarations: [
    OrdersComponent,
  ],
  imports: [
    CommonModule,
    OrdersRoutingModule,
    TabViewModule,
    FormsModule,
    TableModule
  ],
  providers: [DatePipe]
})
export class OrdersModule { }
