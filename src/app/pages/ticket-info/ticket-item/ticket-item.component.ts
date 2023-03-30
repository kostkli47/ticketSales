import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ITour } from 'src/app/models/tours';
import { TiсketsStorageService } from 'src/app/services/tiсkets-storage/tiсkets-storage.service';

@Component({
  selector: 'app-ticket-item',
  templateUrl: './ticket-item.component.html',
  styleUrls: ['./ticket-item.component.scss']
})
export class TicketItemComponent implements OnInit {

  ticket:ITour | undefined;
  constructor(private route:ActivatedRoute,
              private ticketStorage: TiсketsStorageService) { }

  ngOnInit(): void {

    const routeIdParam = this.route.snapshot.paramMap.get('id');

    const paramValueId = routeIdParam;
    if (paramValueId) {
      const ticketStorage = this.ticketStorage.getStorage();
      this.ticket = ticketStorage.find((el) => el.id === paramValueId);
      console.log('this.ticket', this.ticket);
    }




  }

}
