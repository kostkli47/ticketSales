import { Component } from '@angular/core';
import { ObservableExampleService } from './services/testing/observable-example.service';
import { ConfigService } from './services/config/config.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'ticketSales2022';
  prop:string;

  constructor(private testing: ObservableExampleService,
              private config: ConfigService){
 
  }

  ngOnInit(){
    this.config.configLoad()

    const myObservable = this.testing.getObservable();  //Observable позволяет только подписаться 
    myObservable.subscribe((data)=> {
  /*     console.log('first myObservable data', data) */  //подписчики получат данные
    });
    myObservable.subscribe((data)=> {
      /* console.log('second myObservable data', data) */  //подписчики получат данные
    });



    const mySubject = this.testing.getSubject(); // Возвращаем экземпляр класса Subject
    mySubject.next('subject value');  //данные не будут получены, так как стоят до подписки 
    
   /*  mySubject.subscribe((data)=> {
      console.log('first data subject', data)  // Подписываемся на него
    });
    mySubject.subscribe((data)=> {
    console.log('second data subject', data) 
    }); */

     // Subject позволяет отправить данные
    mySubject.next('subject value1'); 



    const myBehavior = this.testing.getBehaviorSubject();
     
    myBehavior.next('new data from behaviorSubject'); // в Behavior можно отправить данные до подписки
    myBehavior.subscribe((data)=>{
      console.log('first data behaviorSubject', data) //при подписке получим дефолтное значение, указанное в observable-exapmle
    });


    myBehavior.next('new data1 from behaviorSubject');     //отправка данных подписчику 

    myBehavior.subscribe((data)=>{
      console.log('second data behaviorSubject', data) //при подписке получим дефолтное значение, указанное в observable-exapmle
    });
  }
}
