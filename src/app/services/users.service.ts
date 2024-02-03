import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { catchError, of, tap, throwError } from 'rxjs';
import { User, userdata } from '../models/user.model';
import { AuthService } from './auth.service';
@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private apiUrl = environment.apiUrl;
  constructor(private http: HttpClient, private authService: AuthService) {}
  get_all_users() {
    return this.http.get<userdata[]>(`${this.apiUrl}users/`).pipe(
      tap((data) => {
        // console.log(data);
      }),
      catchError((err) => {
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
