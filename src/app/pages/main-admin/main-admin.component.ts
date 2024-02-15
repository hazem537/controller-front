import { Component, Inject, LOCALE_ID, OnInit } from '@angular/core';
import { ShiftService } from '../../services/shift.service';
import { IMainShiftReport } from '../../models/shift.model';
import { CurrencyPipe, DatePipe } from '@angular/common';
import { CategoryPipe } from '../../pipes/category.pipe';
import { CategoryService } from '../../services/category.service';
import {MatChipsModule} from '@angular/material/chips'
import {MatBadgeModule} from '@angular/material/badge'
import {MatIconModule} from '@angular/material/icon'
import {MatMenuModule} from '@angular/material/menu'



@Component({
  selector: 'app-main-admin',
  standalone: true,
  imports: [DatePipe,CurrencyPipe,CategoryPipe,MatChipsModule,MatBadgeModule,MatIconModule,MatMenuModule],
  templateUrl: './main-admin.component.html',
  styleUrl: './main-admin.component.css'
})
export class MainAdminComponent  implements OnInit{
shift_Info !:IMainShiftReport
  constructor(@Inject(LOCALE_ID) public local: string,private shiftService:ShiftService ,private categoryService:CategoryService ){}


  ngOnInit(): void {
    this.categoryService.get_all_category().subscribe()
      this.shiftService.get_main_shift_info().subscribe(
        res=>{
          if(res!==null){
            this.shift_Info =res.shift
          }
        }
      )
  }
}
