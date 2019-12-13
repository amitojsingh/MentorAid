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
  studentRequests: Stdrequest[]
  teacherRequest: Stdrequest[]
  studentPending: Stdrequest[]
  studentApproved: Stdrequest[]
  teacherPending: Stdrequest[]
  teacherApproved: Stdrequest[]



  pageContent={
    calender:{
      request: this.studentApproved
    }
  }

  currentUser=this.authenticationService.getCurrentUser();
  userRole=this.currentUser[1];

  constructor(private authenticationService: AuthenticationService,private router: Router,private stdRequestService:StdRequestServiceService) { }

  ngOnInit() {
    if (this.userRole == "student") {
      this.stdRequestService.getRequests().then((studentRequests: Stdrequest[]) => this.studentRequests = studentRequests.filter(srequest => srequest.uid == this.currentUser[0]));
      this.stdRequestService.getRequests().then((studentPending: Stdrequest[])=> this.studentPending = studentPending.filter(srequest => (srequest.uid == this.currentUser[0])&&(srequest.requestStatus==null)));
      this.stdRequestService.getRequests().then((studentApproved: Stdrequest[]) => this.studentApproved = studentApproved.filter(arequest => (arequest.uid == this.currentUser[0])&&(arequest.requestStatus==1)));

    } else {
      this.stdRequestService.getRequests().then((teacherRequest: Stdrequest[]) => this.teacherRequest = teacherRequest.filter(srequest => (srequest.tid == this.currentUser[0])));
      this.stdRequestService.getRequests().then((teacherPending: Stdrequest[]) => this.teacherPending = teacherPending.filter(srequest => (srequest.tid == this.currentUser[0])&&(srequest.requestStatus==null)));
      this.stdRequestService.getRequests().then((teacherApproved: Stdrequest[]) => this.teacherApproved = teacherApproved.filter(srequest => (srequest.tid == this.currentUser[0])&&(srequest.requestStatus ==1)));
    }
  }
  getSingleRequest(stdrequestid: string){
      this.stdRequestService.getSingleRequest(stdrequestid)
    this.router.navigate(['stdrequest/'+stdrequestid])

  }


}
