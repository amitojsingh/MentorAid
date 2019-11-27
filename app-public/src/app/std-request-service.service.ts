import { Injectable } from '@angular/core';
import {Http,Response} from "@angular/http";
import { Stdrequest} from './stdrequest'
import {response} from "express";

@Injectable({
  providedIn: 'root'
})
export class StdRequestServiceService {
  private requestUrl = 'http://localhost:3000/api/stdrequest'
  constructor(private http: Http) { }

  getRequests():Promise<void|Stdrequest[]>{
    return this.http.get(this.requestUrl)
      .toPromise()
      .then(response=>response.json()as Stdrequest[])
      .catch(this.handleError);
  }
  createRequest(newRequest: Stdrequest): Promise<void| Stdrequest>{
    return this.http.post(this.requestUrl,newRequest)
      .toPromise()
      .then(response=>response.json() as Stdrequest)
      .catch(this.handleError);
  }
  private handleError(error: any){
    console.log("error");
  }
}
