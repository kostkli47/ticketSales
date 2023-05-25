import { Component, OnInit } from '@angular/core';
import { IMenuType } from 'src/app/models/menuType';
import { Output, EventEmitter } from '@angular/core';
import { ITour, ITourTypeSelect } from 'src/app/models/tours';
import { TicketsService } from 'src/app/services/tickets/tickets.service';
import { MessageService } from 'primeng/api';
import { SettingsService } from 'src/app/services/settings/settings.service';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-aside',
  templateUrl: './aside.component.html',
  styleUrls: ['./aside.component.scss']
})
export class AsideComponent implements OnInit {
  menuTypes: IMenuType[];
  selectedMenuType: IMenuType;
  @Output() updateMenuType: EventEmitter<IMenuType> = new EventEmitter();

  tourTypes: ITourTypeSelect[] = [
    {label: 'Все', value: 'all'},
    {label: 'Одиночный', value: 'single'},
    {label: 'Групповой', value: 'multi'}
  ]
 

  constructor(private ticketsService:TicketsService,
              private messageService: MessageService,
              private settingsService: SettingsService,
              private http: HttpClient ) { }

  ngOnInit(): void {
    this.menuTypes = [
      {type: 'custom', label : 'Обычное'},
      {type: 'extended', label : 'Расширенное'}
    ]
  }

  changeType(ev: {ev: Event, value: IMenuType}): void {
    console.log('ev', ev)
    this.updateMenuType.emit(ev.value);
  }

  changeTourType(ev:  {ev: Event, value: ITourTypeSelect}): void {
    this.ticketsService.updateTour(ev.value)
  }

  selectDate(ev: string) {
    console.log('ev', ev)
    this.ticketsService.updateTour({date:ev})
};

initRestError(): void {
  this.ticketsService.getError().subscribe({
    next:(data)=> {},
    error: (err) => {
      console.log('err', err);
      this.messageService.add({severity:'error', summary:'500 Internal Server Error'})
    },
      complete:()=>{}
  });
 }

 initSettingsData():void {
  this.settingsService.loadUserSettingsSubject({
    saveToken:false
  })
 }

 initTours(): void {
  this.http.post<ITour[]>("http://localhost:3000/tours/", {}).subscribe((data)=>{
    this.ticketsService.updateTicketList(data); // возвращает данные с сервера
  })  
 }

 deleteTours(): void {
  this.http.delete("http://localhost:3000/tours/").subscribe((data)=>{
    this.ticketsService.updateTicketList([]);
  })
 }

}




