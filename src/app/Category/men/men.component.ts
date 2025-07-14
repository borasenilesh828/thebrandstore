import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Product } from 'src/app/Model/common.model';
import { OrderService } from 'src/app/Service/Order.Service';
import { CartService } from 'src/app/Service/cart.service';
import { DataLookupService } from 'src/app/Service/data.service';

@Component({
  selector: 'app-men',
  templateUrl: './men.component.html',
  styleUrls: ['./men.component.css']
})
export class MenComponent implements OnInit {
  
  Jeans:Product[]=[];
  Shirt:Product[]=[];
  TShirt:Product[]=[];
  Shoes:Product[]=[];
  Jacket:Product[]=[];
  Hoodie:Product[]=[];
  
  constructor(private router: Router, public messageService: MessageService, private cartService:CartService, private orderService: OrderService, private dataService:DataLookupService) {}
  

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

  isLoading: boolean = true;
  
  ngOnInit(): void {
    window.scrollTo(0, 0);
    const storedProducts = this.dataService.getProducts();

    if (storedProducts.length > 0) {
      this.Jeans = storedProducts.filter((product:any) => product.subcategory === "Jeans");
      this.Jacket =storedProducts.filter((product:any) => product.subcategory === "Jacket");
      this.Shirt = storedProducts.filter((product:any) => product.subcategory === "Shirt");
      this.Shoes = storedProducts.filter((product:any) => product.subcategory === "Shoes");
      this.Hoodie =storedProducts.filter((product:any) => product.subcategory === "Hoodie");
      this.TShirt =storedProducts.filter((product:any) => product.subcategory === "Tshirt");
       this.isLoading=false;
    } else {
    this.orderService.getAllProducts().subscribe(
      (data) => {
        this.Jeans = data.filter((product:any) => product.subcategory === "Jeans");
        this.Jacket = data.filter((product:any) => product.subcategory === "Jacket");
        this.Shirt = data.filter((product:any) => product.subcategory === "Shirt");
        this.Shoes = data.filter((product:any) => product.subcategory === "Shoes");
        this.Hoodie = data.filter((product:any) => product.subcategory === "Hoodie");
        this.TShirt = data.filter((product:any) => product.subcategory === "Tshirt");
        // setInterval(()=>{
          this.isLoading=false;
        // },2000)
      },
      (error) => {
        console.error('Error fetching products: ', error);
     this.isLoading=true;

      }
    );
    }
  }
  
  title:string="Shirt";

  category:{img:string,title:string}[]=[
    {img:"https://rukminim1.flixcart.com/image/612/612/jg406fk0/shirt/c/c/z/m-12111371olivine-jack-jones-original-imaf4f5ezheqnkmy.jpeg?q=70",title:"Shirt"},
    {img:"https://assets.ajio.com/medias/sys_master/root/20230215/Chsl/63ecda38aeb26924e373639b/-473Wx593H-465769192-black-MODEL.jpg",title:"TShirt"},
    {img:"https://assets.ajio.com/medias/sys_master/root/20220923/zKth/632cdf71f997dd1f8d16d0d0/-1117Wx1400H-469271443-blue-MODEL.jpg",title:"Jeans"},
    {img:"https://assets.ajio.com/medias/sys_master/root/20230804/VaVb/64cc2957eebac147fca599a5/-1117Wx1400H-466417834-white-MODEL.jpg",title:"Hoodie"},
    {img:"https://assets.ajio.com/medias/sys_master/root/20230602/ycP8/64793f69d55b7d0c63388163/-1117Wx1400H-461787955-blue-MODEL.jpg",title:"Jacket"},
    {img:"https://assets.ajio.com/medias/sys_master/root/20230801/9pxW/64c8e84eeebac147fc999a72/-1117Wx1400H-466406107-black-MODEL2.jpg",title:"Shoes"},
  ];

  navigate(a:any){
    this.title=a;
  }

  

}
