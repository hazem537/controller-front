import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs';
import { AuthService } from './auth.service';
@Injectable({
  providedIn: 'root'
})
export class CashService {
 private apiUrl  = environment.apiUrl
  constructor( private http:HttpClient,private authService:AuthService) { }

getcash(){
  return this.http.get<{cash:{amount:number}}>(`${this.apiUrl}cash/`).pipe(tap(res=>{
    this.authService.set_amount(res.cash.amount)
  }))
}

}
