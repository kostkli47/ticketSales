import { Injectable } from '@angular/core';
import { TicketRestService } from '../rest/ticket-rest.service';
import { Observable, Subject } from 'rxjs';
import { ICustomTicketData, INearestTour, ITour, ITourLocation, ITourTypeSelect } from 'src/app/models/tours';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TicketsService {
  //1 вариант
  private ticketSubject = new Subject<ITourTypeSelect>();
  readonly ticketType$ = this.ticketSubject.asObservable(); 

  private ticketUpdateSubject = new Subject<ITour[]>();
  readonly ticketUpdateSubject$ = this.ticketUpdateSubject.asObservable();



  constructor(private ticketServiceRest: TicketRestService,
              private http: HttpClient) { }
  
  //2 вариант
  getTicketTypeObservable(): Observable<ITourTypeSelect> {
    return this.ticketSubject.asObservable(); 
   }
    
   updateTour(type:ITourTypeSelect): void {  
     this.ticketSubject.next(type);  // происходит рассылка и все, кто подписан получат эти данные 
   }

   updateTicketList(data:ITour[]){
    this.ticketUpdateSubject.next(data)
   }

  getTickets():Observable<ITour[]> {
    return this.ticketServiceRest.getTickets();
  }

  getError(): Observable<any> {
    return this.ticketServiceRest.getRestError();
  }

  getNearestTours():Observable<INearestTour[]>{
    return this.ticketServiceRest.getNearestTickets();
  }

  getToursLocation():Observable<ITourLocation[]>{
    return this.ticketServiceRest.getLocationList();
  }

  transformData(data: INearestTour[], regions: ITourLocation[]): ICustomTicketData[] 
  {  const newTicketData: ICustomTicketData[] = [];  
    data.forEach((el) => {   
       const newEl = <ICustomTicketData>{...el};  
         newEl.region = <ICustomTicketData>regions.find((region) => el.locationId === region.id) || {}; 
            newTicketData.push(newEl); 
           }); 
          return newTicketData;
  };

  getRandomNearestEvent(type:number):Observable<INearestTour>{
    return this.ticketServiceRest.getRandomNearestEvent(type);
  }

  sendTourData(data:any): Observable<any> {
    return this.ticketServiceRest.sendTourData(data);
  }
  getTicketById (id:string): Observable<ITour>{
    return this.ticketServiceRest.getTicketById(id);
  }
  createTour(body: any) {
    return this.ticketServiceRest.createTour(body)
  }

}
