import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Product } from '../Model/common.model';
import { BehaviorSubject } from 'rxjs';
import { OrderService } from './Order.Service';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(private messageService:MessageService, private orderService: OrderService, private cookieService:CookieService){}

  email:string=this.cookieService.get('Email');

  CopyAlert(){
    this.messageService.add({ severity: 'success',  detail: 'Coupon copied',});
    setTimeout(() => {
      this.messageService.clear();
    }, 1000);
  }

  private cart: Product[] = [];
  private cartSubject = new BehaviorSubject<Product[]>([]);
  cartc:string='0';

 addToCart(product: Product) {
  if(!this.email){
    this.messageService.add({ severity: 'error', summary: 'Cart', detail: 'Please Login to add item in Cart',});
  }else{
  this.cart.push(product);
  this.cartSubject.next([...this.cart]);
  this.sendToDatabase(product);
  const currentValue = +this.cookieService.get('Cart') || 0;
  const newValue = currentValue + 1;
  this.cookieService.set('Cart', newValue.toString());
  this.cartc=this.cookieService.get('Cart');
  }
}

getCart() {
  return this.cartSubject.asObservable();
}

sendToDatabase(product:any){
  const email = this.email; 
  const productId = product.id; 
  const quantity = 1; 
  const price = product.price;
  const brand = product.brand; 
  const title = product.title; 
  const image =  product.image;

this.orderService.addItemToCart(email, productId, quantity, price, brand, title, image).subscribe(
    (response) => {
      if (response.message) {
        console.log('Item added to cart:', response.message);
        this.messageService.add({ severity: 'success', summary: 'Cart', detail: 'Product added to the cart.',});
        setTimeout(() => {
          this.messageService.clear();
        }, 900);
      } else {
        console.error('Cart operation failed:', response.error);
      }
    },
    (error) => {
      console.error('Cart operation failed:', error);
    }
  );
}


}
