import { ChangeDetectorRef, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http'
import { environment } from 'src/app/environment';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private path = environment.apiUrl
  baseUrl='https://localhost:5001/api/';
  constructor(private http:HttpClient, private route:Router) { }




  loginusingEmail(data: any): Observable<any>{
      return this.http.post(`${this.baseUrl}login`, data);
  }

  LoginwithGoogle(credentials: string): Observable<any> {
    const header = new HttpHeaders().set('Content-type', 'application/json');
    return this.http.post(this.path + "LoginwithGoogle" , JSON.stringify(credentials), {headers: header});
  }

  loggedIn(){
    return !!localStorage.getItem('token');
  }

  logoutUser(){
    localStorage.removeItem('token');
    this.route.navigate(['home']);
  }

  getToken(){
    return localStorage.getItem('token');
  }
}
