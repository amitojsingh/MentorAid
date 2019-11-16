import { Injectable,Inject } from '@angular/core';
import {BROWSER_STORAGE} from "./storage";
import {Loginusers} from "./loginusers";
import {Router} from "@angular/router";
import {Authresponse} from "./authresponse";
import {UserServiceService} from "./user-service.service";
import { from } from 'rxjs';

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
  /*public isLoggedIn():boolean{
    const token: string = this.getToken();
    if(token){
      const payload = JSON.parse(atob(token.split('.',[1])));
      return payload.exp>(Date.now()/1000)
    }
    else{
      return false;
    }
  }
  public getToken(): string{
    return this.storage.getItem('login');
  }*/
  public saveToken(token: string) {
   this.storage.setItem('login', token);

  }
}
