import { Component, OnInit } from '@angular/core';
import { CashDetailService } from '../../services/cash-detail.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { cashDetailForm } from '../../models/cash.model';
import { IDetail } from '../../models/cash_detail.model';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-offers',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, ReactiveFormsModule,DatePipe],
  templateUrl: './offers.component.html',
  styleUrl: './offers.component.css',
})
export class OffersComponent implements OnInit {
  payment_no!: FormControl;
  payment_detail!: IDetail|null;
  offer !:FormControl;
  constructor(private cashDetailService: CashDetailService) {}
  ngOnInit(): void {
    this.offer= new FormControl(null,Validators.required)
    this.payment_no = new FormControl(null);
    this.payment_no.valueChanges.subscribe((value) => {
    
      this.offer.setValue(null)
      this.payment_detail=null;
    
    
      if (value > 0) {
        this.cashDetailService.get_cash_detail(value).subscribe((res) => {
          if (res !== null) {
            this.payment_detail = res.detail;
          }
        });
      }
    });
  }

  remove_lost_card(){
    if(this.payment_detail){
      this.cashDetailService.remove_lost_card(this.payment_detail.id).subscribe()
    }
  }
  add_offer(){
    if(this.payment_detail){
      if(this.offer.value){
        this.cashDetailService.add_offer(this.payment_detail.id,this.offer.value).subscribe()
      }
    }
  }
}
