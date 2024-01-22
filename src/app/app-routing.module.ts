import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductsComponent } from './products/products.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { CartComponent } from './cart/cart.component';
import { BecomeSellerComponent } from './become-seller/become-seller.component';
const routes: Routes = [
{ path: '', component: HomeComponent},
{path: 'product', component: ProductsComponent},
{path:'login', component: LoginComponent},
{path:'signup', component: SignupComponent},
{path: 'cart', component: CartComponent},
{path: 'seller', component: BecomeSellerComponent}


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }