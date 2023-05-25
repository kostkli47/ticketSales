import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IOrder } from 'src/app/models/order';
import { IUser } from 'src/app/models/users';
import { OrdersService } from 'src/app/services/orders/orders.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {
  cols = [
    {field: 'userId', header: 'id пользователя'},
    {field: '_id', header: 'id заказа'},
    {field: 'tourId', header: 'id тура'},
    {field: 'age', header: 'Возраст'},
    {field: 'birthDay', header: 'Дата рождения'},
    {field: 'cardNumber', header: 'Номер карты'},
  ];

  orders: IOrder[];

  constructor(private orderService:OrdersService,
              private date: DatePipe) { }

  ngOnInit(): void {
    this.orderService.getOrderRest().subscribe((data) => {
      const newBirthday = data.map((el)=> {
        el.birthDay = this.date.transform(el.birthDay, 'MMMM d, y')
        return el;
      })
      this.orders = data;
    })
    
  }

}
