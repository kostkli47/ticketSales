import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { BlocksStyleDirective } from 'src/app/directive/blocks-style.directive';
import { ITour, ITourTypeSelect } from 'src/app/models/tours';
import { TicketsService } from 'src/app/services/tickets/tickets.service';
import { TiсketsStorageService } from 'src/app/services/tiсkets-storage/tiсkets-storage.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-ticket-list',
  templateUrl: './ticket-list.component.html',
  styleUrls: ['./ticket-list.component.scss'],
})
export class TicketListComponent implements OnInit, OnDestroy {
  tickets: ITour[];
  ticketsCopy:ITour[];
  filterData: {type: ITour[]} = {
    type:[]
  };
  inputSearch: string;



 

  @ViewChild('tourWrap', {read: BlocksStyleDirective}) blockDirective:BlocksStyleDirective;
  @ViewChild('tourWrap') tourWrap:ElementRef;
  @ViewChild('ticketSearch') ticketSearch: ElementRef;
  private tourUnsubscriber: Subscription;
  searchTicketSub: Subscription;
  ticketSearchValue: string



  constructor(private ticketsService: TicketsService,
              private router: Router,
              private ticketStorage: TiсketsStorageService,
              private userService:UserService) { }

  ngOnInit(): void {
    this.ticketsService.getTickets().subscribe(
      (data) => {
        this.tickets = data;
        this.ticketsCopy = [...this.tickets];
        this.ticketStorage.setStorage(data);
        this.filterData.type = [...data];
      }
    );

  
   
    this.tourUnsubscriber = this.ticketsService.ticketType$.subscribe((data: ITourTypeSelect) => {
      console.log('data', data)
 
      let ticketType: string;
      switch (data.value) {
        case "single":
          this.tickets = this.ticketsCopy.filter((el) => el.type === "single");
          break;
        case "multi":
          this.tickets = this.ticketsCopy.filter((el) => el.type === "multi");
          break;
        case "all":
          this.tickets = [...this.ticketsCopy];
          break;
 
      } 
      if (this.inputSearch){
        this.findTours(this.inputSearch)
      }  
      this.filterData.type = [...this.tickets] 
      
      if (data.date) {
        const dateWithoutTime = new Date(data.date).toISOString().split('T');
        const dateValue = dateWithoutTime[0]
        console.log('dateValue',dateValue)
        this.tickets = this.ticketsCopy.filter((el) => el.date === dateValue);
      }
      setTimeout(() => {
 
        this.blockDirective.updateItems();
  
        this.blockDirective.initStyle(0);  // сбрасываем индекс на 0 элемент
      });
    });
  }

  ngOnDestroy() {
    this.tourUnsubscriber.unsubscribe();
   }

  ngAfterViewInit(){
    
  }
  goToTicketInfoPage(item:ITour) {
    this.router.navigate([`/tickets/ticket/${item.id}`]);
    
  }

  directiveRenderComplete(ev: boolean){
     const el:HTMLElement = this.tourWrap.nativeElement;
     el.setAttribute('Style', 'background-color : #F9F6F6')
      this.blockDirective.initStyle(0)
  }

  findTours(ev: Event | string):void {
    console.log('ev', ev)
      const searchValue = typeof ev === "string" ? ev : (<HTMLInputElement>ev?.target).value.toLowerCase();

  
      if (searchValue) {
        this.tickets = this.tickets.filter((el) => el.name.toLowerCase().includes(searchValue));
      
     
    } else  {
      this.tickets =  this.filterData.type? [...this.filterData.type] :[...this.ticketsCopy];
      
        this.blockDirective.removeItems();
    
    
    } 
    setTimeout(() => {
      this.blockDirective.updateItems();
      this.blockDirective.initStyle(0);
    });
  }

 /*  noFindTours():void {
    if (this.tickets.length=0) {
      const newDiv = document.createElement('p');
      newDiv.innerHTML = 'Не найдено';
      const target = document.querySelector('#target');
      target?.insertAdjacentElement('afterend', newDiv);
    } 
    } */
  }


