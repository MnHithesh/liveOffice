import { Component,ChangeDetectionStrategy,ViewChild,TemplateRef,Inject,OnInit } from '@angular/core';
// import {startOfDay,endOfDay,subDays,addDays,endOfMonth,isSameDay,isSameMonth,addHours} from 'date-fns';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable,Subject } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import {CalendarEvent,CalendarEventAction,CalendarEventTimesChangedEvent,CalendarView} from 'angular-calendar';
import { map } from 'rxjs/operators';
import { CreateEventComponent } from './../Modals/create-event/create-event.component';
import { BookingService } from './../booking.service';

// import { EventSettingsModel, View, DayService, WeekService, WorkWeekService, MonthService, AgendaService }
//     from '@syncfusion/ej2-angular-schedule';


import { ResourceService } from './../resource.service';

import { DataManager, WebApiAdaptor, JsonAdaptor } from '@syncfusion/ej2-data';

import { OptionsInput } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { FullCalendarComponent } from '@fullcalendar/angular';

import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-scheduling',
  templateUrl: './scheduling.component.html',
  styleUrls: ['./scheduling.component.css'],
  providers: []
})
export class SchedulingComponent implements OnInit {

  options: OptionsInput;
  eventsModel: any;
  data;
  myObjStr;
  myObj=[];
  private clientBookings = {};

  public cid = localStorage.getItem('clientid');
  // public selectedDate: Date = new Date(2017, 5, 5);
  // public currentView: View = 'Month';
  public readonly: boolean = true;
  private dataManger: DataManager = new DataManager({
      url: 'http://nammoffice-env.3fanyydypu.us-east-2.elasticbeanstalk.com/api/v1/booking/client/'+this.cid+'/bookings',
      adaptor: new WebApiAdaptor,
      crossDomain: true
  });
  // public eventSettings: EventSettingsModel = { dataSource: this.dataManger };

  // @ViewChild('modalContent') modalContent: TemplateRef<any>;

  @ViewChild('fullcalendar') fullcalendar: FullCalendarComponent;

  CalendarView = CalendarView;

  viewDate: Date = new Date();

  refresh: Subject<any> = new Subject();
 
  modalData: {
    action: string;
    event: CalendarEvent;
  };

  

  // selectedDate: any;

  private roomList;

  selected = 'option2';

  

  // handleEvent(action: string, event: CalendarEvent): void {
  //   this.modalData = { event, action };
  //   this.modal.open(this.modalContent, { size: 'lg' });
  // }

  
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches)
    );

  constructor(private breakpointObserver: BreakpointObserver,private modal: NgbModal,public dialog: MatDialog, private resource: ResourceService,private http:HttpClient,private book: BookingService) {}

   httpdata;

   calendarPlugins = [dayGridPlugin]; // important!

  //Dailog of Create Button
  openDialog(): void {
    const dialogRef = this.dialog.open(CreateEventComponent,{
       width: '550px',
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  // getall rooms List
getAllResource(){
  this.resource.getAll().subscribe((data)=>{
     let res:any = data;
     this.roomList = JSON.parse(res._body);
     console.log(this.roomList)
  })
 }

 getBookingsById(){
   this.book.getByClient().subscribe((data)=>{
     let res:any = data;
     this.clientBookings = JSON.parse(res._body);
     console.log("<========================================================>");
     console.log(this.clientBookings);
     console.log("<========================================================>");
   })
 }

ngOnInit() { 
  this.getAllResource();
  this.getBookingsById();
  this.options = {
    editable: true,
    header: {
      left: 'prev,next today myCustomButton',
      center: 'title',
      right: 'dayGridMonth, dayGridWeek, dayGridDay'
    },
    plugins: [dayGridPlugin, interactionPlugin]
  };
  this.http.get("http://nammoffice-env.3fanyydypu.us-east-2.elasticbeanstalk.com/api/v1/booking/getAll").
   subscribe((data) => this.displaydata(data));
 }
 displaydata(data) {
  this.httpdata = this.clientBookings;


  for(let i of this.httpdata){
    this.myObj.push({start: i.createdDate.substring(0, 10),
    title: i.email });
  }
  this.myObjStr = JSON.parse(JSON.stringify(this.myObj));
  console.log("**************************************************************");
  console.log(this.myObjStr);
  console.log("**************************************************************");
  console.log(this.httpdata);
  console.log("**************************************************************");
}
eventClick(model) {
  console.log(model);
}
eventDragStop(model) {
  console.log(model);
}
dateClick(model) {
  console.log(model);
}

get yearMonth(): string {
  const dateObj = new Date();
  return dateObj.getUTCFullYear() + '-' + (dateObj.getUTCMonth() + 1);
}

}
