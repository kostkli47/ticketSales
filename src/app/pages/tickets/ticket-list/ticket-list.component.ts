import { style } from '@angular/animations';
import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription, debounceTime, fromEvent } from 'rxjs';
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
export class TicketListComponent implements OnInit, AfterViewInit, OnDestroy {
  tickets: ITour[]=[] ;
  ticketsCopy:ITour[];
  filterData: {type: ITour[]} = {
    type:[]
  }; 
  inputSearch: string;
  loadCountBlock: boolean;
  loadBlock: boolean;




  @ViewChild('tourWrap', {read: BlocksStyleDirective}) blockDirective:BlocksStyleDirective;
  @ViewChild('tourWrap') tourWrap:ElementRef;

  tourUnsubscriber: Subscription;
  @ViewChild('ticketSearch') ticketSearch: ElementRef;
  searchTicketSub: Subscription;
  ticketSearchValue: string;




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
    this.loadCountBlock = true;

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
      
 
      this.filterData.type = [...this.tickets] 
      if (data.date) {
        const dateWithoutTime = new Date(data.date).toISOString().split('T');
        const dateValue = dateWithoutTime[0]
        console.log('dateValue',dateValue)
        this.tickets= this.ticketsCopy.filter((el) => el.date === dateValue);
      }

      setTimeout(() => {
        this.blockDirective.updateItems();
        this.blockDirective.initStyle(0);
      });
    });
  }



  ngAfterViewInit():void{
    const fromEventObserver = fromEvent(this.ticketSearch.nativeElement, 'keyup');
    
    this.searchTicketSub=fromEventObserver.pipe(

      debounceTime(200)).subscribe((ev:any)=>{
     
        if (this.ticketSearchValue) {
          this.tickets = this.ticketsCopy.filter((el)=> el.name.toLowerCase().includes(this.ticketSearchValue));
        } else {
          this.tickets = this.filterData.type? [...this.filterData.type]:[...this.ticketsCopy];
        }
       
        if (this.tickets.length <=0) {
          this.loadBlock = true;
          this.loadCountBlock = false;
         
        } else {
          this.loadBlock = false;
          this.loadCountBlock = true;
        }    
      });       
}

  ngOnDestroy() {
    this.tourUnsubscriber.unsubscribe();
    this.searchTicketSub.unsubscribe();
   }


  goToTicketInfoPage(item:ITour) {
    this.router.navigate([`/tickets/ticket/${item.id}`]);
    
  }

  directiveRenderComplete(ev: boolean){
  
    const el:HTMLElement = this.tourWrap.nativeElement;
     el.setAttribute('Style', 'background-color : #F9F6F6')
      this.blockDirective.initStyle(0); 
  }
 
   /* findTours(ev: Event | string):void {
    console.log('ev', ev)
      const ticketSearchValue = typeof ev === "string" ? ev : (<HTMLInputElement>ev?.target).value.toLowerCase();

  
      if (ticketSearchValue) {
        this.tickets = this.tickets.filter((el) => el.name.toLowerCase().includes(ticketSearchValue));
      
    } else  {
      this.tickets =  this.filterData.type? [...this.filterData.type] :[...this.ticketsCopy];
    } 
  }    */
  }

