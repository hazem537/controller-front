import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, catchError, of, tap, throwError } from 'rxjs';
import { AuthService } from './auth.service';
import { Shift, ShiftDetail, shift_form } from '../models/shift.model';
import { userdata } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class ShiftService {
  private apiUrl = environment.apiUrl;

shifts =new BehaviorSubject<Shift[]|null>(null)
  constructor(private http: HttpClient, private authServiec: AuthService) {}
  get_active_shift() {
    return this.http.get<{data:Shift[]}>(`${this.apiUrl}active-shift/`).pipe(
      tap((data) => {
        if(data!==null){
          this.shifts.next(data.data)
        }
      }),
      catchError((err) => {
        if (err.error.code == 'token_not_valid') {
          this.authServiec.logout();
          return of(null);
        } else {
          return throwError(err);
        }
      })
    );
  }
  get_day_shift(date:null|string=null) {
    if(date){
      return this.http.get<Shift[]>(`${this.apiUrl}day-shift/${date}`).pipe(
        tap((data) => {
          console.log(data);
        }),
        catchError((err) => {
          console.log(err)

          if (err.error.code == 'token_not_valid') {
            this.authServiec.logout();
            return of(null);
          } else {
            return throwError(err);
          }
        })
      );
    }else{
      return this.http.get<Shift[]>(`${this.apiUrl}day-shift/`,).pipe(
        tap((data) => {
          console.log(data);
        }),
        catchError((err) => {
          console.log(err)
          if (err.error.code == 'token_not_valid') {
            this.authServiec.logout();
            return of(null);
          } else {
            return throwError(err);
          }
        })
      );


    }
    
  }



  put_shift_detail(user: userdata, shift_detail: ShiftDetail) {
    console.log(user);
    return this.http
      .patch<{ shift: ShiftDetail; user: userdata }>(
        `${this.apiUrl}shift-detail/${shift_detail.id}`,
        {
          user: user.id,
        }
      )
      .pipe(
        tap((data) => {
          console.log(data);
        }),
        catchError((err) => {
          console.log(err.error.error);
          return throwError(err.error.error);
        })
      );
  }
  add_shift(new_shift: shift_form) {
    return this.http.post(`${this.apiUrl}shiftC/`, new_shift).pipe(
      tap((res) => {
        console.log(res);
      }),
      catchError((err) => {
        if(err.error.non_field_errors){
          return throwError("this shit is exist ");
        }
        return throwError(err.error);

      })
    );
  }

end_shift_detail(passto:string){
return this.http.post(`${this.apiUrl}end-shift/`,{passto:passto}).pipe(tap(res=>{
  console.log(res)
  
}))
}

}