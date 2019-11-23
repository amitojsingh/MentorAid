import { Component, OnInit } from '@angular/core';
import {Stdrequest} from "../stdrequest";
import {Router} from "@angular/router";
import {FormControl,FormGroup,Validator,Validators} from "@angular/forms";

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {
  public newrequest:{
    tid:string;
    problem:string;
    subject:string;
    count:string;
}={
    tid:'',
    problem:'',
    subject:'',
    count:'',
  };

  constructor() { }

  ngOnInit() {
  }

}
