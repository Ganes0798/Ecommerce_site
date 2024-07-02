import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  baseUrl="https://localhost:5001/api/";
  public cartItemList: any =[];
  public productList = new BehaviorSubject<any>([]);
  constructor(private http: HttpClient) {
    this.loadCart();
  }

  getProducts() {
    return this.productList.asObservable();
  }

  postCart(data:any):Observable<any>{
    return this.http.post(`${this.baseUrl}Cart`, data);
  }

  setProduct(product: any) {
    this.cartItemList.push(...product);
    this.productList.next(this.cartItemList);
    this.saveCart();
  }

  addtoCart(product: any) {
    this.cartItemList.push(product);
    this.productList.next(this.cartItemList);
    this.getTotalPrice();
    console.log(this.cartItemList);
    this.saveCart();
  }

  getTotalPrice(): number {
    let grandTotal = 0;
    this.cartItemList.map((a: any) => {
      grandTotal += a.productPrice;
    });
    return grandTotal;
  }

  removeCartItem(product: any) {
    this.cartItemList.map((a: any, index: any) => {
      if (product.id === a.id) {
        this.cartItemList.splice(index, 1);
      }
    });
    this.productList.next(this.cartItemList);
    this.saveCart();
  }

  removeAllCarts() {
    this.cartItemList = [];
    this.productList.next(this.cartItemList);
    this.saveCart();
  }

  // Load cart items from localStorage
  private loadCart() {
    const savedCart = localStorage.getItem('cartItems');
    if (savedCart) {
      this.cartItemList = JSON.parse(savedCart);
      this.productList.next(this.cartItemList);
    }
  }

  // Save cart items to localStorage
  private saveCart() {
    localStorage.setItem('cartItems', JSON.stringify(this.cartItemList));
  }
}
