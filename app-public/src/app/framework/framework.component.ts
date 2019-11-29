import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from "../authentication.service";
import {Loginusers} from "../loginusers";

@Component({
  selector: 'app-framework',
  templateUrl: './framework.component.html',
  styleUrls: ['./framework.component.css']
})
export class FrameworkComponent implements OnInit {

  constructor(private authenticationService: AuthenticationService) { }

  ngOnInit() {
  }
  public logout(): void {
    return this.authenticationService.logout();
  }
  public isLoggedIn(): Boolean {
    return this.authenticationService.isLoggedIn();
  }
  public getUsername(): string{
    const user=this.authenticationService.getCurrentUser();
    return user[0];
  }
  public getRole():string{
    const role=this.authenticationService.getCurrentUser();
    return role[1];
  }

}
