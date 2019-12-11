import { Injectable } from '@angular/core';
import { Http, HttpModule,Headers,RequestOptions} from '@angular/http';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpHeaders } from '@angular/common/http';
// import { Observable } from 'rxjs/Observable';   
import 'rxjs/add/operator/map'; 
import 'rxjs/add/operator/catch'; 
import 'rxjs/add/observable/throw';

@Injectable({
  providedIn: 'root'
})
export class ClientService {
  private BaseURL = "http://nammoffice-env.3fanyydypu.us-east-2.elasticbeanstalk.com/api/v1/client/";
  // private authorizationData = 'Basic ' + btoa('deepak@smartworkspace.com' + ':' + 'test');
  public headers = new Headers({ 'Content-Type': 'application/json' });
  public options = new RequestOptions({ headers: this.headers });
 

  constructor(private http: Http) { }

  public getAllClients() {
    let Url = this.BaseURL + "getAll";
    return this.http.get(Url, { headers: this.headers }).map(data => {
      let res = data;
      console.log(res);
      return res;
    })
  }
}
