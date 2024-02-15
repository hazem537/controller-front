import {
  ChangeDetectorRef,
  Component,
  OnInit,
  ViewChild,
  Renderer2,
  ElementRef,
  inject,
  LOCALE_ID,
  AfterViewInit,
} from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { User } from '../../models/user.model';
import { DatePipe, JsonPipe } from '@angular/common';
import { MatRadioModule } from '@angular/material/radio';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

import { ProductService } from '../../services/product.service';
import { Product } from '../../models/produc.model';
import {
  FormControl,
  FormControlDirective,
  FormGroup,
  FormGroupDirective,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { LogService } from '../../services/log.service';
import { log } from '../../models/log.model';
import { cashDetailForm } from '../../models/cash.model';
import { CashDetailService } from '../../services/cash-detail.service';
import { ShiftService } from '../../services/shift.service';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { CashService } from '../../services/cash.service';
import { MainAdminComponent } from '../main-admin/main-admin.component';
import { MainUserComponent } from '../main-user/main-user.component';
@Component({
  selector: 'app-main',
  standalone: true,
  imports: [
    JsonPipe,
    MatRadioModule,
    MatFormFieldModule,
    MatInputModule,
    MatSnackBarModule,
    MatButtonModule,
    ReactiveFormsModule,
    DatePipe,
    MainAdminComponent,
    MainUserComponent,
  ],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css',
  providers: [DatePipe],
})
export class MainComponent implements OnInit, AfterViewInit {

  user!: User;
  products!: Product[];

  constructor(
    private authService: AuthService,
    private productService: ProductService,
    private cashService: CashService,
  ) { }

  ngOnInit(): void {

    this.authService.getUser().subscribe((res) => {
      if (res !== null) {
        this.user = res;
        if (!this.user.user.is_superuser) {
          // this.cashService.getcash().subscribe();
          // this.productService.get_all_products().subscribe((res) => {
          //   if (res !== null) {
          //     this.products = res;
          //   }
          // });
        }
      }
    });




  }

  ngAfterViewInit(): void { }
}
