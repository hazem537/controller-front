import { Component, Input, OnInit, Inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { IGate } from '../../models/gate.model';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialogModule, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

import { GateService } from '../../services/gate.service';

@Component({
  selector: 'app-gate-op',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatDialogModule,
  ],
  templateUrl: './gate-op.component.html',
  styleUrl: './gate-op.component.css',
})
export class GateOpComponent implements OnInit {
  constructor(
    private gateService: GateService,
    private snakbar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: {gate:IGate}
  ) {}
  gate!: IGate | null;
  editmode = false;
  gate_form!: FormGroup;
  ngOnInit(): void {
    if (this.data) {
      this.gate = this.data.gate;
      this.editmode = true;
    }
    this.gate_form = new FormGroup({
      name: new FormControl(null, Validators.required),
      ip: new FormControl(null, [
        Validators.required,
        Validators.pattern(
          '^((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$'
        ),
      ]),
      pc_ip :new FormControl(null,[
        Validators.required,
        Validators.pattern(
          '^((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$'
        )
      ])
      ,

      cam_in_ip: new FormControl(null, [
        Validators.required,
        Validators.pattern(
          '^((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$'
        ),
      ]),
      cam_out_ip: new FormControl(null, [
        Validators.required,
        Validators.pattern(
          '^((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$'
        ),
      ]),
    });
    if (this.editmode && this.gate) {
      this.gate_form.patchValue(this.gate);
    }
  }
  submit_form() {
    if(this.editmode && this.gate){
      //  in update state
      this.gateService.update_gate(this.gate.id,this.gate_form.value).subscribe(res=>{},err=>{
        this.snakbar.open(`${err}`, 'dissmis', { duration: 2000 });
      })
    }else{
      //  in  add state
      this.gateService.add_gate(this.gate_form.value).subscribe(
        (res) => {},
        (err) => {
          this.snakbar.open(`${err}`, 'dissmis', { duration: 2000 });
        }
      );
    }
    
  }
}
