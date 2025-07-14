import { Component , OnInit} from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { DialogService } from 'primeng/dynamicdialog';
import { Order } from 'src/app/Model/common.model';
import { OrderService } from 'src/app/Service/Order.Service';
import { TrackDialogComponent } from '../track-dialog/track-dialog.component';

@Component({
  selector: 'app-order-dialog',
  templateUrl: './order-dialog.component.html',
  styleUrls: ['./order-dialog.component.css']
})
export class OrderDialogComponent implements OnInit {

  constructor(private orderService:OrderService,private cookieService: CookieService,public dialogService: DialogService){}

  Email: string = this.cookieService.get('Email');
  orderHistory: Order[]=[];
  isLoading: boolean = true;

  ngOnInit(): void {
      this.orderService.OrderHistory(this.Email).subscribe(response => {
        this.orderHistory = response.orderHistory;
        this.isLoading=false;
      },
      (error) => {
        this.isLoading=false;
        console.error('Error fetching products: ', error);
      });
  }

  showTrack(a:any){
    this.dialogService.open(TrackDialogComponent, {
      header:'Track Order',
      width: '90%',
      data:{a}
    });
  }

}
