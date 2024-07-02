import { Component, OnInit } from '@angular/core';
import { CommonService } from '../common-service.service';
import { CartService } from '../cart.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  products: any[] = [];
  productList: any;

  constructor(private commonService: CommonService, private cartService:CartService){

  }

  ngOnInit(): void {
     this.getProducts();

     this.productList.forEach((a:any) => {
      Object.assign(a,{quantity:1, total:a.productPrice})
     });
  }

  getProducts(){
    this.commonService.getProduct().subscribe({
      next: (response:any) => {
         this.products = response.result;
      },
      error:(err:any) => {
       alert(err.message)
      }
    })
  }


  AddtoCart(product:any){
    if(localStorage.getItem('token') != null && localStorage.getItem('Id') != null)
    {
      const jsonInput = 
        {
          "userFkId": localStorage.getItem('Id'),
          "productFkId": product.id,
          "quantity": 1
        }
      this.cartService.postCart(jsonInput).subscribe({
        next: (response:any) => {
              alert(response.message);
              this.cartService.addtoCart(product);
        },
        error: (err:any) => {
              alert(err.messgae);
        }
      })
      // alert("Product Added to Cart! Please Check the Cart");
    }
    else{
      alert('Please Login!');
    }
  }
}
