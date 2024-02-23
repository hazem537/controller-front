import { userdata } from "./user.model";


export interface ShiftDetail {
    id: number;
    machine: { name: string };
    cash: { amount: number };
    user: userdata;
    ended: boolean;
}
export interface Shift {
    start: Date;
    end: Date;
    date: string;
    total: number;
    type: string;
    detail: ShiftDetail[]
}
export interface shift_form {
    type: string;
    date: string;
}



// use it for report 
export interface ICarReport {
    category: number;
    count: number
}

export interface IShiftReport {
    car_in: number;
    car_out: number;
    car_in_detail: ICarReport[];
    car_out_detail: ICarReport[];
    cash: number;
    user:string;
    machine:string
    
}

export interface IMainShiftReport {
    start:string;
    end:string
    date:string
    type:string
    car_in:number
    car_in_detail:ICarReport[]
    car_out:number
    car_out_detail:ICarReport[]
    all_cash:number
    detail:IShiftReport[]
}