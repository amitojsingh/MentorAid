import { Injectable } from '@angular/core';
import {Http,Response} from "@angular/http";
import { Stdrequest} from './stdrequest'
import {response} from "express";

@Injectable({
  providedIn: 'root'
})
export class StdRequestServiceService {
  private requestUrl = 'http://localhost:3000/api/'
  constructor(private http: Http) { }

  getRequests():Promise<void|Stdrequest[]>{
    return this.http.get(this.requestUrl+"stdrequest")
      .toPromise()
      .then(response=>response.json()as Stdrequest[])
      .catch(this.handleError);
  }
  createRequest(newRequest: Stdrequest): Promise<void| Stdrequest>{
    return this.http.post(this.requestUrl+"stdrequest",newRequest)
      .toPromise()
      .then(response=>response.json() as Stdrequest)
      .catch(this.handleError);
  }
  getTeachers():Promise<void|String []>{
    return this.http.get(this.requestUrl+"teachers")
      .toPromise()
      .then(response=>response.json())
      .catch(this.handleError)
  }
  getGroups():Promise<void|String []>{
    return this.http.get((this.requestUrl+'groups'))
      .toPromise()
      .then(response=>response.json())
      .catch(this.handleError)
  }

  private handleError(error: any){
    console.log("error");
  }
}
