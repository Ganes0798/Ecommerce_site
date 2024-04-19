import { Component, NgZone, OnInit } from '@angular/core';
import { UntypedFormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SignupService } from './signup.service';
import { CredentialResponse } from 'google-one-tap';
import { environment } from 'src/app/environment';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  signupForm: any;
  private clientid = environment.clientId;



  constructor( private _formBuilder: UntypedFormBuilder,   private _route: Router,
    private _ngZone: NgZone,
    private _signupService: SignupService){
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
        { theme: "filled_blue", size: "large", text: 'continue_with', width: 100 }
      );
      
      // @ts-ignore
      google.accounts.id.prompt((notification: PromptMomentNotification) => { });
    };
    this.signupForm = this._formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      conPassword: ['', Validators.required],
      terms: ['']
    });
  }


  async handleCredentialResponse(response: CredentialResponse) {
    await this._signupService.SignupWithGoogle(response.credential).subscribe(
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


  signUpEmail(data: any){
      const jsonInput = {
        "firstName": data.firstName,
        "lastName": data.lastName,
        "password": data.password,
        "confirmPassword": data.conPassword,
        "email": data.email,
      }
      this._signupService.addUsers(jsonInput).subscribe((response:any) => {
          if(response.code == 200 && response.success == true)
          {
            alert(response.message);
          }
          else{
            alert("Enter Valid Input")
          }
      });
  }
}
