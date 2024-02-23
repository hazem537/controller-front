import { CurrencyPipe, DatePipe, JsonPipe } from '@angular/common';
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
import { User } from '../../models/user.model';
import { CashDetailService } from '../../services/cash-detail.service';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';

import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { ParkingSessionService } from '../../services/parking-session.service';
import { IParkingSession } from '../../models/parkingSession.model';
import { DurationPipe } from '../../pipes/duration.pipe';
import { CategoryPipe } from '../../pipes/category.pipe';
import { CategoryService } from '../../services/category.service';
import { ICategory } from '../../models/category.model';
import { ShiftService } from '../../services/shift.service';
import { IShiftReport } from '../../models/shift.model';
import { AuthService } from '../../services/auth.service';
import { GateService } from '../../services/gate.service';

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
    CurrencyPipe,
    JsonPipe,
    DurationPipe,
    CategoryPipe
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

  card_no !: FormControl;
  category !: FormControl;

  payment_number!: number;
  paied!: FormControl;
  lost_card = false;
  // to print shift detail
  print_shift_info = false
  shift_info!: IShiftReport


  short_term_cart !: ICategory[]
  selected_parking_sessoion !: IParkingSession | null;


  constructor(
    private cashdetailService: CashDetailService,
    private cdr: ChangeDetectorRef,
    private snakbar: MatSnackBar,
    private renderer: Renderer2,
    private categoryService: CategoryService,
    private shiftService: ShiftService,

    @Inject(LOCALE_ID) public local: string,
    private sessionService: ParkingSessionService,
    private authService: AuthService,
    private gateService: GateService
  ) { }
  ngOnInit(): void {
    this.categoryService.get_all_category().subscribe()
    this.categoryService.get_short_cat().subscribe(res => { if (res !== null) { this.short_term_cart = res } })
    this.paied = new FormControl(0);
    this.card_no = new FormControl(null, Validators.required),
      this.category = new FormControl(null, Validators.required),



      // card_no in
      this.card_no.valueChanges.subscribe((value) => {
        // this.preventDefault()
        this.paied.setValue(0);
        this.category.setValue(null)
        console.log(value)
        this.selected_parking_sessoion = null

        if (!(Math.abs(value).toString().length < 7)) {

          this.sessionService.get_parking_session_data(value).subscribe(
            res => {
              if (res !== null) {
                this.selected_parking_sessoion = res.session
                this.category.patchValue(this.selected_parking_sessoion.category)
              }
            },
            err => {
              this.card_no.patchValue(null)
              this.snakbar.open(err, "dissmis", { duration: 2000 })
            })
        }
      });

    this.category.valueChanges.subscribe(value => {

      if (value !== null && value !== this.selected_parking_sessoion?.category) {
        if (this.selected_parking_sessoion) {
          this.sessionService.update_parking_session_category(this.selected_parking_sessoion.id, value).subscribe(res => {
            if (res !== null) {
              this.selected_parking_sessoion = res.session
            }
          })
        }
      }
    })


  }

  onKeyPress(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      event.preventDefault()
    }
  }

  car_out() {
    if (this.selected_parking_sessoion) {
      this.sessionService.save_car_out(this.selected_parking_sessoion?.id)
        .subscribe(res => {
          if (res !== null) {
            this.selected_parking_sessoion = res.session
            this.cdr.detectChanges()
            print()
            this.card_no.reset()
            this.selected_parking_sessoion = null

            this.foucsinput()
          }

        }
        )
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
    this.sessionService.save_lost_card().subscribe(res => {
      if (res !== null) {
        this.selected_parking_sessoion = res.session

        this.cdr.detectChanges()
        print()
        this.lost_card = false
        this.selected_parking_sessoion = null
      }
    })
  }


  get_shift_info() {
    this.print_shift_info = true
    this.shiftService.get_shift_detail().subscribe(
      res => {
        if (res !== null) {
          this.shift_info = res.shift
          this.cdr.detectChanges()
          print()
          this.print_shift_info = false
        }
      }
    )
  }

  end_shift() {
    this.print_shift_info = true
    this.shiftService.end_shift_detail().subscribe(
      res => {
        if (res !== null) {
          this.shift_info = res.shift
          this.cdr.detectChanges()
          print()
          this.print_shift_info = false
          this.authService.logout()
        }
      }
    )
  }

  opne_out_gate() {

    this.gateService.opne_out_gate().subscribe(
      res => {
        this.snakbar.open("door open succesfuly", "Dissmis", { duration: 2000 })
      },
      err => {
        this.snakbar.open("door  cant  open ", "Dissmis", { duration: 2000 })

      }
    )

  }


  opne_in_gate() {

    this.gateService.opne_in_gate().subscribe(
      res => {
        this.snakbar.open("door open succesfuly", "Dissmis", { duration: 2000 })
      },
      err => {
        this.snakbar.open("door  cant  open ", "Dissmis", { duration: 2000 })

      }
    )

  }

}
