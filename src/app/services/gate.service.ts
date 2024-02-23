import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, catchError, tap, throwError } from 'rxjs';
import { IGate } from '../models/gate.model';

@Injectable({
  providedIn: 'root'
})
export class GateService {
  Gates$ = new BehaviorSubject<IGate[]|null>(null)
  private apiUrl = environment.apiUrl
  constructor(private http :HttpClient) { }
  get_all_gates (){
    return this.http.get<IGate[]>(`${this.apiUrl}gate/`).pipe(
      tap(res=>{
        this.Gates$.next(res)
      }),catchError(err =>{
        console.log(err)
        return throwError(err)
      })
    )
  }
  add_gate(new_gate:IGate){
    return this.http.post(`${this.apiUrl}gate/`,new_gate).pipe(
      tap(res=>{
        console.log(res)
        this.get_all_gates().subscribe()
      }),catchError(err=>{
        return this.handel_err(err)
      
      })
    )
  }
  update_gate(gate_id:number,new_gate:IGate){
    return this.http.put(`${this.apiUrl}gate/${gate_id}/`,new_gate).pipe(
      tap(res=>{
        console.log(res)
        this.get_all_gates().subscribe()
      }),catchError(err=>{
        console.log(err)
        return this.handel_err(err)
      })
    )
  }

  delete_gate(gate_id:number){
    return this.http.delete(`${this.apiUrl}/gate/${gate_id}/`).pipe(
      tap(res=>{
        this.get_all_gates().subscribe()

      }),catchError(err=>{
        console.log(err)
        return throwError("Error Happen when delete this Gate")
      })
    )
  }
  private errors ={
    ip:"this ip Gate is already exist",
    name:"this name Gate is already exist "
  }
  private handel_err(_err: any){
    // console.log(  "ip" in _err.error )
    let errors :string[]=[]
    for (let k in _err.error){
      if(k == "ip"){
        errors.push(this.errors["ip"])
      }else if(k=="name"){
        errors.push(this.errors["name"])
      }
    }
    return throwError (errors.join(","))
  }


test_gate(gate:IGate){
  return this.http.get<{status:string}>(`${this.apiUrl}test-gate/${gate.id}/`).pipe(
    tap( 
      res=>{
        console.log(res)
      }
    
    )
  )
}

opne_out_gate(){
return this.http.get<{"message":string}>(`${this.apiUrl}open_out/`).pipe(tap(
  res=>{
    console.log(res)
  }
))  
}

opne_in_gate(){
  return this.http.get<{"message":string}>(`${this.apiUrl}open_in/`).pipe(tap(
    res=>{
      console.log(res)
    }
  ))  
  }
  

}
