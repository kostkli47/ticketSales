import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { forkJoin } from 'rxjs';
import { INearestTour, ITour, ITourLocation } from 'src/app/models/tours';
import { IUser } from 'src/app/models/users';
import { TicketsService } from 'src/app/services/tickets/tickets.service';
import { TiсketsStorageService } from 'src/app/services/tiсkets-storage/tiсkets-storage.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-ticket-item',
  templateUrl: './ticket-item.component.html',
  styleUrls: ['./ticket-item.component.scss']
})
export class TicketItemComponent implements OnInit {

  ticket:ITour | undefined;
  user: IUser ;
  userForm:FormGroup;
  nearestTours:INearestTour[];
  toursLocation: ITourLocation[];
  
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

//get nearest tours 

forkJoin([this.ticketService.getNearestTours(), this.ticketService.getToursLocation()]).subscribe((data)=>{
  this.nearestTours = data[0]; //
  this.toursLocation = data[1]; //
});



    //params
    const routeIdParam = this.route.snapshot.paramMap.get('id');
    const queryIdParam = this.route.snapshot.queryParamMap.get('id')
    const paramValueId = routeIdParam || queryIdParam;
    if (paramValueId) {
      const ticketStorage = this.ticketStorage.getStorage();
      this.ticket = ticketStorage.find((el) => el.id === paramValueId);
      console.log('this.ticket', this.ticket);
    }
  }

  ngAfterViewInit(): void {
    this.userForm.controls["cardNumber"].setValue(this.user?.cardNumber);
  }

  onSubmit(): void {

  }

  selectDate(ev:Event):void {

  }

}
