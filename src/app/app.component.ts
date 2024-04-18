import { AfterContentChecked, Component, OnInit } from '@angular/core';
import { LoginService } from './auth/login/login.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, AfterContentChecked {
  title = 'Ecommerce_site';


  constructor(public _authService: LoginService){}

  ngOnInit(): void {
  }


  ngAfterContentChecked(): void {
  }
}
