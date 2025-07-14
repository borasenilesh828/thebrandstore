import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from 'src/app/Model/common.model';
import { OrderService } from 'src/app/Service/Order.Service';
import { CartService } from 'src/app/Service/cart.service';
import { DataLookupService } from 'src/app/Service/data.service';


@Component({
  selector: 'app-laptop',
  templateUrl: './laptop.component.html',
  styleUrls: ['./laptop.component.css']
})
export class LaptopComponent implements OnInit {

  Laptop:Product[]=[];

  constructor(private router:Router, private cartService:CartService, private orderService: OrderService, private dataService:DataLookupService){}

  isLoading:boolean=true;

  ngOnInit(): void {
    const storedProducts = this.dataService.getProducts();

    if (storedProducts.length > 0) {
       this.Laptop = storedProducts.filter((product:any) => product.category === "LAPTOP");
       this.isLoading=false;
    } else {
    this.orderService.getAllProducts().subscribe(
      (data) => {
        this.Laptop = data.filter((product:any) => product.category === "LAPTOP");
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

  addToCart(product: any) {
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
