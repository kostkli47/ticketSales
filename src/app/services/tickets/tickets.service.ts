import { Injectable } from '@angular/core';
import { TicketRestService } from '../rest/ticket-rest.service';
import { Observable } from 'rxjs';
import { ITour } from 'src/app/models/tours';

@Injectable({
  providedIn: 'root'
})
export class TicketsService {

  constructor(private ticketServiceRest: TicketRestService) { }

  getTickets():Observable<ITour[]> {
    return this.ticketServiceRest.getTickets();
  }
}
