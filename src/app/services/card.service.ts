import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';import { BehaviorSubject, catchError, tap, throwError } from 'rxjs';
import { ICard } from '../models/card.model';

@Injectable({
  providedIn: 'root'
})
export class CardService {
private apiUrl=environment.apiUrl
cards$ = new BehaviorSubject<ICard[]|null>(null)   
constructor(private http :HttpClient) { }
get_all_card(category?:null|number,search?:null|number ){
  let params = new HttpParams()
  if (category){
    params=params.append("category",category)
  }
  if(search){
    params=params.append("search",search)
  }

  return this.http.get<{count:number,next:null,previous:null,results:ICard[]}>(`${this.apiUrl}card/`,{params:params}).pipe(
    tap(res=>{
         console.log(res)
      this.cards$.next(res.results)
    })
  )
}
add_card(card:ICard){
  return this.http.post(`${this.apiUrl}card/`,card).pipe(tap(res=>{
 
    this.get_all_card().subscribe()
  }),catchError(err=>{
    console.log(err)
    return this.handel_error(err)
  }))
}

update_card(new_card:ICard, card_id:number){
  return this.http.put(`${this.apiUrl}card/${card_id}`,new_card).pipe(
    tap(res=>{
      this.get_all_card().subscribe()
    }),
    catchError(err=>{
      return this.handel_error(err)
    })
  )
}

errors ={
  num:"this card number is already exist"
}
private handel_error(err:any){
  let error_result:string[]=[]
  for (let k in err.error){
    if(k == "num"){
      error_result.push(this.errors["num"])
    }
  } 
  return throwError(error_result)

}

}
