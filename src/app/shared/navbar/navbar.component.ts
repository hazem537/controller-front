import { Component, OnInit } from '@angular/core';

import { MatToolbarModule } from '@angular/material/toolbar';
import { AuthService } from '../../services/auth.service';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';

import { MatMenuModule } from '@angular/material/menu';

import { RouterModule } from '@angular/router';
import { User } from '../../models/user.model';
import { EndshiftComponent } from '../../dialogs/endshift/endshift.component';
@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [MatToolbarModule, MatButtonModule,RouterModule,MatMenuModule,MatDialogModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent implements OnInit {
  constructor(private authService: AuthService,private dialog:MatDialog) {}
  loginUser!:User|null;
  is_authenticated: boolean = false;
  ngOnInit(): void {
    this.authService.User$.subscribe((data:User|null)=>{
      // console.log(data)
      if(data!==null){
        this.is_authenticated = !!data;
        this.loginUser =data
      }else{
        this.is_authenticated = false;
        this.loginUser =null
      }
    })

  }
  onLogoutClick() {
    this.authService.logout();
  }
  endshift(){
this.dialog.open(EndshiftComponent,{width:"500px",height:"200px"})
  }
}
