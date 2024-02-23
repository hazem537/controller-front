import { Component, OnInit,ViewChild } from '@angular/core';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule} from '@angular/material/select';

import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

import { AuthService } from '../../services/auth.service';
import {
  FormControl,
  FormGroup,
  FormGroupDirective,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ShiftService } from '../../services/shift.service';
import { userdata } from '../../models/user.model';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatButtonModule,
    MatCardModule,
    MatInputModule,
    ReactiveFormsModule,
    MatSnackBarModule,
    MatSelectModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit {
  constructor(private authService: AuthService,private snakebar:MatSnackBar,private shiftService:ShiftService) {}
  user_name !: FormControl
  loginForm!: FormGroup;
  user!:userdata[]
  @ViewChild(FormGroupDirective) form!:FormGroupDirective; 
  ngOnInit(): void {
    this.user_name = new FormControl(null)
    this.shiftService.get_shift_user().subscribe(
      res=>{
        if(res!==null){
          this.user = res.user
        }
      }
    )
    this.loginForm = new FormGroup({
      username: new FormControl(null, [Validators.required]),
      password: new FormControl(null, [Validators.required]),
    });
    this.user_name.valueChanges.subscribe(value=>{

  
      this.loginForm.get("username")?.patchValue(value)
    })
  }
  onLoginFormSubmit() {
  this.authService.login(this.loginForm.value).subscribe(res=>{
this.form.resetForm()
  },err=>{
    this.snakebar.open(`${err}`,"اغلاق",{duration:2000})
  })

  }


}
