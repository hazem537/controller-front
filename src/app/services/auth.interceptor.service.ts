import {
    HttpEvent,
    HttpHandler,
    HttpHeaders,
    HttpInterceptor,
    HttpRequest,
  } from '@angular/common/http';
  import { Injectable } from '@angular/core';
  import { Observable, exhaustMap, of } from 'rxjs';
  import {  switchMap, take } from 'rxjs/operators';

  import { AuthService } from './auth.service';
import { User } from '../models/user.model';
 
  @Injectable({
    providedIn: 'root',
  })
  export class authIntreceprtorService implements HttpInterceptor {
    constructor(private authService: AuthService) {}
  
    intercept(
      req: HttpRequest<any>,
      next: HttpHandler
    ): Observable<HttpEvent<any>> {
 
      return this.authService.getUser().pipe(

        switchMap((user=>{
          if(user!==null){
            const modifiedReq = req.clone({
                    headers: new HttpHeaders().set('Authorization',`Bearer ${user.token}`),
                  });
                  return next.handle(modifiedReq);
          }else {
            return next.handle(req)
          }
        })))
        
      }
      
      
      
    }