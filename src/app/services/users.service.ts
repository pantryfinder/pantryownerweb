import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


export interface users {
  pantry_name: string;
  list_of_items: string;
  longitude: string;
  latitude: string;
}

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private url = 'http://139.59.182.21/pantryfinder/api/map.php'
  //192.168.18.73

  constructor(private http: HttpClient) { }


  getRecommendation(): Observable<users[]>{
    return this.http.get<users[]>(this.url);
  }
}
