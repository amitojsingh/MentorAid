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
  public saveToken(token: string) {
   this.storage.setItem('login', token);
  }
}
