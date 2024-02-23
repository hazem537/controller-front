import { Component, Inject, LOCALE_ID, OnInit } from '@angular/core';
import { CashDetailService } from '../../services/cash-detail.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { cashDetailForm } from '../../models/cash.model';
import { IDetail } from '../../models/cash_detail.model';
import { CurrencyPipe, DatePipe } from '@angular/common';
import { ParkingSessionService } from '../../services/parking-session.service';
import { IParkingSession } from '../../models/parkingSession.model';
import { DurationPipe } from '../../pipes/duration.pipe';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-offers',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, ReactiveFormsModule, DatePipe, DurationPipe, CurrencyPipe],
  templateUrl: './offers.component.html',
  styleUrl: './offers.component.css',
})
export class OffersComponent implements OnInit {
  payment_no!: FormControl;
  offer !: FormControl;
  card_number !: FormControl;
  payment_detail!: IParkingSession | null;
  new_payment_detail!: IParkingSession | null;

  constructor(private ParkingSessionService: ParkingSessionService,
    @Inject(LOCALE_ID) public local: string,
    private snakbar: MatSnackBar) { }
  ngOnInit(): void {
    this.offer = new FormControl(null, Validators.required)
    this.payment_no = new FormControl(null);
    // this.card_number = new FormControl(null);

    this.payment_no.valueChanges.subscribe((value) => {

      this.offer.setValue(null)
      this.payment_detail = null;
      // this.card_number.patchValue(null)

      if (value > 0) {
        this.ParkingSessionService.get_parking_session_id(this.payment_no.value).subscribe(
          res => {
            console.log(res)
            this.payment_detail = res
          },
          err => {
            this.snakbar.open("ERROR HAPPEND ", "Dissmis", { duration: 2000 })
          }
        )
      }
    });


    // this.card_number.valueChanges.subscribe(value => {
    //   if (value<7){

    //     this.ParkingSessionService.get_parking_session_data(value).subscribe(
    //       res=>{   this.new_payment_detail =res.session }
    //       ,err=>{}
    //       )
    //   }


    // })




  }

  get_parking_session_card_number(card_no: number) {

    this.ParkingSessionService.get_parking_session_data(card_no)

  }
  remove_lost_card() {
    console.log(this.payment_no.value)
    this.ParkingSessionService.delete_lost_card(this.payment_no.value).subscribe(
      res=>{
        this.snakbar.open("delete done","dissmis",{duration:2000})
        this.payment_no .patchValue(null)
        this.payment_detail =null
      },
      err=>{ 
          console.log(err);
          this.snakbar.open("error happen","dissmis",{duration:2000}),
          this.payment_no .patchValue(null)
          this.payment_detail=null
        }
    )
  }


  add_offer() {

    this.ParkingSessionService.add_offer(this.offer.value, this.payment_no.value)
      .subscribe(res => {
        this.snakbar.open("update offer done ", "Dissmis", { duration: 2000 })
        this.payment_no.patchValue(null)
      }, err => {
        this.snakbar.open("ERROR HAPPEND ", "Dissmis", { duration: 2000 })

      })
    //  get offer value 
    // 
  }
}
