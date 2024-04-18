import { Component, NgZone, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from './login.service';
import { environment } from 'src/app/environment';
import {UntypedFormBuilder, Validators} from '@angular/forms';
import { CredentialResponse, PromptMomentNotification } from 'google-one-tap';
import * as googleOneTap from 'google-one-tap';


declare global {
  interface Window {
    onGoogleLibraryLoad: () => void;
  }
}



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {


  token: any;
  private clientid = environment.clientId;
  loginForm: any;
  localToken: any;
  constructor( private _formBuilder: UntypedFormBuilder,   private _route: Router,
    private _ngZone: NgZone,
    private _loginService: LoginService){
  }

  ngOnInit(): void {

    window.onGoogleLibraryLoad = () => {
      // @ts-ignore
      google.accounts.id.initialize({
        client_id: this.clientid,
        login_uri: "https://accounts.google.com/o/oauth2/auth",
        callback: this.handleCredentialResponse.bind(this),
        auto_select: false,
        cancel_on_tap_outside: true
      });
      // @ts-ignore
      google.accounts.id.renderButton(
        // @ts-ignore
        document.getElementById("googleLogin"),
        { theme: "filled_blue", size: "large", text: 'signin', width: 100 }
      );
      
      // @ts-ignore
      google.accounts.id.prompt((notification: PromptMomentNotification) => { });
    };
    this.loginForm = this._formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
      remember: ['', Validators.required]
    });
    // this.navbar.hide();
  }

  async handleCredentialResponse(response: CredentialResponse) {
    await this._loginService.LoginwithGoogle(response.credential).subscribe(
      (response: any) => {
        if(response.code == 200 && response.success == true)
        {
          localStorage.setItem("token", response.token);
          this._ngZone.run(() => {
            alert(response.message);
          });
        }
       
      },
      (error: any) => {
        console.log(error);
      }
    );
  }

  login(data: any){
    const jsonInput = {
      "email": data.email,
      "password": data.password
    }
    this._loginService.loginusingEmail(jsonInput).subscribe({
      next:(response: any) => {
                 if(response.code == 200 && response.success == true)
                 {
                  alert(response.message);
                  this.localToken = response.result.token;
                  console.log(this.localToken);
                  localStorage.setItem('token', this.localToken);
                  this._route.navigate(['home']);
                 }
      },
      error(err:any){
           alert(err.error);
      }
    });
  }


  ngOnDestroy(): void {
    
  }
}
