import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ITour } from 'src/app/models/tours';
import { TicketsService } from 'src/app/services/tickets/tickets.service';

@Component({
  selector: 'app-tour-loader',
  templateUrl: './tour-loader.component.html',
  styleUrls: ['./tour-loader.component.scss']
})
export class TourLoaderComponent implements OnInit {
  tourForm:FormGroup;
  ticket:ITour | undefined;
  constructor(private ticketService: TicketsService) { }

  ngOnInit(): void {

    this.tourForm = new FormGroup({                 //определяет валидацию. Ожидает в качестве значения статичное свойство required (обязательное поле)
      name: new FormControl('', {validators: Validators.required}), 
      description: new FormControl ('', [Validators.required, Validators.minLength(2)]), 
      operator: new FormControl (),
      price: new FormControl(),
      img: new FormControl(),
    });
  }

  createTour(): void {
    const tourDataRow = this.tourForm.getRawValue();  // getRawValue - считывает все значения
    let formParams = new FormData();
    if (typeof tourDataRow === "object") {
      for (let prop in tourDataRow) {
        formParams.append(prop, tourDataRow[prop]);
      }
    }
    this.ticketService.createTour(formParams).subscribe((data) => {
      
    });
  }

  selectFile(ev:any): void {
    console.log('ev', ev)
    if (ev.target.files.length > 0) {
      const  file = ev.target.files[0];
      console.log('file', file)
      this.tourForm.patchValue({  // patchValue - добавляет значение
        img: file
      });
    }
  }

}
