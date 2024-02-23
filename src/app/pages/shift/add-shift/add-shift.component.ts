import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule} from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {provideNativeDateAdapter} from '@angular/material/core';
import { ShiftService } from '../../../services/shift.service';
import { DatePipe } from '@angular/common';
import { shift_form } from '../../../models/shift.model';
import { MatSnackBar,MatSnackBarModule } from '@angular/material/snack-bar';





@Component({
  selector: 'app-add-shift',
  standalone: true,
  imports: [ReactiveFormsModule,MatSnackBarModule,MatDatepickerModule,MatFormFieldModule,MatInputModule,MatSelectModule,MatButtonModule],
  templateUrl: './add-shift.component.html',
  styleUrl: './add-shift.component.css',
  providers: [provideNativeDateAdapter(),DatePipe],
})
export class AddShiftComponent  implements OnInit{
constructor(private shiftService:ShiftService,private datePipe :DatePipe,private snakebar:MatSnackBar){}
shift_form!:FormGroup;
min = new Date()
types!:string[] 

ngOnInit(): void {
this.types =this.shiftService.types
this.min.setDate(this.min.getDate()-1)
  this.shift_form =new FormGroup({
    type : new FormControl("صباحي",Validators.required),
    date : new FormControl(new Date(),Validators.required)
  })
}

onshiftsubmit(){

  let date:Date =  this.shift_form.get('date')?.value
  let shift_data = {...this.shift_form.value}
  shift_data.date=this.datePipe.transform(date, 'yyyy-MM-dd') || ''
  console.log(shift_data)
this.shiftService.add_shift(shift_data).subscribe(res=>{
  console.log(res)
this.snakebar.open("shift added done ","dissmis",{duration:2000})
},err=>{
  console.log(err)
this.snakebar.open(`${err}`,"dissmis",{duration:2000})

})

}

}
