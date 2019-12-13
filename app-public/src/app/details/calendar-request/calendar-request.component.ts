import {Component, Input, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {CalendarEventAction, CalendarView, CalendarEvent, CalendarEventTimesChangedEvent} from "angular-calendar";
import {subDays,startOfDay, endOfDay, addDays, endOfMonth, isSameDay, isSameMonth, addHours,} from 'date-fns';
import {Subject} from "rxjs";
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {Stdrequest} from "../../stdrequest";
import {StdRequestServiceService} from "../../std-request-service.service";
import {AuthenticationService} from "../../authentication.service";
import {start} from "repl";
import {eventNames} from "cluster";


const colors: any = {
  red: {
    primary: '#ad2121',
    secondary: '#FAE3E3'
  },
  blue: {
    primary: '#1e90ff',
    secondary: '#D1E8FF'
  },
  yellow: {
    primary: '#e3bc08',
    secondary: '#FDF1BA'
  }
};

@Component({
  selector: 'app-calendar-request',
  templateUrl: './calendar-request.component.html',
  styleUrls: ['./calendar-request.component.css']
})
export class CalendarRequestComponent implements OnInit {

  @Input() public content: any;

  @ViewChild('modalContent', {static: true}) modalContent: TemplateRef<any>;

  view: CalendarView = CalendarView.Month;
  CalendarView = CalendarView;

  viewDate: Date = new Date();

  modalData: {
    action: string;
    event: CalendarEvent;
  };

  actions: CalendarEventAction[] = [
    {
      label: '<i class="fa fa-fw fa-pencil"></i>',
      a11yLabel: 'Edit',
      onClick: ({event}: { event: CalendarEvent }): void => {
        this.handleEvent('Edited', event);
      }
    },
    {
      label: '<i class="fa fa-fw fa-times"></i>',
      a11yLabel: 'Delete',
      onClick: ({event}: { event: CalendarEvent }): void => {
        this.events = this.events.filter(iEvent => iEvent !== event);
        this.handleEvent('Deleted', event);
      }
    }
  ];

  refresh: Subject<any> = new Subject();

  events: CalendarEvent [];

  /*events: CalendarEvent[] = [
    {
      start: subDays(startOfDay(new Date()), 1),
      end: addDays(new Date(), 1),
      title: 'A 3 day event',
      color: colors.red,
      actions: this.actions,
      allDay: true,
      resizable: {
        beforeStart: true,
        afterEnd: true
      },
      draggable: true
    },
    {
      start: startOfDay(new Date()),
      title: 'An event with no end date',
      color: colors.yellow,
      actions: this.actions
    },
    {
      start: subDays(endOfMonth(new Date()), 3),
      end: addDays(endOfMonth(new Date()), 3),
      title: 'A long event that spans 2 months',
      color: colors.blue,
      allDay: true
    },
    {
      start: addHours(startOfDay(new Date()), 2),
      end: addHours(new Date(), 2),
      title: 'A draggable and resizable event',
      color: colors.yellow,
      actions: this.actions,
      resizable: {
        beforeStart: true,
        afterEnd: true
      },
      draggable: true
    }
  ];*/

  newarray = []
  approved: Stdrequest[]
  storerequests: Stdrequest []
  activeDayIsOpen: boolean = true;
  result: Stdrequest[]
  currentUser = this.authenticationService.getCurrentUser();
  userRole = this.currentUser[1];

  constructor(private modal: NgbModal, private stdRequestService: StdRequestServiceService, private authenticationService: AuthenticationService) {
  }

  ngOnInit() {


    this.stdRequestService.getRequests().then(data => processed(data))

    this.approved = JSON.parse(localStorage.getItem('name'));
    var newevent = {}

    for (var i = 0; i <= this.approved.length; i++) {
      if ((this.approved[i].date != null) && (this.approved[i].requestStatus == 1)) {
        if ((this.userRole == "student") && (this.currentUser[0] == this.approved[i].uid)) {
          newevent = {
            start: convertDateToUTC(new Date(this.approved[i]["date"].split('T')[0])),
            title: this.approved[i]["problem"] + '/' + this.approved[i]["tid"],
            color: colors.yellow,
            actions: this.actions,
          }
          this.newarray.push(newevent);
          this.events = this.newarray;
        }
      else if((this.userRole=="employee")&&(this.currentUser[0]==this.approved[i].tid)) {
        newevent = {
          start: convertDateToUTC(new Date(this.approved[i]["date"].split('T')[0])),
          title: this.approved[i]["problem"] + '/' + this.approved[i]["uid"],
          color: colors.yellow,
          actions: this.actions,
        }
        this.newarray.push(newevent);
        this.events = this.newarray;
      }
    }
    }

    function convertDateToUTC(date) {
      return new Date(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate(), date.getUTCHours(), date.getUTCMinutes(), date.getUTCSeconds());
    }


    function processed(data) {
      localStorage.setItem('name', JSON.stringify(data))

    }
  }


  dayClicked({date, events}: { date: Date; events: CalendarEvent[] }): void {
    if (isSameMonth(date, this.viewDate)) {
      if (
        (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
        events.length === 0
      ) {
        this.activeDayIsOpen = false;
      } else {
        this.activeDayIsOpen = true;
      }
      this.viewDate = date;
    }
  }

  eventTimesChanged({
                      event,
                      newStart,
                      newEnd
                    }: CalendarEventTimesChangedEvent): void {
    this.events = this.events.map(iEvent => {
      if (iEvent === event) {
        return {
          ...event,
          start: newStart,
          end: newEnd
        };
      }
      return iEvent;
    });
    this.handleEvent('Dropped or resized', event);
  }

  handleEvent(action: string, event: CalendarEvent): void {
    this.modalData = {event, action};
    this.modal.open(this.modalContent, {size: 'lg'});
  }


  setView(view: CalendarView) {
    this.view = view;
  }

  closeOpenMonthViewDay() {
    this.activeDayIsOpen = false;
  }

}
