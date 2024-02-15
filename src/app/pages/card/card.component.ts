import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { CardService } from '../../services/card.service';
import { ICard } from '../../models/card.model';
import { CategoryPipe } from '../../pipes/category.pipe';
import { CategoryService } from '../../services/category.service';
import { LoaderComponent } from '../../shared/loader/loader.component';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { ScrollingModule } from '@angular/cdk/scrolling';

import { MatDialog, MatDialogModule } from '@angular/material/dialog';

import { ICategory } from '../../models/category.model';
import { CardOpComponent } from '../../dialogs/card-op/card-op.component';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [
    CategoryPipe,
    MatSelectModule,
    MatInputModule,
    MatFormFieldModule,
    LoaderComponent,
    ReactiveFormsModule,
    CardOpComponent,
    ScrollingModule
  ],
  templateUrl: './card.component.html',
  // changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrl: './card.component.css',
})
export class CardComponent implements OnInit {
  cards!: ICard[];
  isloading = false;
  filter_form!: FormGroup;
  categories!: ICategory[];
  // search!:FormControl
  // category!:FormControl
  constructor(
    private cardService: CardService,
    private categoryService: CategoryService,
    private dialog:MatDialog
  ) {}
  ngOnInit(): void {
    this.isloading=true
    this.categoryService.get_all_category().subscribe();
    this.categoryService.categories$.subscribe((res) => {
      if (res !== null) {
        this.categories = res;
        this.isloading=false
      }
    });
        this.filter_form = new FormGroup({
          search: new FormControl(null),
          category: new FormControl(null),
        });
        this.filter_form.valueChanges.subscribe((value) => {
          this.cardService
            .get_all_card(
              this.filter_form.get('category')?.value,
              this.filter_form.get('search')?.value
            )
            .subscribe();
        });
    this.cardService.get_all_card().subscribe();
    this.cardService.cards$.subscribe((res) => {
      if (res !== null) {
        this.cards = res;
      }
    });
  }
  add_card(){
    this.dialog.open(CardOpComponent ,{width:"500px",height:"300px"})
  }
  update_card(card:ICard){
    this.dialog.open(CardOpComponent ,{width:"500px",height:"300px",data:{"card":card}})

  }
}
