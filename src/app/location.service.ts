import { Injectable } from '@angular/core';
import { Http, HttpModule,Headers,RequestOptions} from '@angular/http';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpHeaders } from '@angular/common/http';
import { BaseURL } from './conf';
// import { Observable } from 'rxjs/Observable';   
import 'rxjs/add/operator/map'; 
import 'rxjs/add/operator/catch'; 
import 'rxjs/add/observable/throw';

@Injectable({
  providedIn: 'root'
})
export class LocationService {

  private localUrl = BaseURL+"api/v1/location/";
  public headers = new Headers({ 'Content-Type': 'application/json' });
  public options = new RequestOptions({ headers: this.headers });

  constructor(private http: Http) { }

  // Get All Location
  getAllLocation(){
    let URL = this.localUrl+"getAll";
    return this.http.get(URL,{ headers: this.headers }).map(data =>{
      let res = data;
      console.log(res);
      return res;
    })
  }

  getLocationByClient(){
    let cId = localStorage.getItem('clientid');
    let URL = this.localUrl+"get/"+cId;
    return this.http.get(URL,{ headers: this.headers }).map(data =>{
      let res = data;
      console.log(res);
      return res;
    })
  }
}
