import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { LoginDialogComponent } from '../Lookup/login-dialog/login-dialog.component';
import { OrderService } from '../Service/Order.Service';
import { Product } from '../Model/common.model';
import { DataLookupService } from '../Service/data.service';
import { CartService } from '../Service/cart.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {

  Men: Product[] = [];
  Women: Product[] = [];
  Mobile: Product[] = [];
  Watch: Product[] = [];
  Laptop: Product[] = [];
  TV: Product[] = [];
  Monitor: Product[] = [];

  constructor(
    private router: Router, public dialogService: DialogService, public messageService: MessageService, private orderService: OrderService, private dataService:DataLookupService, private cartService:CartService) {}

    ngOnInit(): void {

    const storedProducts = this.dataService.getProducts();

    if (storedProducts.length > 0) {
      // Use stored data
      this.Men = storedProducts.filter((product: any) => product.category === "Men's");
      this.Women = storedProducts.filter((product: any) => product.category === "Women");
      this.Mobile = storedProducts.filter((product: any) => product.category === "Mobile");
      this.Watch = storedProducts.filter((product: any) => product.category === "Watch");
      this.Laptop = storedProducts.filter((product: any) => product.category === "LAPTOP");
      this.TV = storedProducts.filter((product: any) => product.category === "TV");
      this.Monitor = storedProducts.filter((product: any) => product.category === "Monitor");
    } else {
      this.orderService.getAllProducts().subscribe(
        (data) => {
          this.dataService.setProducts(data);

          this.Men = data.filter((product: any) => product.category === "Men's");
          this.Women = data.filter((product: any) => product.category === "Women");
          this.Mobile = data.filter((product: any) => product.category === "Mobile");
          this.Watch = data.filter((product: any) => product.category === "Watch");
          this.Laptop = data.filter((product: any) => product.category === "LAPTOP");
          this.TV = data.filter((product: any) => product.category === "TV");
          this.Monitor = data.filter((product: any) => product.category === "Monitor");
        },
        (error) => {
          console.error('Error fetching products: ', error);
        }
      );
    }
  }

  category: { img: string; title: string }[] = [
    {
      img: 'https://rukminim1.flixcart.com/image/612/612/jg406fk0/shirt/c/c/z/m-12111371olivine-jack-jones-original-imaf4f5ezheqnkmy.jpeg?q=70',
      title: 'Mens',
    },
    {
      img: 'https://rukminim1.flixcart.com/image/832/832/kulk9zk0/sweatshirt/h/4/q/s-hc4329-adidas-original-imag7zjsezpemggh.jpeg?q=70',
      title: 'Women',
    },
    {
      img: 'https://www.jiomart.com/images/product/original/493177794/apple-iphone-14-pro-1-tb-deep-purple-digital-o493177794-p593694325-0-202306301818.jpeg?im=Resize=(420,420)',
      title: 'Mobiles',
    },
    {
      img: 'https://assets.ajio.com/medias/sys_master/root/20230316/kfGo/6412bcc3f997dde6f4ff491e/-1117Wx1400H-464643786-black-MODEL.jpg',
      title: 'Watch',
    },
    {
      img: 'https://rukminim1.flixcart.com/image/312/312/kuyf8nk0/computer/3/n/s/mk183hn-a-laptop-apple-original-imag7yzkbgbwvwq3.jpeg?q=70',
      title: 'Laptop',
    },
    {
      img: 'https://rukminim2.flixcart.com/image/832/832/l0fm07k0/television/7/x/9/-original-imagc8fnpx39evgc.jpeg?q=70',
      title: 'TV',
    },
    {
      img: 'https://rukminim2.flixcart.com/image/832/832/xif0q/monitor/x/r/k/modern-md272qp-full-hd-27-md272qp-msi-original-imaghsfvkbpy4hpe.jpeg?q=70',
      title: 'Monitor',
    },
    {
      img: 'https://rukminim2.flixcart.com/image/832/832/xif0q/air-conditioner-new/r/p/k/-original-imagkqs8xkt8hhfw.jpeg?q=70',
      title: 'AC',
    },
    {
      img: 'https://rukminim2.flixcart.com/image/832/832/kigbjbk0-0/headphone/i/j/i/mgyn3hn-a-apple-original-imafy8wcgvdhsyjj.jpeg?q=70',
      title: 'Headphone',
    },
    {
      img: 'https://rukminim2.flixcart.com/image/832/832/xif0q/tablet/o/k/w/-original-imagj72ttsqcrehk.jpeg?q=70',
      title: 'Tab',
    },
  ];

  
  navigate(a: any) {
   
    if (a == 'Mens') {
      this.router.navigate(['/Mens']);
    } else if (a == 'Women') {
      this.router.navigate(['/Women']);
    } else if (a == 'Mobiles') {
      this.router.navigate(['/Mobile']);
    } else if (a == 'Watch') {
      this.router.navigate(['/Watch']);
    } else if (a == 'Laptop') {
      this.router.navigate(['/Laptop']);
    } else if (a == 'TV') {
      this.router.navigate(['/TV']);
    } else if (a == 'AC') {
      this.router.navigate(['/AC']);
    } else if (a == 'Monitor') {
      this.router.navigate(['/Monitor']);
    } else if (a == 'Headphone') {
      this.router.navigate(['/Headphone']);
    } else if (a == 'Tab') {
      this.router.navigate(['/Tab']);
    } else {
      alert('Component Not Available');
    }
  }

  show() {
    this.dialogService.open(LoginDialogComponent, {
      header: 'Login',
      width: '50%',
    });
  }

  goToProductDetails(product: Product) {
    this.dataService.setSelectedProduct(product);
    this.router.navigate(['/Product', product.category, product.id,product.title]);
  }

  addToCart(product: any) {
    this.cartService.addToCart(product);
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

}
