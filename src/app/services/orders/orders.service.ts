import { Injectable } from '@angular/core';
import { OrderRestService } from '../rest/order-rest/order-rest.service';
import { Observable, map } from 'rxjs';
import { IOrder, IOrderServ } from 'src/app/models/order';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  constructor(private orderRestService: OrderRestService) { }

  getOrderRest():Observable<IOrder[]>{
    return this.orderRestService.getOrderRest().pipe(
      map((data:IOrderServ[])=> {
        const newOrderArr: IOrder[]=[];

        data.forEach((el:IOrderServ)=>{
          const newOrderObj: IOrder ={
            age: el.age, 
            birthDay: el.birthDay, 
            cardNumber: el.cardNumber,
            tourId: el.tourId, 
            userId: el.userId,
            _id:el._id
          };
          newOrderArr.push(newOrderObj);
        })
        return newOrderArr
      })
    )
  }
}
