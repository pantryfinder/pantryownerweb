import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface community_pantry {
  pantry_id: string;
  user_id: string;
  pantry_name: string; 
  phone_number: string;
  list_of_items: string;
  street_address: string;
  barangay: string;
  municipality: string;
  province: string;
  region: string;
  email: string;
  gcash_number: string;
  category: string;
  status: string; 
}

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  public url:string = 'http://192.168.18.73/PantryFinder/api/view.php'
  constructor(public http: HttpClient) { }
  
  getData(): Observable<community_pantry[]>{
    return this.http.get<community_pantry[]>(this.url);
  }

 
}