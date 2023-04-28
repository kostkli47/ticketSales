import { Component, OnInit } from '@angular/core';
import { ICustomStatisticUser } from 'src/app/models/users';
import { StatisticService } from 'src/app/services/statistic/statistic.service';

@Component({
  selector: 'app-statistic',
  templateUrl: './statistic.component.html',
  styleUrls: ['./statistic.component.scss']
})
export class StatisticComponent implements OnInit {

  cols = [
    {field: 'name', header: 'Имя'},
    {field: 'company', header: 'Компания'},
    {field: 'phone', header: 'Телефон'},
    {field: 'city', header: 'Город'},
    {field: 'street', header: 'Улица'},
  ];
  users: ICustomStatisticUser[]; // локальное свойство. Сюда запишем результат вызова subscribe
 
  constructor(private statisticService:StatisticService) { }

  ngOnInit(): void {
      this.statisticService.getUserStatistic().subscribe((data)=>{
        this.users=data
      });
  }

}
