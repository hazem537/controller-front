import { Component, OnInit, ViewChild } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormGroupDirective,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-add-user',
  standalone: true,
  imports: [
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
  ],
  templateUrl: './add-user.component.html',
  styleUrl: './add-user.component.css',
})
export class AddUserComponent implements OnInit {
  signupForm!: FormGroup;
  @ViewChild(FormGroupDirective) form!: FormGroupDirective;
  constructor(private authService: AuthService, private snakbar: MatSnackBar) {}
  ngOnInit(): void {
    this.signupForm = new FormGroup({
      username: new FormControl(null, [Validators.required]),
      password: new FormControl(null, [Validators.required]),
    });
  }
  onformSubmiit() {
    this.authService.addUser(this.signupForm.value).subscribe(
      (res) => {
        this.snakbar.open(`User added`, 'Dissmis', { duration: 2000 });
        this.form.resetForm();

      },
      (err) => {
        this.snakbar.open(`${err}`, 'Dissmis', { duration: 2000 });
        
      }
    );
  }
}
