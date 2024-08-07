import { Component, OnInit } from '@angular/core';
import { CartService } from '../cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  public product:any=[];
  public grandTotal!:number;


  constructor(private cartService:CartService){}


  ngOnInit(): void{
     this.cartService.getProducts().subscribe(res => {
      this.product = res;
      this.grandTotal = this.cartService.getTotalPrice()
     })
  }


  removeItem(items:any){
  this.cartService.removeCartItem(items);
  }

}
