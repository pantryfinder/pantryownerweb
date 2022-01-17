import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export interface donate_info {
  donation_id: string;
  date_of_donation: string; 
  transaction: string;
 
}

export interface community_pantry {
  pantry_id: string;
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
export class DonateService {

  private url = 'http://139.59.182.21/pantryfinder/api/app.php' 
  //192.168.18.73

  constructor(private http: HttpClient) { }

  getAll(){
    return this.http.get<[donate_info]>(this.url);
  }

  get(id:string){
    return this.http.get<donate_info>(this.url + '/' + id);      
  }

  getAllpantry(){
    return this.http.get<[community_pantry]>(this.url);
  }
}
