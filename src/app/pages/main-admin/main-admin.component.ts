import { Component, Inject, LOCALE_ID, OnInit } from '@angular/core';
import { ShiftService } from '../../services/shift.service';
import { IMainShiftReport } from '../../models/shift.model';
import { CurrencyPipe, DatePipe } from '@angular/common';
import { CategoryPipe } from '../../pipes/category.pipe';
import { CategoryService } from '../../services/category.service';
import { MatChipsModule } from '@angular/material/chips'
import { MatBadgeModule } from '@angular/material/badge'
import { MatIconModule } from '@angular/material/icon'
import { MatMenuModule } from '@angular/material/menu'
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { DateToSystemTimezoneSetter } from 'date-fns/parse/_lib/Setter';
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatInputModule } from '@angular/material/input'
import { MatDatepickerModule } from '@angular/material/datepicker'
import { MatSelectModule } from '@angular/material/select'

import { provideNativeDateAdapter } from '@angular/material/core';

@Component({
  selector: 'app-main-admin',
  standalone: true,
  imports: [DatePipe, CurrencyPipe, CategoryPipe, MatChipsModule, MatBadgeModule, MatIconModule, MatMenuModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatDatepickerModule,MatSelectModule],
  templateUrl: './main-admin.component.html',
  styleUrl: './main-admin.component.css',
  providers: [provideNativeDateAdapter(), DatePipe],
})
export class MainAdminComponent implements OnInit {

  shift_Info !: IMainShiftReport[]
  constructor(@Inject(LOCALE_ID) public local: string, private shiftService: ShiftService, private categoryService: CategoryService) { }
  filter_form !: FormGroup
  now_date = new Date()
  types!: string[]
  ngOnInit(): void {
    this.types = this.shiftService.types
    this.filter_form = new FormGroup({
      date: new FormControl(this.now_date),
      type: new FormControl(this.types[0])
    })
    // console.log(this.filter_form.get("date")?.value)
    this.categoryService.get_all_category().subscribe()
    // console.log(this.filter_form.get("date")?.value.toLocaleDateString())
   this.get_main_shift();
this.filter_form.valueChanges.subscribe(values=>{
  this.get_main_shift();
})

  }
  get_main_shift(){
    this.shiftService.get_main_shift_info(this.filter_form.get("date")?.value.toLocaleDateString(), this.filter_form.get("type")?.value).subscribe(
      res => {
        if (res !== null) {
          this.shift_Info = res
        }
      }
    )

  }
}
