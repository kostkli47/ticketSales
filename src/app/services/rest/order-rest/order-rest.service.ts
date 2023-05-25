import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IOrderServ } from 'src/app/models/order';

@Injectable({
  providedIn: 'root'
})
export class OrderRestService {

  constructor(private http:HttpClient) { }

  getOrderRest(): Observable<IOrderServ[]> {
    return this.http.get<IOrderServ[]>('http://localhost:3000/order/');
  }
}
