import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserService } from '../user/user.service';
import { Observable } from 'rxjs';
import { TicketsService } from '../tickets/tickets.service';


@Injectable({
  providedIn: 'root'
})
export class RestinterceptorsService implements HttpInterceptor {

  constructor(private userService: UserService) { }   //инжектируем класс UserService для получения токена (уникальный ключ)

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    
     const hasToken = this.userService.getToken();

     if (hasToken)  {
      const cloned = req.clone({                   //склонировали текущий запрос методом clone
        headers: req.headers.set("Autorization",  // добавляем  новый заголовок
        "Login " + hasToken)
      });

      return next.handle(cloned); // отправляем запрос методом handle
     } else {
      return next.handle(req);
     }
  }
}
