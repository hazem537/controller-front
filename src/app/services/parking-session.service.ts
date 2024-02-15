import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { catchError, tap, throwError } from 'rxjs';
import { IParkingSession } from '../models/parkingSession.model';
import { AuthService } from './auth.service';
import { ICategory } from '../models/category.model';
@Injectable({
  providedIn: 'root'
})
export class ParkingSessionService {
  private apiUrl = environment.apiUrl
  constructor(private http: HttpClient,private authService:AuthService) { }


  get_parking_session_data(card_no: number) {
    return this.http.get<{ session: IParkingSession }>(`${this.apiUrl}session-info/${card_no}`).pipe(
      tap(res => { console.log(res) })
      , catchError(err => {
        console.log(err)
        return throwError(err.error.message)
      })
    )
  }
  update_parking_session_category(session_id: number, new_cat_id: number) {
    return this.http.put<{session:IParkingSession}>(`${this.apiUrl}session/${session_id}/cat/`, { "cat_id": new_cat_id }).pipe(tap(res => { console.log(res) }))
  }
  save_car_out(session_id:number){
  return this.http.post<{session:IParkingSession}>(`${this.apiUrl}car-exit/`,{session_id:session_id}).pipe(
    tap(res=>{
      console.log(res)
      this.authService.set_amount(res.session.cash)
    }),catchError(err=>{
      console.log(err)
      return throwError(err)
    })
  )
  }
  save_lost_card(){
    return this.http.post<{session:IParkingSession}>(`${this.apiUrl}card-lost/`,{}).pipe(
      tap(res=>{
        console.log(res)
         this.authService.set_amount(res.session.cash)
      })
    )
  }
}
