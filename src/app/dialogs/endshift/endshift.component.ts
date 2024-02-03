import { Component } from '@angular/core';
import { ShiftService } from '../../services/shift.service';
import { AuthService } from '../../services/auth.service';
import {MatDialogModule} from"@angular/material/dialog"

@Component({
  selector: 'app-endshift',
  standalone: true,
  imports: [MatDialogModule],
  templateUrl: './endshift.component.html',
  styleUrl: './endshift.component.css'
})
export class EndshiftComponent {
constructor(private shiftService:ShiftService,private authService:AuthService)
{}
  endshift(passto:string){
    this.shiftService.end_shift_detail(passto).subscribe(res=>{
      this.authService.logout()

    })

  }
}
