import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AlertPromise } from 'selenium-webdriver';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {FormControl} from '@angular/forms';
import {MatChipInputEvent} from '@angular/material/chips';
import {MatSnackBar} from '@angular/material/snack-bar';
import { DatePipe } from '@angular/common';
import { ResourceService } from '../../resource.service';
import { BookingService } from '../../booking.service';
import { ClientService } from '../../client.service';
import { LocationService } from './../../location.service';

export interface Fruit {
  name: string;
}


@Component({
  selector: 'app-create-event',
  templateUrl: './create-event.component.html',
  styleUrls: ['./create-event.component.css'],
  providers: [DatePipe]
})
export class CreateEventComponent implements OnInit {

  public showDate;
  public toDate;
  public BookinglocationList : {};
  public locationList: {};
  public guestList: {};
  private roomList: {};

  public today = new FormControl(new Date());

  durationInSeconds = 5;

  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  fruits: Fruit[] = [
    {name: 'Lemon'},
    {name: 'Lime'},
    {name: 'Apple'},
  ];

  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    // Add our fruit
    if ((value || '').trim()) {
      this.fruits.push({name: value.trim()});
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }
  }

  remove(fruit: Fruit): void {
    const index = this.fruits.indexOf(fruit);

    if (index >= 0) {
      this.fruits.splice(index, 1);
    }
  }


  constructor(
    private booking:BookingService,
    private snackBar: MatSnackBar,
    private client: ClientService,
    private location : LocationService,
    private resource : ResourceService,
    public dialogRef: MatDialogRef<CreateEventComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private datePipe: DatePipe) { }

  date() {
    let myDate = new Date();
    this.showDate = this.datePipe.transform(myDate, 'MMM d,y');
  }

  selectDate(){
    console.log("This is the DATE:", this.showDate);
  }
  hideModel() {
    this.dialogRef.close("Closed");
  }




// get  all location by client Id
gelLocation(){
  this.location.getLocationByClient().subscribe((data)=>{
    let res:any = data;
    this.locationList = JSON.parse(res._body);
    console.log(this.locationList)
  })
}


   openSnackBar() {
    this.snackBar.open( "Booked" );
  }

  refresh(): void {
    window.location.reload();
}

  //  bookingList
  createBooking = {
    "clientId": "",
    "locationId": "",
    "resourceId": "",
    "email": "",
    "bookingDate": "",
    "startTime": "",
    "endTime": "",
    "alert": "",
    "reminder": "",
    "recurring": ""
  }
  //  Create booking
  validation = function(data){
    console.log("form data")
    console.log(data);
    // this.createBooking.title = "Meeting";
    this.createBooking.clientId = localStorage.getItem('clientid');
    this.createBooking.locationId = data.locationId;
    this.createBooking.resourceId = data.resourceId;
    this.createBooking.email = data.email;
    let hithesh = this.datePipe.transform(data.bookingDate, 'yyyy-MM-dd');
    console.log("hithesh"+ hithesh);
    this.createBooking.bookingDate = hithesh+"T22:"+data.startTime;
    console.log(this.createBooking.bookingDate);
    this.createBooking.startTime = data.bookingDate+"T22:"+data.startTime;
    this.createBooking.endTime = data.bookingDate+"T22:"+data.endTime;
    this.createBooking.alert = "N";
    this.createBooking.reminder = 0;
    this.createBooking.recurring = "N";
    console.log("Request")
    console.log(this.createBooking);
    this.booking.booking(this.createBooking).subscribe((data)=>{
      let req = data.json();
      console.log(req);  
      this.hideModel();   
      this.openSnackBar();     
      this.refresh();
    }) 
  }


  // get resource based on location id
  catagory(selectedItem) {
    console.log("featching details of "+selectedItem);
    this.resource.getByLocation(selectedItem).subscribe((data)=>{
      let res:any = data;
      this.roomList = JSON.parse(res._body);
      console.log(this.roomList)
    })
  }

  ngOnInit() {
    this.date();
    this.selectDate();
    this.gelLocation();
  }

}
