import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MatFormFieldModule } from "@angular/material/form-field"
import { MatInputModule } from "@angular/material/input"
import { MatDialogModule } from "@angular/material/dialog"

import { MatRadioModule } from '@angular/material/radio';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ICategory } from '../../models/category.model';
import { CategoryService } from '../../services/category.service';
import { Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';


@Component({
  selector: 'app-category-op',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, MatDialogModule, MatRadioModule, ReactiveFormsModule],
  templateUrl: './category-op.component.html',
  styleUrl: './category-op.component.css'
})
export class CategoryOpComponent implements OnInit {
  constructor(private categoryService: CategoryService, @Inject(MAT_DIALOG_DATA) public data: { selected_cat: ICategory }) { }
  // add edit mode to handel update
  editmode = false
  category_form!: FormGroup
  ngOnInit(): void {

    this.category_form = new FormGroup({
      name: new FormControl(null, [Validators.required]),
      payment_method: new FormControl(null, [Validators.required]),
      payment_detail: new FormGroup({
        intial_duration: new FormControl(null),
        intial_price: new FormControl(null),
        then_duration: new FormControl(null),
        then_price: new FormControl(null),
        discount_duration: new FormControl(null),
        discount_price: new FormControl(null),
      })
    })
    // check if data come from user or not in dialog data to show if it 
    // update or create
    if (this.data) {
      console.log("start editing")
      this.category_form.patchValue(this.data.selected_cat)
      // check if  pay with what 
//we eill do ok       // in future add pay fied amount add to it
      //  option we have time 1  -subscription  2- no pay  3

    }



    this.category_form.get("payment_method")?.valueChanges.subscribe((value: number) => {
      console.log(value)
      this.category_form.get("payment_detail.intial_duration")?.setValue(null)
      this.category_form.get("payment_detail.intial_price")?.setValue(null)
      if (value == 1) {
        this.category_form.get("payment_detail.intial_duration")?.setValidators([Validators.required, Validators.min(1)])
        this.category_form.get("payment_detail.intial_price")?.setValidators([Validators.required, Validators.min(1)])
      } else {
        this.category_form.get("payment_detail.intial_duration")?.setValidators(null)
        this.category_form.get("payment_detail.intial_price")?.setValidators(null)

      }
      this.category_form.get("payment_detail.intial_duration")?.updateValueAndValidity()
      this.category_form.get("payment_detail.intial_price")?.updateValueAndValidity()


    })
  }

  formSubmit() {
    console.log(this.category_form.value)
    let new_category: ICategory = {
      name: this.category_form.get("name")?.value,
      isExcept: this.category_form.get("payment_method")?.value == 3,
      isSubscription: this.category_form.get("payment_method")?.value == 2,
      ...this.category_form.get("payment_detail")?.value
    }
    if (new_category.intial_duration) {
      new_category.intial_duration = `${new_category.intial_duration}:00:00`
    }
    if (new_category.then_duration) {
      new_category.then_duration = `${new_category.then_duration}:00:00`
    }
    if (new_category.discount_duration) {
      new_category.discount_duration = `${new_category.discount_duration}:00:00`
    }
    console.log(new_category)
    this.categoryService.add_category(new_category).subscribe()

  }


}
