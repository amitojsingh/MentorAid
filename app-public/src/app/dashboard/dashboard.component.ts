import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from "../authentication.service";
import {Router} from "@angular/router";
import {StdRequestServiceService} from "../std-request-service.service";
import {Stdrequest} from "../stdrequest";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  requests: Stdrequest[]
  finalRequests: Stdrequest[];
  currentUser=this.authenticationService.getCurrentUser();
  userRole=this.currentUser[1];

  constructor(private authenticationService: AuthenticationService,private router: Router,private stdRequestService:StdRequestServiceService) { }

  ngOnInit() {
    this.stdRequestService.getRequests().then((requests: Stdrequest[]) => this.requests = requests.filter(srequest => srequest.uid==this.currentUser[0]));
    if (this.requests) {
      console.log("this is workding");
      this.finalRequests = this.requests.filter(r => r.uid != this.currentUser[0]);
    }
  }
}
