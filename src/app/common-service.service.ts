import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  baseUrl="https://localhost:5001/api/"
  constructor(private http: HttpClient) { }


  //PRODUCT API
  //Get API
  getProduct(): Observable<any>{
    return this.http.get(`${this.baseUrl}Product`);
  }
}
