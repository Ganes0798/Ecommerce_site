import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/app/environment';

@Injectable({
  providedIn: 'root'
})
export class SignupService {


  private path = environment.apiUrl
  baseUrl='https://localhost:5001/api/';
  constructor(private http: HttpClient) { }

  addUsers(users: any): Observable<any>{
      return this.http.post(`${this.baseUrl}Register`, users);
  }


  SignupWithGoogle(credentials: string): Observable<any> {
    const header = new HttpHeaders().set('Content-type', 'application/json');
    return this.http.post(this.path + "GoogleSignUp" , JSON.stringify(credentials), {headers: header});
  }
}
