import { Component, OnInit } from '@angular/core';
import { ShiftService } from '../../services/shift.service';
import {
 
  ReactiveFormsModule,
} from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule} from '@angular/material/icon';


import {
  CommonModule,
  CurrencyPipe,
  DatePipe,
  JsonPipe,
} from '@angular/common';
import { UsersService } from '../../services/users.service';
import { User, userdata } from '../../models/user.model';
import { SingleShiftComponent } from './single-shift/single-shift.component';
import { Shift } from '../../models/shift.model';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-shift',
  standalone: true,
  imports: [
    MatCardModule,
    MatInputModule,
    MatIconModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    DatePipe,
    JsonPipe,
    CurrencyPipe,
    MatSelectModule,
    CommonModule,
    MatButtonModule,
    SingleShiftComponent,
    RouterModule
  ],
  templateUrl: './shift.component.html',
  styleUrl: './shift.component.css',
})
export class ShiftComponent implements OnInit {
  constructor(
    private shiftService: ShiftService,
    private usersService: UsersService
  ) {}
  shifts!: Shift[]  ;
  Addshift = false;
  ngOnInit(): void {
    this.shiftService.get_active_shift().subscribe((res) => {
      console.log(res)
      if (res !== null) {
        if(res.data.length==0){
          this.Addshift=true
        }
        this.shifts = res.data;
      }
    },(err)=>{
      console.log(err)
      if(err.statue=404){
        this.Addshift=true
      }
    });
  }
}
