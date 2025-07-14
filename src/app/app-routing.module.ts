import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { MenComponent } from './Category/men/men.component';
import { WomenHomeComponent } from './Category/women-home/women-home.component';
import { MobileComponent } from './Category/mobile/mobile.component';
import { WatchComponent } from './Category/watch/watch.component';
import { LaptopComponent } from './Category/laptop/laptop.component';
import { TVComponent } from './Category/tv/tv.component';
import { ACComponent } from './Category/ac/ac.component';
import { MoniterComponent } from './Category/moniter/moniter.component';
import { HeadphoneComponent } from './Category/headphone/headphone.component';
import { TabComponent } from './Category/tab/tab.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { CartComponent } from './cart/cart.component';


const routes: Routes = [
  {path:'', component: HomeComponent},
  {path:'Cart', component: CartComponent},
  {path:'Mens', component: MenComponent},
  {path:'Women', component: WomenHomeComponent},
  {path:'Mobile', component:MobileComponent },
  {path:'Watch', component:WatchComponent },
  {path:'Laptop', component:LaptopComponent },
  {path:'TV', component:TVComponent },
  {path:'AC', component:ACComponent },
  {path:'Monitor', component:MoniterComponent },
  {path:'Headphone', component:HeadphoneComponent },
  {path:'Tab', component:TabComponent },
  {path:'Product/:category/:id/:title', component:ProductDetailsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
