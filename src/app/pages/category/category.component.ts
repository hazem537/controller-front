import { Component, OnInit } from '@angular/core';
import { ICategory } from '../../models/category.model';
import { CategoryService } from '../../services/category.service';
import { LoaderComponent } from '../../shared/loader/loader.component';
import { CurrencyPipe, DatePipe } from '@angular/common';
import { DurationPipe } from '../../pipes/duration.pipe';
import {MatDialog, MatDialogModule} from '@angular/material/dialog'
import { CategoryOpComponent } from '../../dialogs/category-op/category-op.component';

import { ScrollingModule } from '@angular/cdk/scrolling';

@Component({
  selector: 'app-category',
  standalone: true,
  imports: [LoaderComponent, DatePipe, DurationPipe, CurrencyPipe,MatDialogModule,ScrollingModule],
  templateUrl: './category.component.html',
  styleUrl: './category.component.css',
})
export class CategoryComponent implements OnInit {
  isLoading = false
  categories!: ICategory[];
  constructor(private categoryService: CategoryService,private dialog:MatDialog) { }
  ngOnInit(): void {
    this.isLoading = true
    this.categoryService.get_all_category().subscribe();
    this.categoryService.categories$.subscribe((res) => {
      if (res !== null) {
        this.categories = res;
        this.isLoading = false
      }
    });
  }
  open_cat_dialog(item?:ICategory){
  this.dialog.open(CategoryOpComponent,{width:"500px",height:"500px",data:{
    selected_cat :item
  }})    
  }

}
