import { CurrencyPipe, DatePipe } from '@angular/common';
import {
  Component,
  OnInit,
  Input,
  ChangeDetectorRef,
  ElementRef,
  Renderer2,
  ViewChild,
  LOCALE_ID,
  Inject
} from '@angular/core';
import {
  FormGroupDirective,
  FormGroup,
  FormControl,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { cashDetailForm } from '../../models/cash.model';
import { log } from '../../models/log.model';
import { Product } from '../../models/produc.model';
import { User } from '../../models/user.model';
import { AuthService } from '../../services/auth.service';
import { CashDetailService } from '../../services/cash-detail.service';
import { CashService } from '../../services/cash.service';
import { LogService } from '../../services/log.service';
import { ProductService } from '../../services/product.service';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';

import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';

@Component({
  selector: 'app-main-user',
  standalone: true,
  imports: [
    MatRadioModule,
    MatFormFieldModule,
    MatInputModule,
    MatSnackBarModule,
    MatButtonModule,
    ReactiveFormsModule,
    DatePipe,
    MatIconModule,
    CurrencyPipe
  ],
  templateUrl: './main-user.component.html',
  styleUrl: './main-user.component.css',
})
export class MainUserComponent implements OnInit {
  // form
  @ViewChild(FormGroupDirective) form!: FormGroupDirective;
  // injput
  @ViewChild('card_no_input') card_no_input!: ElementRef;

  @Input() user!: User;
  @Input() products!: Product[];
  out_form!: FormGroup;
  logdata!: log | null;
  now = new Date();
  duration: any;
  total: number = 0;
  payment_number!: number;
  paied!: FormControl;
  lost_card = false;
  constructor(
    private authService: AuthService,
    private productService: ProductService,
    private logService: LogService,
    private cashdetailService: CashDetailService,
    private datePipe: DatePipe,
    private cdr: ChangeDetectorRef,
    private snakbar: MatSnackBar,
    private cashService: CashService,
    private renderer: Renderer2,
    @Inject(LOCALE_ID) public local:string  

  ) {}
  ngOnInit(): void {
    // this.authService.set_amount(600)
    this.paied = new FormControl(0);
    this.out_form = new FormGroup({
      card_no: new FormControl(null, Validators.required),
      type_car: new FormControl(null, Validators.required),
    });

    // card_no in
    this.out_form.get('card_no')?.valueChanges.subscribe((value) => {
      this.logdata = null;
      this.out_form.get('type_car')?.setValue(null);
      this.paied.setValue(0);
      if (!(Math.abs(value).toString().length < 7)) {
        this.logService.get_log_by(value).subscribe(
          (res) => {
            this.logdata = res.data;
            this.duration = this.get_duration(this.logdata.time);
            // duration  = this.now - new Date(this.logdata.time)
          },
          (error) => {
            this.snakbar.open('هذا الكارت غير موجود ', 'Dismiss', {
              duration: 2000,
            });
          }
        );
      }
    });
    if (this.out_form.get('type_car')?.value) {
      this.total = this.duration * this.out_form.get('type_car')?.value;
    }
    this.out_form.get('type_car')?.valueChanges.subscribe((value) => {
      if (value) {
        this.total = this.duration * value.money_per_hour;
      }
    });
  }
  get_duration(intime: any) {
    return Math.ceil(
      (new Date().getTime() - new Date(intime).getTime()) / (1000 * 60 * 60)
    );
  }
  save() {
    // cxall endfpoitn pas dat to it
    if (this.logdata) {
      let cash_form: cashDetailForm = {
        card_no: this.out_form.get('card_no')?.value,
        log_id: this.logdata?.id,
        time_out: this.datePipe
          .transform(this.now, 'yyyy-MM-dd hh:mm')!
          .toString(),
        product: this.out_form.get('type_car')?.value.name,
        product_cost: this.out_form.get('type_car')?.value.money_per_hour,
        total: this.total.toString(),
        duration: this.duration,
        machine_out: this.user.detail.machine.id,
      };

      this.cashdetailService.addcash(cash_form).subscribe(
        (res) => {
          if (res !== null) {
            // console.log(res.payment_id)
            this.payment_number = res.payment_id;
            this.cdr.detectChanges();
            // console.log(this.payment_number)
            print();
            this.form.resetForm();
            this.foucsinput();
          }
        },
        (err) => {}
      );
    }
  }

  foucsinput() {
    if (this.card_no_input && this.card_no_input.nativeElement) {
      this.card_no_input.nativeElement.focus();
    }
  }
  ngAfterViewInit(): void {
    // console.log(this.card_no_input.nativeElement)
    if (!this.user.user.is_superuser) {
      this.renderer.setProperty(
        this.card_no_input.nativeElement,
        'autofocus',
        true
      );
    }
  }

  card_lost() {
    this.lost_card = true;
    this.cashdetailService.card_lost().subscribe(
      (res) => {
        this.payment_number = res.payment_id;
        this.cdr.detectChanges();
        print();
        this.foucsinput();
      },
      (err) => {}
    );
  }
}
