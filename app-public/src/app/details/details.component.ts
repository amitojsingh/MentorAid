import { Component, OnInit } from '@angular/core';
import {ActivatedRoute,Params} from "@angular/router";
import {StdRequestServiceService} from "../std-request-service.service";
import {Stdrequest} from "../stdrequest";
import {switchMap} from "rxjs/operators";
import {Router} from "@angular/router";

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {

  constructor(private StdRequestService: StdRequestServiceService,private route:ActivatedRoute,public router:Router) { }
  newrequest: Stdrequest
  ngOnInit():void {
    this.route.params.pipe(
      switchMap((params: Params) => {
        return this.StdRequestService.getSingleRequest(params['stdrequestid'])

      })
    )
      .subscribe((newrequest: Stdrequest) => {
        this.newrequest = newrequest;
      })
  }
  public acceptRequest(stdrequestid: string, newRequest: Stdrequest): void{
    newRequest.requestStatus=1;
    this.StdRequestService.updateRequest(stdrequestid,newRequest);
    this.router.navigate(['dashboard'])
  }
  public rejectRequest(stdrequestid: string, newRequest: Stdrequest): void{
    newRequest.requestStatus=0;
    this.StdRequestService.updateRequest(stdrequestid,newRequest);
    this.router.navigate(['dashboard'])
  }

}
