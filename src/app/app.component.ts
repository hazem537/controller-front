import { Component, Inject, LOCALE_ID, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet,NavbarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'controller-front';
  constructor(private authService:AuthService, @Inject(LOCALE_ID) public local: string,){}
  ngOnInit(): void {
    this.authService.autologin()
    
  }
}
