import { AfterContentChecked, Component, OnInit } from '@angular/core';
import { LoginService } from './auth/login/login.service';
import { CartService } from './cart.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, AfterContentChecked {
  title = 'Ecommerce_site';
  public totalItem: number=0;


  constructor(public _authService: LoginService, private cartService: CartService){}

  ngOnInit(): void {

    this.cartService.getProducts().subscribe((response:any) => {
      if(localStorage.getItem('token') != null && localStorage.getItem('Id') != null)
      {
        this.totalItem = response.length;
      }
      else{
        this.totalItem = 0;
      }
    })
  }


  ngAfterContentChecked(): void {
  }
}
