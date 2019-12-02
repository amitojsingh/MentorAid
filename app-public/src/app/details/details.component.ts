import { Component, OnInit } from '@angular/core';
import {ActivatedRoute,Params} from "@angular/router";
import {StdRequestServiceService} from "../std-request-service.service";
import {Stdrequest} from "../stdrequest";
import {switchMap} from "rxjs/operators";

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {

  constructor(private StdRequestService: StdRequestServiceService,private route:ActivatedRoute) { }
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
  public updateRequest(stdrequestid: string, newRequest: Stdrequest): void{
    this.StdRequestService.updateRequest(stdrequestid,newRequest);
  }
}
