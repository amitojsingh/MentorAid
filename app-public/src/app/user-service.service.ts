import { Injectable } from '@angular/core';
import {User} from "./user";
import {Http, Response} from '@angular/http';
import {Loginusers} from "./loginusers";
import {Authresponse} from "./authresponse";
import {response} from "express";
@Injectable({
  providedIn: 'root'
})
export class UserServiceService {
  private apiURL = 'http://localhost:3000/api/users';
  private element: any;

  constructor(private http: Http) { }

  public login(loginuser: Loginusers): Promise<void| Authresponse>{
    return this.makeApiCallLogin('login', loginuser);
  }

  private makeApiCallLogin(urlPath: string, loginuser: Loginusers): Promise<void | Authresponse>{
    const url: string = `${this.apiURL}/${urlPath}`;
    return this.http.post(url, loginuser)
    .toPromise()
    .then(response => response.json() as Authresponse)
    .catch(this.handleError);
  }

  private handleError(error: any){
    console.log( " error " );
  }
}
