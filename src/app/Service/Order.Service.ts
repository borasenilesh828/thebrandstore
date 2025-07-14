import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CONFIG } from 'src/environments/config';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  // private apiUrl = 'https://thebrandstore.onrender.com/api';

  constructor(private http: HttpClient) {}

getAllProducts(): Observable<any> {
    return this.http.get(CONFIG.PRODUCT.GETPRODUCTS);
}

registerUser(username: string, email: string, password: string): Observable<any> {
    const user = { username, email, password };
    return this.http.post(CONFIG.AUTH.REGISTER, user);
}

loginUser(email: string, password: string): Observable<any> {
  const user = { email, password };
  return this.http.post(CONFIG.AUTH.LOGIN, user);
}



createOrder(email: string,orderID:string,product_total:number,gst:number,discount:number,Shipping:any,total_price:number,payment:string, cartItems: any[]): Observable<any> {
  return this.http.post(CONFIG.PRODUCT.CREATEORDER, { email,orderID,product_total,gst,discount,Shipping,total_price,payment, cartItems });
}



OrderHistory(email: string): Observable<any> {
  return this.http.get(`${CONFIG.PRODUCT.ORDERHISTORY}?email=${email}`);
}

CartHistory(email: string): Observable<any> {
  return this.http.get(`${CONFIG.PRODUCT.CARTHISTORY}/${email}`);
}


addItemToCart(email: string, productId: string, quantity: number,price:string,brand:string,title:string,image:string): Observable<any> {
  const item = { email, productId, quantity,price,brand,title,image};
  return this.http.post(CONFIG.PRODUCT.ADDTOCART, item);
}


getProductDetails(productId: string): Observable<any> {
  const url = `${CONFIG.PRODUCT.PRODUCTDETAILS}/${productId}`;
  return this.http.get(url);
}

removeFromCart(email: string, productId: string, quantity: number): Observable<any> {
  const requestBody = { email, productId, quantity };
  return this.http.post(CONFIG.PRODUCT.REMOVEFROMCART, requestBody);
}

DeleteCartHistory(email: string): Observable<any> {
  return this.http.post(CONFIG.PRODUCT.DELETECARTHISTORY, { email });
}


}
