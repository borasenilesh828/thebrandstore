import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
// import { DataLookupService } from '../Service/data.service';
import { Router, NavigationEnd } from '@angular/router';
import { DataLookupService } from '../Service/data.service';
import { Product } from '../Model/common.model';
import { CartService } from '../Service/cart.service';



@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {
  
  selectedProduct: Product | null = null;


  constructor( private route: ActivatedRoute, private DataService:DataLookupService, private router:Router, private cartService:CartService) {
    this.DataService.selectedProduct$.subscribe((product) => {
      this.selectedProduct = product;
    });
  }


  ngOnInit(): void {
    window.scrollTo(0, 0);
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

  addToCart(product: any) {
    this.cartService.addToCart(product);
  }

  navigate(){
    const category=this.selectedProduct?.category
    this.router.navigate([`/${this.selectedProduct?.category}`]);
    if(category==="Men's"){
      this.router.navigate(['/Mens']);
    }
    else if(category==="LAPTOP"){
      this.router.navigate(['/Laptop']);
    }
  }
  
}
