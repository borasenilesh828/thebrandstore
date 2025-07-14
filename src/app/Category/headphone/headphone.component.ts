import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from 'src/app/Model/common.model';
import { OrderService } from 'src/app/Service/Order.Service';
import { CartService } from 'src/app/Service/cart.service';
import { DataLookupService } from 'src/app/Service/data.service';

@Component({
  selector: 'app-headphone',
  templateUrl: './headphone.component.html',
  styleUrls: ['./headphone.component.css']
})
export class HeadphoneComponent implements OnInit {

  Headphone:Product[]=[];

  isLoading:boolean=true;

  constructor(private router:Router, private cartService:CartService, private orderService: OrderService, private dataService:DataLookupService){}

  ngOnInit(): void {
    const storedProducts = this.dataService.getProducts();

    if (storedProducts.length > 0) {
       this.Headphone = storedProducts.filter((product:any) => product.category === "Headphone");
       this.isLoading=false;
    } else {
    this.orderService.getAllProducts().subscribe(
      (data) => {
        this.Headphone = data.filter((product:any) => product.category === "Headphone");
        setInterval(()=>{
          this.isLoading=false;
        },2000)
      },
      (error) => {
        console.error('Error fetching products: ', error);
      }
    );
    }
  }

  addToCart(product: Product) {
    this.cartService.addToCart(product);
  }

  goToProductDetails(product: Product) {
    this.dataService.setSelectedProduct(product);
    this.router.navigate(['/Product', product.category, product.id,product.title]);
  }

  getStarRating(rating: string): (number | string)[] {
    const numStars = parseFloat(rating);
    const result = [];
  
    for (let i = 0; i < Math.floor(numStars); i++) {
      result.push(i + 1);
    }
  
    if (numStars % 1 !== 0) {
      result.push('half');
    }
  
    const remainingStars = 5 - result.length; 
    for (let i = 0; i < remainingStars; i++) {
      result.push('empty'); 
    }
  
    return result;
  }

  navigateHome(){
    this.router.navigate(['/']);
  }

}
