import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { catchError, tap, throwError } from 'rxjs';
import { log } from '../models/log.model';
@Injectable({
  providedIn: 'root',
})
export class LogService {
  private apiUrl = environment.apiUrl;
  constructor(private http: HttpClient) {}
  get_log_by(card_no: number) {
    return this.http.get<{data:log}>(`${this.apiUrl}log/${card_no}`).pipe(
      tap((res) => {
        // console.log(res);
      }),catchError(err=>{
        console.log(err)
        return throwError(err)
      })
    );
  }
}
