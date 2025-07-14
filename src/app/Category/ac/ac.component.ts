import { Component , OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { Product } from 'src/app/Model/common.model';
import { OrderService } from 'src/app/Service/Order.Service';
import { CartService } from 'src/app/Service/cart.service';
import { DataLookupService } from 'src/app/Service/data.service';

@Component({
  selector: 'app-ac',
  templateUrl: './ac.component.html',
  styleUrls: ['./ac.component.css']
})
export class ACComponent implements OnInit {

  AC:Product[]=[];
  
  isLoading=true;

  constructor(private router:Router,private cartService:CartService, private orderService: OrderService, private dataService:DataLookupService){}

  ngOnInit(): void {

    const storedProducts = this.dataService.getProducts();

    if (storedProducts.length > 0) {
       this.AC = storedProducts.filter((product:any) => product.category === "AC");
       this.isLoading=false;
    } else {
    this.orderService.getAllProducts().subscribe(
      (data) => {
        this.AC = data.filter((product:any) => product.category === "AC");
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
  

  getStarRating(rating: string): (number | string)[] {
    const numStars = parseFloat(rating);
    const result = [];
  
    for (let i = 0; i < Math.floor(numStars); i++) {
      result.push(i + 1);
    }
  
    if (numStars % 1 !== 0) {
      result.push('half'); // Add 'half' for half-star
    }
  
    const remainingStars = 5 - result.length; // Assuming 5 stars in total
    for (let i = 0; i < remainingStars; i++) {
      result.push('empty'); // Add 'empty' for empty stars
    }
  
    return result;
  }
  
  

  addToCart(product: any) {
    this.cartService.addToCart(product);
  }

  goToProductDetails(product: Product) {
    this.dataService.setSelectedProduct(product);
    this.router.navigate(['/Product', product.category, product.id,product.title]);
  }

  navigateHome(){
    this.router.navigate(['/']);
  }

}
