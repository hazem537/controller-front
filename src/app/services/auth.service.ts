import { Injectable } from '@angular/core';
import{environment } from '../../environments/environment'
import { BehaviorSubject, catchError, take, tap, throwError } from 'rxjs';
import { User } from '../models/user.model';
import { loginForm } from '../models/loginUserForm.interface';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private url =environment.apiUrl
 public User$ = new BehaviorSubject <User|null>(null) 
  constructor(private http :HttpClient, private router: Router) { }

getUser(){
  return this.User$.pipe(take(1))
}

  login(userForm:loginForm){
   return this.http.post<User>(`${this.url}customlogin/`,userForm).pipe
   (
    tap(data=>{
      console.log(data)
      this.handel_auth(data)
    }),catchError(err=>{
      // console.log(err)
      return throwError(err.error.error)
    })
   )
  }
  private handel_auth(userdata:User){
    this.User$.next(userdata)    
    localStorage.setItem("user",JSON.stringify(userdata))
    this.router.navigate(['/'])
  }
  autologin(){
    const userDataString = localStorage.getItem('user');
    if(userDataString){
      const userData: User = JSON.parse(userDataString);
      this.User$.next(userData)
    }
  }
  logout(){
    localStorage.removeItem('user');
    this.User$.next(null);
    this.router.navigate(['/login'])

  }
  change_password(change_password:loginForm){
    return  this.http.post<{message:string}>(`${this.url}change-password/`,change_password).pipe(
      catchError(err=>{
        return throwError("cant change pasword")
      })
    )
  }


  addUser(newuser:loginForm){
    return this.http.post(`${this.url}customsignup/`,newuser).pipe(tap(res=>{console.log(res) }),catchError(err=>{
      console.log(err)
      return throwError(err.error.error)
    }))
  
  }
  set_amount(new_amount:number ){
    let  user_value : User|null = this.User$.getValue()
   if(user_value?.detail.cash){
    user_value.detail.cash.amount =new_amount;
   }

   this.User$.next(user_value)
  }

}
