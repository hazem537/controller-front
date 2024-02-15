import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';import { BehaviorSubject, tap } from 'rxjs';
import { ICategory } from '../models/category.model';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  categories$ =new BehaviorSubject<ICategory[]|null>(null)
  private apiUrl = environment.apiUrl
  constructor(private http: HttpClient ) { }
  get_all_category(){
    return this.http.get<ICategory[]>(`${this.apiUrl}category/`).pipe(tap(res=>{
      // console.log(res)
      this.categories$.next(res)
    }))
  }
  add_category(new_category:ICategory){
    return this.http.post(`${this.apiUrl}category/`,new_category).pipe(tap(res=>{
      this.get_all_category().subscribe()
    }))

  }
  get_short_cat(){
    return this.http.get<ICategory[]>(`${this.apiUrl}category-short-term/`).pipe(
      tap(res=>{
        console.log(res)
      })
    )
  }
}
