import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IStatisticUser } from 'src/app/models/users';

@Injectable({
  providedIn: 'root'
})
export class StatisticRestService {

  constructor(private http: HttpClient) { }

  getUserStatistic():Observable<IStatisticUser[]> {
    return this.http.get<IStatisticUser[]>('https://jsonplaceholder.typicode.com/users'); //для получения статистики по пользователей
  }
}
