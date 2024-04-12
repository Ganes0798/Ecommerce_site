import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full'},
  { path: 'home', loadChildren: () => import('../app/home/home.module').then(m => m.HomeModule)},
   { path: 'login', loadChildren: () => import('../app/auth/login/login.module').then(m => m.LoginModule)},
   { path: 'signup', loadChildren: () => import('../app/auth/signup/signup.module').then(m => m.SignupModule)},
   

   { path: 'cart', loadChildren: () => import('../app/cart/cart.module').then(m => m.CartModule)},
   { path: 'seller', loadChildren: () => import('../app/become-seller/become-seller.module').then(m => m.BecomeSellerModule)},


   {path:'product', loadChildren: () => import('../app/products/products.module').then(m => m.ProductsModule)},
   {path:'profile', loadChildren: () => import('../app/profile/profile.module').then(m => m.ProfileModule)}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
