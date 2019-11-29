import { Component, OnInit } from '@angular/core';
import {Stdrequest} from "../stdrequest";
import {Router} from "@angular/router";
import {FormControl,FormGroup,Validator,Validators} from "@angular/forms";
import {StdRequestServiceService} from '../std-request-service.service';
import {AuthenticationService} from '../authentication.service';


@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {
  currentUser=this.authservice.getCurrentUser();
  public newrequest:{
    uid:string;
    tid:string;
    problem:string;
    subject:string;
    count:string;
}={
    uid:this.currentUser[0],
    tid:'',
    problem:'',
    subject:'',
    count:'',
  };


  constructor(private stdRequestService: StdRequestServiceService,public router:Router,private authservice: AuthenticationService) { }

  ngOnInit() {
  }
  createRequest(newRequest: Stdrequest):void{
    this.stdRequestService.createRequest(newRequest);
    this.router.navigate(['dashboard'])
  }

}