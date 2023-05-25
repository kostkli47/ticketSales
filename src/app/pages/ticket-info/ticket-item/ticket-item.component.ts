import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subscription, forkJoin, fromEvent, map } from 'rxjs';
import { IOrder } from 'src/app/models/order';
import { ICustomTicketData, INearestTour, ITour, ITourLocation } from 'src/app/models/tours';
import { IUser } from 'src/app/models/users';
import { TicketRestService } from 'src/app/services/rest/ticket-rest.service';
import { TicketsService } from 'src/app/services/tickets/tickets.service';
import { TiсketsStorageService } from 'src/app/services/tiсkets-storage/tiсkets-storage.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-ticket-item',
  templateUrl: './ticket-item.component.html',
  styleUrls: ['./ticket-item.component.scss']
})
export class TicketItemComponent implements OnInit, AfterViewInit {

  ticket:ITour | undefined;
  user: IUser ;
  userForm:FormGroup;
  nearestTours:ICustomTicketData[];
  toursLocation: ITourLocation[];
  ticketSearchValue: string;
  ticketGet: ITour[];

  tourUnsubscriber: Subscription;
  @ViewChild('ticketSearch') ticketSearch: ElementRef;
  searchTicketSub: Subscription;
  ticketRestSub: Subscription;
 
  searchTypes = [1,2,3]; // эти значения определяют  типы запросов на сервер
  
  
  constructor(private route:ActivatedRoute,
              private ticketStorage: TiсketsStorageService,
              private userService: UserService,
              private ticketService:TicketsService) { }

  ngOnInit(): void {

    this.user = <IUser>this.userService.getUser();
    this.userForm = new FormGroup({                 //определяет валидацию. Ожидает в качестве значения статичное свойство required (обязательное поле)
      firstName: new FormControl('', {validators: Validators.required}), 
      lastName: new FormControl ('', [Validators.required, Validators.minLength(2)]), 
      cardNumber: new FormControl (),
      birthDay: new FormControl(),
      age: new FormControl(),
      citizen: new FormControl()
    });
    this.loadTours();
//get nearest tours 

/* forkJoin([this.ticketService.getNearestTours(), this.ticketService.getToursLocation()]).subscribe((data)=>{
  this.toursLocation = data[1]; 
  this.nearestTours = data[0]; 
 
}); */

/* forkJoin([this.ticketService.getNearestTours(), this.ticketService.getToursLocation()]).pipe ().subscribe(
  (data)=>{
    this.toursLocation = data[1];
    this.nearestTours = this.ticketService.transformData(data[0], data[1]);
  }); */
  
  

    //params
    const routeIdParam = this.route.snapshot.paramMap.get('id');
    const queryIdParam = this.route.snapshot.queryParamMap.get('_id')
    const paramValueId = routeIdParam || queryIdParam;
    if (paramValueId) {
      this.ticketService.getTicketById(paramValueId).subscribe((data)=>{
        this.ticket = data;
      })
   /*    const ticketStorage = this.ticketStorage.getStorage();
      this.ticket = ticketStorage.find((el) => el.id === paramValueId);
      console.log('this.ticket', this.ticket);  */
    }
  }


  loadTours(){
    forkJoin([this.ticketService.getNearestTours(), this.ticketService.getToursLocation()]).pipe ().subscribe(
      (data)=>{
        this.toursLocation = data[1];
        this.nearestTours = this.ticketService.transformData(data[0], data[1]);
      });
    return this.nearestTours
  }

  ngAfterViewInit(): void {
    this.userForm.controls["cardNumber"].setValue(this.user?.cardNumber);
    const fromEventObserver = fromEvent(this.ticketSearch.nativeElement, 'keyup');
    this.searchTicketSub = fromEventObserver.subscribe((ev:any)=>{
      this.initSearchTour()
    })
  }

  ngOnDestroy(): void {
    this.searchTicketSub.unsubscribe();
  }

  initSearchTour():void {
    if(!this.ticketSearchValue){
      this.loadTours();
    }

    const type = Math.floor(Math.random() * this.searchTypes.length); //определяем рандомное число 0,1,2

    if (this.ticketRestSub && !this.searchTicketSub.closed){ // проверяем, если у нас запрос в данный момент не завершен, мы от него отписываемся
      this.ticketRestSub.unsubscribe();
    }
// создаем новый запрос
      this.ticketRestSub = this.ticketService.getRandomNearestEvent(type).subscribe((data)=> {
      this.nearestTours = this.ticketService.transformData([data], this.toursLocation);
    })  
  }

  initTour(): void {
    const userData = this.userForm.getRawValue(); // getRawValue - собирает все данные, которые вводим в инпутах
    const postData = {...this.ticket, ...userData};

    const userId = this.userService.getUser()?.id || null;

    const postObj: IOrder = {          // postObj - объект для отправки на сервер
      age: postData.age,
      birthDay: postData.birthDay,
      cardNumber: postData.cardNumber,
      tourId: postData._id,
      userId: userId,
    }
    
    this.ticketService.sendTourData(postObj).subscribe()
  }


  onSubmit(): void {

  }

  selectDate(ev:Event):void {

  }

}
