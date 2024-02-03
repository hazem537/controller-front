import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { cashDetailForm } from '../models/cash.model';
import { catchError, tap, throwError } from 'rxjs';
import { AuthService } from './auth.service';
import { IDetail } from '../models/cash_detail.model';
@Injectable({
  providedIn: 'root',
})
export class CashDetailService {
  private apiUrl = environment.apiUrl;
  constructor(private http: HttpClient, private authSerivce: AuthService) {}

  addcash(cash_detail: cashDetailForm) {
    return this.http
      .post<{ cash: { amount: number }; payment_id: number }>(
        `${this.apiUrl}cash_detail/`,
        cash_detail
      )
      .pipe(
        tap((cash) => {
          console.log(cash);
          this.authSerivce.set_amount(cash.cash.amount);
        }),
        catchError((err) => {
          console.log(err);
          return throwError(err);
        })
      );
  }
  card_lost() {
    return this.http
      .get<{ cash: { amount: number }; payment_id: number }>(
        `${this.apiUrl}card-lost/`
      )
      .pipe(
        tap((cash) => {
          this.authSerivce.set_amount(cash.cash.amount);
        }),
        catchError((err) => {
          console.log(err);
          return throwError(err);
        })
      );
  }

  get_cash_detail(id: number) {
    return this.http
      .get<{ detail: IDetail }>(`${this.apiUrl}cash-detail/${id}`)
      .pipe(
        tap((res) => {
          console.log(res);
        }),
        catchError((err) => {
          console.log(err);
          return throwError(err);
        })
      );
  }

  remove_lost_card(id: number) {
    return this.http.delete(`${this.apiUrl}card-lost/${id}`).pipe(
      tap(
        (res) => {
          console.log(res);
        },
        catchError((err) => {
          console.log(err);
          return throwError(err);
        })
      )
    );
  }

  add_offer(id: number, offer: number) {
    return this.http.post(`${this.apiUrl}add-offer/${id}`, {"offer":offer}).pipe(
      tap((res) => {
        console.log(res);
      }),
      catchError((err) => {
        console.log(err)
        return throwError(err)
      })
    );
  }
}
