import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpErrorResponse } from "@angular/common/http";
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/timeout';

@Injectable()
export class AccessProviders {
    server: string = 'http://139.59.182.21/pantryfinder/api/';
 //pantryfinder.atwebpages.com/api/ 192.168.18.73
    
  constructor(
    private http: HttpClient,
    ) { }

    postData(body, file){
        let headers = new HttpHeaders({
            'Content-Type': 'application/json; charset=UTF-8'
        });
        let options = {
            headers: headers
        }

        return this.http.post(this.server + file, JSON.stringify(body), options)
        .timeout(59000) //59 sec timeout

        .map(res => res);
    }
}