import { Component, OnInit } from '@angular/core';
import { ShiftService } from '../../../services/shift.service';
import { Shift } from '../../../models/shift.model';
import { SingleShiftComponent } from '../single-shift/single-shift.component';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { DatePipe, JsonPipe, CurrencyPipe, CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule} from '@angular/material/datepicker';

import { RouterModule } from '@angular/router';
import { provideNativeDateAdapter } from '@angular/material/core';

@Component({
  selector: 'app-day-shift',
  standalone: true,
  imports: [
    MatCardModule,
    MatInputModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    DatePipe,
    JsonPipe,
    CurrencyPipe,
    MatSelectModule,
    CommonModule,
    MatButtonModule,
    SingleShiftComponent,
    MatDatepickerModule,
    RouterModule
  ],
  templateUrl: './day-shift.component.html',
  styleUrl: './day-shift.component.css',
  providers: [provideNativeDateAdapter(),DatePipe],
})
export class DayShiftComponent implements OnInit {
constructor(private shiftService:ShiftService,private datePipe:DatePipe){}
shifts!:Shift[];
Addshift = false;
date!:FormControl
min = new Date()
ngOnInit(): void {
  this.date=new FormControl(null)

  this.date.valueChanges.subscribe(value=>{
    this.Addshift=false
0
    this.shiftService.get_day_shift( this.datePipe.transform(this.date.value,"yyyy-MM-dd")||"").subscribe(
      res=>{
        if(res!==null){
          if(res.length==0){
            this.Addshift=true
          }
          this.shifts =res;
        }
      }
    )
  })
this.date.setValue(this.min)

}

}
