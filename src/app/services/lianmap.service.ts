import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


export interface lianmap {
  
  latitude: string;
  longitude: string;
  pantry_name: string;
  user_fname: string;
  user_lname: string;
  list_of_items: string;
  street_address: string;
  barangay: string;
  municipality: string;
  province: string;
  open_time: string;
  close_time: string;
  status: string;
  
 
 
 }
 

@Injectable({
  providedIn: 'root'
})
export class LianmapService {

  private url = 'http://139.59.182.21/pantryfinder/api/map.php'
  //192.168.18.73
  constructor(private http: HttpClient) { }

  getAllmap(): Observable<lianmap[]>{
    return this.http.get<lianmap[]>(this.url);
  }

}
