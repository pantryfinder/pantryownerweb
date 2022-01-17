import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface recommendation {
  pantry_id: string;
  pantry_name: string; 
  phone_number: string;
  list_of_items: string;
  street_address: string;
  barangay: string;
  municipality: string;
  province: string;
  // region: string;
  load_communitypantry: string;
  gcash_number: string;
  category: string;
  status: string; 
}

@Injectable({
  providedIn: 'root'
})
export class RecommendationService {
//sql6.freemysqlhosting.net::3306
  private url = 'http://139.59.182.21/pantryfinder/api/viewrecommendation.php'
  //192.168.18.73
  constructor(private http: HttpClient)  { }

  getRecommendation(): Observable<recommendation[]>{
    return this.http.get<recommendation[]>(this.url);
  }

}
