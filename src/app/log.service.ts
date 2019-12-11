import { Injectable } from '@angular/core';
import  { BaseURL } from './conf';
import { Http, HttpModule,Headers,RequestOptions} from '@angular/http';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LogService {
  public headers = new Headers({ 'Content-Type': 'application/json' });
  public options = new RequestOptions({ headers: this.headers });
  constructor(private http: HttpClient) { }
// Login
  Login(){
    // "deepak@smartworkspace.com"
    // let URL = BaseURL+"login";
    let URL = BaseURL+"api/v1/client/get/1";
    console.log(URL);
    return this.http.get(URL).map(data =>{
      let res = data;
      console.log(res);
      return res;
  });
  }
//Logout
logout(){
  let URL = BaseURL+"logout";
  // let data.email = 
  // let data.password =
  return this.http.post(URL, { headers:this.headers });
}

}
