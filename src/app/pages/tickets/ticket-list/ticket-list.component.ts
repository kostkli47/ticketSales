import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { BlocksStyleDirective } from 'src/app/directive/blocks-style.directive';
import { ITour } from 'src/app/models/tours';
import { TicketsService } from 'src/app/services/tickets/tickets.service';
import { TiсketsStorageService } from 'src/app/services/tiсkets-storage/tiсkets-storage.service';

@Component({
  selector: 'app-ticket-list',
  templateUrl: './ticket-list.component.html',
  styleUrls: ['./ticket-list.component.scss']
})
export class TicketListComponent implements OnInit {
  tickets: ITour[];
  ticketsCopy:ITour[];

  @ViewChild('tourWrap', {read: BlocksStyleDirective}) blockDirective:BlocksStyleDirective;
  @ViewChild('tourWrap') tourWrap:ElementRef;
 

  constructor(private ticketsService: TicketsService,
              private router: Router,
              private ticketStorage: TiсketsStorageService) { }

  ngOnInit(): void {
    this.ticketsService.getTickets().subscribe(
      (data) => {
        this.tickets = data;
        this.ticketsCopy = [...this.tickets];
        this.ticketStorage.setStorage(data);
      }
    )
  }

  ngAfterViewInit(){
  
  }
  goToTicketInfoPage(item:ITour) {
    this.router.navigate([`/tickets/ticket/${item.id}`])
  }

  directiveRenderComplete(ev: boolean){
     const el:HTMLElement = this.tourWrap.nativeElement;
     el.setAttribute('Style', 'background-color : #F9F6F6')
      this.blockDirective.initStyle(3)
  }

  findTours(ev: Event):void {
    console.log('ev', ev)
      const searchValue = (<HTMLInputElement>ev.target).value;

      if (searchValue) {
        this.tickets = this.ticketsCopy.filter((el) => el.name.includes(searchValue));
      } else {
        this.tickets = [...this.ticketsCopy];
      }
  }

}
