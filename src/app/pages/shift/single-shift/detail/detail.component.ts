import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { ShiftDetail } from '../../../../models/shift.model';
// import {} from '@angular/material/input'
import { MatSelectModule } from '@angular/material/select';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatIconModule } from '@angular/material/icon';
import { UsersService } from '../../../../services/users.service';
import { userdata } from '../../../../models/user.model';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { ShiftService } from '../../../../services/shift.service';
import { CurrencyPipe, JsonPipe } from '@angular/common';

@Component({
  selector: 'app-detail',
  standalone: true,
  imports: [
    MatSnackBarModule,
    MatSelectModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    JsonPipe,
    MatIconModule,
    CurrencyPipe,
    MatTooltipModule,
  ],
  templateUrl: './detail.component.html',
  styleUrl: './detail.component.css',
})
export class DetailComponent implements OnInit, OnChanges {
  constructor(
    private snakBar: MatSnackBar,
    private usersService: UsersService,
    private shiftService: ShiftService
  ) {}
  @Input() detail!: ShiftDetail;
  user_input!: FormControl;
  users!: userdata[];
  ngOnInit(): void {
    this.usersService.get_all_users().subscribe((res) => {
      if (res) {
        this.users = res;
      }
    });

    this.user_input = new FormControl(null);
    if (this.detail.user) {
      this.user_input.setValue(this.detail.user);
    }
    if (this.detail.ended) {
      this.user_input.disable();
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.ngOnInit();
  }
  compareFn(o1: userdata, o2: userdata) {
    return o1 && o2 ? o1.id == o2.id : false;
  }
  onchange(event: userdata[]) {
    // console.log(this.user_input.value)
    console.log(event);
    // return
    // this.detail.User=this.user_input.value
    this.shiftService.put_shift_detail(event, this.detail).subscribe(
      (res) => {
        this.snakBar.open(` update doen `, 'dismiss', { duration: 2000 });
      },
      (err) => {
        this.snakBar.open(
          ` ${err}
     `,
          'dismiss',
          { duration: 2000 }
        );
        this.user_input.setValue(this.detail.user);
      }
    );
  }
}
