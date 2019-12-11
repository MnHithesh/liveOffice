import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Router, ActivatedRoute } from '@angular/router';
// import { Observable } from 'rxjs/Observable';   
import 'rxjs/add/operator/map'; 
import 'rxjs/add/operator/catch'; 
import 'rxjs/add/observable/throw';
import { BaseURL } from './conf';

@Injectable({
  providedIn: 'root'
})
export class BookingService {
private URL = BaseURL+"api/v1/booking/";
//api/v1/booking/client/{clientId}/bookings
private username: string = 'deepak@smartworkspace.com';
private password: string = 'test';
// private headers: Headers = new Headers();
private loggedInClient = localStorage.getItem('clientid');

public headers = new Headers({ 'Content-type' : 'application/json', Accept : 'application/json'});
public options = new RequestOptions({ headers: this.headers });

  constructor(private http: Http) { }

  getAllLocations(){
    let Url = this.URL + "getAll";
    // this.headers.append("Authorization", "Basic " + btoa(this.username + ":" +this.password)); 
    // this.headers.append("Content-Type", "application/json");
    console.log(this.headers);
    return this.http.get(Url, { headers:this.headers }).map(data => {
      let res = data;
      console.log(res);
      return res;
    })
  }


  public getByClient(){
    let Url = this.URL+"client/"+this.loggedInClient+"/bookings";
    return this.http.get(Url, {headers:this.headers}).map(data =>{
      let res = data;
      console.log(res);
      return  res;
    })
  }

  public booking(request){
    let Url = this.URL+"save";
    return this.http.post(Url,JSON.stringify(request),this.options);
  }
}
