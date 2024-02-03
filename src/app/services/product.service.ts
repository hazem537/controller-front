import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, of, tap, throwError } from 'rxjs';
import { Product } from '../models/produc.model';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { AuthService } from './auth.service';
@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private apiUrl = environment.apiUrl;
  constructor(private http: HttpClient,private authService:AuthService) {}

  get_all_products() {
    return this.http.get<Product[]>(`${this.apiUrl}products/`).pipe(
      tap((res) => {
        // console.log(res);
      }),
      catchError((err) => {
        console.log(err.error.code);
      return this.handel_errors(err)
      })
    );
  }
  handel_errors (err:any){
    if (err.error.code == 'token_not_valid') {
      this.authService.logout();
      return of(null);
    }
    return throwError(err);
  }
}
