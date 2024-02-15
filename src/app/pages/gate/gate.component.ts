import { Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';


import { GateService } from '../../services/gate.service';
import { IGate } from '../../models/gate.model';
import { GateOpComponent } from '../../dialogs/gate-op/gate-op.component';
import { LoaderComponent } from '../../shared/loader/loader.component';
import { MatSnackBar } from '@angular/material/snack-bar';



@Component({
  selector: 'app-gate',
  standalone: true,
  imports: [MatIconModule,MatDialogModule,LoaderComponent],
  templateUrl: './gate.component.html',
  styleUrl: './gate.component.css',
})
export class GateComponent implements OnInit {
  gates: IGate[]= [];
loading =false
  constructor(private gateService: GateService, private dialog:MatDialog,private snakbar:MatSnackBar) {}

  ngOnInit(): void {
    this.loading = true
    this.gateService.get_all_gates().subscribe((res) => {
      console.log(res)
      this.loading=false
    },err=>{
      console.log(err)
      this.snakbar.open(`${err}`,"dissmis",{duration:2000})
      this.loading=false
    });
    this.gateService.Gates$.subscribe(res=>{
      if(res!==null){
        this.gates=res
      }
    })
  }

  gate_op(){
    this.dialog.open(GateOpComponent,{width:"500px",height:"400px"})
  }
  edit_gate(gate:IGate){
this.dialog.open(GateOpComponent,{
  data:{gate:gate}
})
  }
  delete_gate(gate:IGate){
    this.gateService.delete_gate(gate.id).subscribe()
  }


  test_gate(gate:IGate){
    this.gateService.test_gate(gate).subscribe(res=>{
      this.snakbar.open(`${res.status}`,"Dissmis")
    })
  }
}
