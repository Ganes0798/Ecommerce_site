import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BecomeSellerComponent } from './become-seller.component';
import { AppRoutingModule } from '../app-routing.module';
import { RouterModule } from '@angular/router';
import { BecomesellerRoutingModule } from './become-seller-routing.module';



@NgModule({
  declarations: [
    BecomeSellerComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    BecomesellerRoutingModule
  ]
})
export class BecomeSellerModule { }
