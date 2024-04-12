import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BecomeSellerComponent } from './become-seller.component';



const routes: Routes = [
  {
    path: '',
    component: BecomeSellerComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BecomesellerRoutingModule { }