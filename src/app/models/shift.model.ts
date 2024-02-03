import { userdata } from "./user.model";


export interface ShiftDetail {
    id:number;
    machine:{name:string};
    cash:{amount:number};
    user:userdata;
    ended:boolean;
}
export interface Shift {
    start :Date;
    end:Date;
    date:string;
    total:number;
    type:string;
    detail:ShiftDetail[]
}
export interface shift_form{
    type:string;
    date:string;
}