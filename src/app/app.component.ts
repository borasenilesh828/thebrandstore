import { Component, OnInit } from '@angular/core';
import { LoginDialogComponent } from './Lookup/login-dialog/login-dialog.component';
import { ConfirmationService, MessageService } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { Router } from '@angular/router';
import { ProfileDialogComponent } from './Lookup/profile-dialog/profile-dialog.component';
import { OrderDialogComponent } from './Lookup/order-dialog/order-dialog.component';
import { WishlistDialogComponent } from './Lookup/wishlist-dialog/wishlist-dialog.component';
import { CouponsDialogComponent } from './Lookup/coupons-dialog/coupons-dialog.component';
import { GiftcardDialogComponent } from './Lookup/giftcard-dialog/giftcard-dialog.component';
import { OrderService } from './Service/Order.Service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  
})
export class AppComponent implements OnInit {
  
  isLoading: boolean = true;
  username:string=this.cookieService.get('Username');
  email:string=this.cookieService.get('Email');
  cart:string='0';

  
  constructor( public dialogService: DialogService, public messageService: MessageService, private router: Router, private confirm:ConfirmationService, private orderService:OrderService, private cookieService: CookieService) {}
  
  ngOnInit(): void {
    this.cart=this.cookieService.get('Cart');
    this.orderService.getAllProducts().subscribe(
      (data) => {
    setInterval(()=>{
     this.isLoading=false;
    },1000)

    if(this.email){
      this.CartHistory();
    }else{
      this.cart='0';
    }
   
  },
  (error) => {
    console.error('Error while Connecting to Server: ', error);
    this.messageService.add({ severity: 'error', summary: 'Server Message', detail: 'Error while Connecting to Server',});
    // window.location.reload();
  })
  }
  

  CartHistory(){
    this.orderService.CartHistory(this.email).subscribe(
      (response) => {
        this.cookieService.set('Cart', response.length );
        this.cart=response.length;
      });
  }
  
  navigate(a: any) {
    this.cart=this.cookieService.get('Cart');
    window.scrollTo(0,0);
    if (a == 'Home') {
      this.router.navigate(['/']);
    } else if (a == 'Cart') {
      this.router.navigate(['/Cart']);
    } else if (a == 2) {
      alert('Not Available');
    } else {
      alert('Component Not Available');
    }
  }

  showLogin() {
    this.dialogService.open(LoginDialogComponent, {
      width: '90%',
    }).onClose.subscribe((data: { username: string, email: string }) => {
      if (data.username && data.email) {
        this.messageService.add({ severity: 'success', summary: 'Login Successfully', detail: `Welcome, ${data.username}!`,});
        this.cookieService.set('Username', data.username );
        this.cookieService.set('Email', data.email );
        this.router.navigate(['/']);
        setTimeout(()=>{
          window.location.reload();
          this.CartHistory();
        },1000)
      }
    });
  }
  
  

  showProfile() {
    this.dialogService.open(ProfileDialogComponent, {
      header:'Personal Information',
      width: '90%',
    });
  }

  showOrder() {
    this.dialogService.open(OrderDialogComponent, {
      header:'Order History',
      width: '90%',
    });
  }

  showWishlist() {
    this.dialogService.open(WishlistDialogComponent, {
      header:'Wishlist',
      width: '90%',
    });
  }
  
  showCoupons() {
    this.dialogService.open(CouponsDialogComponent, {
      header:'Available Coupons',
      width: '90%',
    });
  }
  
  showWallet() {
    this.dialogService.open(GiftcardDialogComponent, {
      header:'Wallet',
      width: '90%',
    });
  }
  
  
  showLogout(){

    this.confirm.confirm({
        message: 'Are you sure that you want to Logout ?',
        
        accept: () => {
          this.cookieService.delete('Username');
          this.cookieService.delete('Email');
          this.cookieService.delete('Cart');
          this.messageService.add({ severity: 'success', summary: 'Success Message', detail: 'Logout Successfully.',});
          this.router.navigate(['/']);
          // window.location.reload();
          setTimeout(()=>{
            window.location.reload();
          },1000)
      },
      // reject: () => {
      //   this.messageService.add({ severity: 'error', summary: 'Success Message', detail: '.',});
      // }
    });

  }


}
