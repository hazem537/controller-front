import { Component, OnInit ,ViewChild} from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

import { UsersService } from '../../services/users.service';
import {
  FormControl,
  FormGroup,
  FormGroupDirective,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { User, userdata } from '../../models/user.model';

@Component({
  selector: 'app-changepassword',
  standalone: true,
  imports: [
    MatCardModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatButtonModule,
    MatSnackBarModule,
  ],
  templateUrl: './changepassword.component.html',
  styleUrl: './changepassword.component.css',
})
export class ChangepasswordComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private userService: UsersService,
    private snakebar: MatSnackBar
  ) {}
  @ViewChild(FormGroupDirective) form! :FormGroupDirective;
  change_password_form!: FormGroup;
  users: userdata[] = [];
  loginUser!: User;
  is_admin: boolean = false;
  ngOnInit(): void {

    
    this.change_password_form = new FormGroup({
      username: new FormControl(null, [Validators.required]),
      password: new FormControl(null, [Validators.required]),
    });
    // get user data logined
    this.authService.getUser().subscribe((user) => {
      // console.log(user);
      if (user && user.user) {
        this.loginUser = user;
        this.is_admin = user?.user.is_superuser;
        if (this.is_admin) {
          this.userService.get_all_users().subscribe((res: userdata[]|null) => {
            if(res!==null){
              this.users = res;
            }
          });
          
        }else{
          this.change_password_form.get("username")?.setValue(this.loginUser.user.username)
          this.change_password_form.get("username")?.removeValidators([])
        }
      }
    });

  }
  onformsubmit() {
    // console.log(this.change_password_form.value);

    this.authService.change_password(this.change_password_form.value).subscribe(
      (res) => {
        this.snakebar.open(res.message, 'الغاء', { duration: 2000 });
        this.form.resetForm()
      },
      (err) => {
        this.snakebar.open(err, 'الغاء', { duration: 2000 });
      }
    );
  }
}
