import { Component } from '@angular/core';
import { DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-check-out-dialog',
  templateUrl: './check-out-dialog.component.html',
  styleUrls: ['./check-out-dialog.component.css']
})
export class CheckOutDialogComponent {

  constructor(private ref:DynamicDialogRef){}

  selectedPaymentMethod: string='';
  warning:string='';
 
  

  Confirm(){
    this.warning='Please Select any One';
    if(this.selectedPaymentMethod){
      this.ref.close(this.selectedPaymentMethod);
    }
  }

  removewarning(){
    this.warning='';
  }

  
}
