import { Component, OnInit } from '@angular/core';
import { CartService } from '../Service/cart.service';
import { OrderService } from '../Service/Order.Service';
import { CookieService } from 'ngx-cookie-service';
import { DialogService } from 'primeng/dynamicdialog';
import { CheckOutDialogComponent } from '../Lookup/check-out-dialog/check-out-dialog.component';
import { MessageService } from 'primeng/api';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {

  cart:string=this.cookieService.get('Cart');
  email:string=this.cookieService.get('Email');
  cartItem: any[] = [];
  product_total:number=0;
  Gst:number=0;
  Discount:number=0;
  total_price:number=0;
  Shipping:number=0;
  Payment:string='';
  orderID:number=0;

  isLoading: boolean = true;

  constructor(private orderService:OrderService, private cookieService:CookieService, public dialogService: DialogService, public messageService: MessageService, private router: Router) {}

  ngOnInit() {
    window.scrollTo(0, 0);
   this.cartHistory();
  }

  cartHistory(){
    this.orderService.CartHistory(this.email).subscribe((response) => {
      this.cookieService.set('Cart', response.length);
      this.cartItem = response;
      this.cart=this.cookieService.get('Cart');
      this.calculateTotalPrice();
      this.isLoading=false;

      this.cartItem.forEach((item) => {
        if (item.price && typeof item.price === 'string') {
          item.price = item.price.replace(/,/g, ''); 
        }
      });

    });
  }

  calculateTotalPrice() {
    const totalAmounts = this.cartItem.map(item => {
      const price = parseFloat(item.price.toString().replace(/,/g, ''));
      const quantity = parseFloat(item.quantity.toString().replace(/,/g, ''));
      return price * quantity;
    });
  
    const totalPrice = totalAmounts.reduce((total, amount) => total + amount, 0);
    
    // Calculate GST (18%)
    const gst = 0.18 * totalPrice;
  
    // Calculate discount (30%)
    const discount = 0.30 * totalPrice;
  
    // Apply GST and discount to the total price
    const finalTotalPrice = totalPrice + gst - discount + this.Shipping;
  
    this.product_total = totalPrice;
    this.Gst = gst;
    this.Discount = discount;
    this.total_price = finalTotalPrice
    
  }
  

  remove(cart:any){
    this.orderService.removeFromCart(this.email,cart.productId,cart.quantity).subscribe((response) => {
      this.cartHistory();
    });
  }


  checkout(){
    this.dialogService.open(CheckOutDialogComponent,{
      // header:'Wallet',
      width: '90%',
    }).onClose.subscribe((a:any) => {
      if (a) {
        this.Payment=a;
       this.createOrder();
       this.router.navigate(['/']);
      }
    });
  }



createOrder(){
  let Shipping=(this.Shipping===0)?'Free':this.Shipping;
  let x = Math.floor(Math.random() * 1344);
  let orderID = `100${x}`;
  
  this.orderService.createOrder(this.email,orderID,this.product_total,this.Gst,this.Discount,Shipping,this.total_price,this.Payment, this.cartItem)
  .subscribe(response => {
    if(response){
    this.messageService.add({ severity: 'success', summary: 'Order', detail: `Order Successfully Place`,});
    this.clearCart();
    setTimeout(()=>{
      window.location.reload();
      window.scrollTo(0, 0);
    },1000)
    }
  });
}

clearCart(){
  this.orderService.DeleteCartHistory(this.email)
  .subscribe(response => {
    // console.log('Clear Cart:', response);
    this.cartHistory();
  });
}

onCheckboxChange(event: any) {
  if (event.target.checked) {
    this.Shipping = 99;
    this.calculateTotalPrice();
  } else {
    this.Shipping = 0;
    this.calculateTotalPrice();
  }
}
  
}
