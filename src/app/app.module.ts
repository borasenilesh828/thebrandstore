import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { HomeComponent } from './home/home.component';
import { MenComponent } from './Category/men/men.component';
import { LoginDialogComponent } from './Lookup/login-dialog/login-dialog.component';
import { DialogService } from 'primeng/dynamicdialog';
import { MessageService } from 'primeng/api';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { WomenHomeComponent } from './Category/women-home/women-home.component';
import { MobileComponent } from './Category/mobile/mobile.component';
import { WatchComponent } from './Category/watch/watch.component';
import { LaptopComponent } from './Category/laptop/laptop.component';
import { TVComponent } from './Category/tv/tv.component';
import { ACComponent } from './Category/ac/ac.component';
import { HeadphoneComponent } from './Category/headphone/headphone.component';
import { TabComponent } from './Category/tab/tab.component';
import { HttpClientModule } from '@angular/common/http';
import { DataViewModule } from 'primeng/dataview';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { CartComponent } from './cart/cart.component';
import { ProfileDialogComponent } from './Lookup/profile-dialog/profile-dialog.component';
import { OrderDialogComponent } from './Lookup/order-dialog/order-dialog.component';
import { ConfirmationService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { MessagesModule } from 'primeng/messages';
import { ToastModule } from 'primeng/toast';
import { WishlistDialogComponent } from './Lookup/wishlist-dialog/wishlist-dialog.component';
import { CouponsDialogComponent } from './Lookup/coupons-dialog/coupons-dialog.component';
import { GiftcardDialogComponent } from './Lookup/giftcard-dialog/giftcard-dialog.component';
import {TableModule} from 'primeng/table';
import { ProgressBarModule } from 'primeng/progressbar';
import { MoniterComponent } from './Category/moniter/moniter.component';
import { CookieService } from 'ngx-cookie-service';
import { TrackDialogComponent } from './Lookup/track-dialog/track-dialog.component';
import { TimelineModule } from 'primeng/timeline';
import { CheckOutDialogComponent } from './Lookup/check-out-dialog/check-out-dialog.component';
import { LoaderComponent } from './loader/loader.component';
import {OverlayPanelModule} from 'primeng/overlaypanel';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    MenComponent,
    LoginDialogComponent,
    WomenHomeComponent,
    MobileComponent,
    WatchComponent,
    LaptopComponent,
    TVComponent,
    ACComponent,
    HeadphoneComponent,
    TabComponent,
    ProductDetailsComponent,
    CartComponent,
    ProfileDialogComponent,
    OrderDialogComponent,
    WishlistDialogComponent,
    CouponsDialogComponent,
    GiftcardDialogComponent,
    MoniterComponent,
    TrackDialogComponent,
    CheckOutDialogComponent,
    LoaderComponent
    ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    CommonModule,
    ButtonModule,
    BrowserAnimationsModule,
    TableModule,
    HttpClientModule,
    DataViewModule,
    ConfirmDialogModule,
    MessagesModule,
    ToastModule,
    ProgressBarModule,
    TimelineModule,
    OverlayPanelModule
  ],
  providers: [DialogService,MessageService,ConfirmationService,CookieService],
  bootstrap: [AppComponent]
})
export class AppModule { 
  
}
