import { Component, OnInit, Inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatDialogModule, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CategoryService } from '../../services/category.service';
import { ICategory } from '../../models/category.model';
import { CardService } from '../../services/card.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ICard } from '../../models/card.model';

@Component({
  selector: 'app-card-op',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatDialogModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
  ],
  templateUrl: './card-op.component.html',
  styleUrl: './card-op.component.css',
})
export class CardOpComponent implements OnInit {
  constructor(
    private categoryService: CategoryService,
    private cardService: CardService,
    private snakbar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: { card: ICard }
  ) {
    if (data?.card) {
      this.editmode = true;
    }
  }
  card_form!: FormGroup;
  categories!: ICategory[];
  editmode = false;
  ngOnInit(): void {
    this.categoryService.get_all_category().subscribe();
    this.categoryService.categories$.subscribe((res) => {
      if (res !== null) {
        this.categories = res;
      }
    });
    this.card_form = new FormGroup({
      num: new FormControl(null, [
        Validators.required,
        // Validators.minLength(7),
      ]),
      category: new FormControl(null),
    });
    if (this.editmode && this.data) {
      this.card_form.patchValue(this.data.card);
    }
  }
  form_submit() {
    if (this.editmode) {

      this.cardService.update_card(this.card_form.value,this.data.card.id!).subscribe(res=>{
        this.snakbar.open('update done', 'dimiss', { duration: 2000 });

      })
     } else {
      this.cardService.add_card(this.card_form.value).subscribe(
        (res) => {
          this.snakbar.open('add done', 'dimiss', { duration: 2000 });
        }
        ,
        (err) => {
          this.snakbar.open(`${err}`, 'dimiss', { duration: 2000 });
        }
      );
    }
  }
  CompareFn(opt1: number, opt2: number): boolean {
    return opt1 && opt2 ? opt1 === opt2 : false;
  }
}
