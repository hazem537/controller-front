import { Component ,Input, OnChanges, OnInit, SimpleChanges,LOCALE_ID, Inject } from '@angular/core';
import { Shift } from '../../../models/shift.model';
import { DetailComponent } from './detail/detail.component';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-single-shift',
  standalone: true,
  imports: [DetailComponent,DatePipe],
  templateUrl: './single-shift.component.html',
  styleUrl: './single-shift.component.css'
})
export class SingleShiftComponent implements OnInit ,OnChanges{
constructor( @Inject(LOCALE_ID) public locale :string){}
  @Input() Shift!:Shift
// date!:string;
ngOnInit(): void {
  
  // this.date = this.Shift.date
  // console.log(this.Shift)
}
ngOnChanges(changes: SimpleChanges) {
  // console.log(changes)
this.ngOnInit()
}
}
