

export interface User{
    token:string;
    user:userdata;
    shift:user_shift;
    detail:user_detail;
}

export interface user_detail {
    id:number;
    user:userdata;
    machine:user_machine;
    cash:user_cash
}

export interface user_cash{
    amount:number
} 


export interface userdata {

    id:number;
    username:string;
    is_superuser:boolean;
}

export interface user_shift{
id:number;
start:string;
end:string;
date:Date;
type:string;
}
export interface user_machine{
    id:number;
    name:string;
    Place:string;
}