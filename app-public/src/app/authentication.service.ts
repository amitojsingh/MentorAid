import { Injectable,Inject } from '@angular/core';
import {BROWSER_STORAGE} from "./storage";
import {Loginusers} from "./loginusers";
import {Router} from "@angular/router";
import {Authresponse} from "./authresponse";
import {UserServiceService} from "./user-service.service";
import { from } from 'rxjs';
import {getToken} from "codelyzer/angular/styles/cssLexer";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(@Inject(BROWSER_STORAGE) private storage: Storage, private userService: UserServiceService, private router: Router) { }
  public login(loginUser: Loginusers): Promise<any>{
    return this.userService.login(loginUser)
    .then((authResp: Authresponse) => this.saveToken(authResp.token));
  }
  public logout(): void{
    this.storage.removeItem('login');
    this.router.navigate(['']);
  }
  public getCurrentUser():Loginusers{
    if(this.isLoggedIn()){
      const token : string = this.getToken();
      const {id} = JSON.parse(atob(token.split('.')[1]));

      const username=id;
      return {username} as Loginusers
    }
  }
  public isLoggedIn():boolean{
    const token: string = this.getToken();
    return !!token;
  }
  public getToken(): string{
    return this.storage.getItem('login');
  }
  public saveToken(token: string) {
   this.storage.setItem('login', token);
  }
}
