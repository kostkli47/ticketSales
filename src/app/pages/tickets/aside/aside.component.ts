import { Component, OnInit } from '@angular/core';
import { IMenuType } from 'src/app/models/menuType';
import { Output, EventEmitter } from '@angular/core';
import { ITourTypeSelect } from 'src/app/models/tours';
import { TicketsService } from 'src/app/services/tickets/tickets.service';
import { MessageService } from 'primeng/api';
import { SettingsService } from 'src/app/services/settings/settings.service';


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
              private settingsService: SettingsService ) { }

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

}




