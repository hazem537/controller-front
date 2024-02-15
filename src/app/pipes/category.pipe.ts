import { Pipe, PipeTransform } from '@angular/core';
import { CategoryService } from '../services/category.service';
import { ICategory } from '../models/category.model';

@Pipe({
  name: 'category',
  standalone: true
})
export class CategoryPipe implements PipeTransform {
  categories: ICategory[] = []
  constructor(private categoryService: CategoryService) {

    this.categoryService.categories$.subscribe(res => {
      if (res !== null) {
        this.categories = res
      }
    })
  }
  transform(value: number | undefined, ...args: unknown[]) :ICategory|null {

    if (value) {
      this.categories.find(x => {
        return x.id == value
      })!?.name
      return this.categories.find(x => x.id == value)!
    }
    return null

  }

}
