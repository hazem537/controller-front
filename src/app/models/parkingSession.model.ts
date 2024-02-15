export interface IParkingSession {
    amount_paied: number
    card:string //1
    category: number//4
    check_in_time: string//"2024-02-10T01:57:50+02:00"
    check_out_time:string|null
    duration:  string //"1 16:17:04.785903"
    gate_in : string
    gate_out :null|string
    id:number
    cash:number
    cashier:string
    offer:number
}