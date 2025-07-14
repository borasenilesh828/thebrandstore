import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/Service/cart.service';


@Component({
  selector: 'app-coupons-dialog',
  templateUrl: './coupons-dialog.component.html',
  styleUrls: ['./coupons-dialog.component.css']
})
export class CouponsDialogComponent implements OnInit {

  Coupons:any[]=[
    {'Name':'Get UPTO INR 500 Off on a cart value of INR 1990 and Above On Your First Purchase.','Code':'GETFIRST'},
    {'Name':'Shipping on us for Your First Purchase.','Code':'FREESHIP'},
    {'Name':'Get up to 40% off on 1999 and Above. Max Discount Rs. 1000.','Code':'FLASH'},
    {'Name':'Get Upto 25% off on 10000 on MOBILE Products. Max Discount is 2000.','Code':'GETMOBILE'},
    {'Name':'Get upto 30% Off on 2990 and Above. Max Discount Rs. 1000.','Code':'ALLSTARS'},
    {'Name':'Get Upto 35% off on 12000 on TAB Products. Max Discount is 2500.','Code':'GETTAB'},
    {'Name':'Get Upto 45% off on 30000 on LAPTOP Products. Max Discount is 4000.','Code':'GETLAPTOP'},
    {'Name':'Get Upto 45% off on 35000 on TV Products. Max Discount is 5000.','Code':'GETTV'},
  ]


  constructor(private cartService:CartService){}

  ngOnInit(): void {
      this.Coupons;
  }

  copyToClipboard(text: string) {
    const textArea = document.createElement('textarea');
    textArea.value = text;

    // Append the text area to the DOM
    document.body.appendChild(textArea);

    // Select and copy the text to the clipboard
    textArea.select();
    document.execCommand('copy');

    // Remove the text area from the DOM
    document.body.removeChild(textArea);
    this.cartService.CopyAlert();
    
  }

}
