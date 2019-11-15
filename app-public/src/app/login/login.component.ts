import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {AuthenticationService} from "../authentication.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
public formError: string = '';
loginForm: FormGroup;
submitted = false;
public credentials = {
  username: '',
  password: ''
}
  constructor(private router: Router,private authenticationService: AuthenticationService, private formBuilder:FormBuilder,) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }
  get f() {
    return this.loginForm.controls;
  }
  public onLoginSubmit(): void {
    this.submitted = true;
    if (this.loginForm.invalid) {
      return;
    }
    else {
      if (this.authenticationService.login(this.loginForm.value)){
        this.authenticationService.login(this.loginForm.value)
        .then(() => this.router.navigate(['/dashboard']))
        .catch((err) => {
          this.formError = "incorrect username or password"
        });
      }
      else{
        this.formError = "username or password incorrect";

      }
    }
  }
private handleError(error: any) {
  return error;
}
}
