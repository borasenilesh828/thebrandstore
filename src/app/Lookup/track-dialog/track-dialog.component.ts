import { Component, OnInit } from '@angular/core';
import { PrimeIcons } from 'primeng/api';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';
@Component({
  selector: 'app-track-dialog',
  templateUrl: './track-dialog.component.html',
  styleUrls: ['./track-dialog.component.css'],
})
export class TrackDialogComponent implements OnInit {
  events1: any[] = [];
  date: any;
  constructor(public config: DynamicDialogConfig) {}

  ngOnInit(): void {
    this.date = this.config.data.a;

    const currentDate = new Date(this.date);

    this.events1 = [
      {
        status: 'Ordered',
        date: currentDate,
        icon: PrimeIcons.SHOPPING_CART,
        color: '#9C27B0',
        image: 'game-controller.jpg',
      },
      {
        status: 'Processing',
        date: new Date(currentDate.getTime() + 2 * 60 * 48 * 1000),
        icon: PrimeIcons.COG,
        color: '#673AB7',
      },
      {
        status: 'Shipped',
        date: new Date(currentDate.getTime() + 4 * 60 * 76 * 1000), 
        icon: PrimeIcons.ENVELOPE,
        color: '#FF9800',
      },
      {
        status: 'Delivered On',
        date: new Date(currentDate.getTime() + 2 * 24 * 60 * 88 * 1000), 
        icon: PrimeIcons.CHECK,
        color: '#607D8B',
      },
    ];
  }
}
