import { Component, OnInit } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import {Map, tileLayer, marker, polyline } from "leaflet";
import { LoadingController } from '@ionic/angular';
import * as L from 'leaflet'; 
import "esri-leaflet-geocoder/dist/esri-leaflet-geocoder.css";
import "esri-leaflet-geocoder/dist/esri-leaflet-geocoder";
import { HttpClient } from '@angular/common/http';
import * as Leaflet from 'leaflet';
import { AccessProviders } from '../providers/access.providers';

@Component({
  selector: 'app-gotomap',
  templateUrl: './gotomap.page.html',
  styleUrls: ['./gotomap.page.scss'],
})
export class GotomapPage implements OnInit {

  map: L.Map  
  marker: any;
  latLong = [];
  private loading;
  properties=[];
  caseStatus;
  longitude: string="";
  latitude: string="";

 constructor(
  private geolocation: Geolocation,
   private loadingCtrl: LoadingController, 
   private http:HttpClient,
   private accsPrvdrs: AccessProviders
 ) {}

  ngOnInit() {
  }

  ionViewDidEnter(){
    this.showMap();
  }


  showMap(){
    this.map = new Map('map').setView([ 14.035020, 120.652878], 11);
    var osm = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
               attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          });
       osm.addTo(this.map);
  
       fetch('./assets/data.json')
      .then(res=>res.json())
      .then(data =>{
        this.properties=data.data;
  
        for(const marker of this.properties){
      
            L.marker([13.832740, 120.632530]).addTo(this.map)
          //  .bindPopup(marker.title+marker.image);
          .bindPopup(`<center>
                        <p>
                          <strong> d</strong> 
                        </p>
                        <p>
                        List of goods: d<br/>
                        Name of owner: d
                      </p>
                      <img style="max-width: 190px;" src="d}"/>
                      <br/>
                      </center>`);
        }
      })
  
       
  }

  async loaddonors(){
    const load = await this.loadingCtrl.create({
      message : "Loading....",
     });
    
    
    return new Promise(resolve => {
      let data = {  
        aksi: 'load_map',
       longitude: this.longitude,
       latitude: this.latitude,
      }

      this.accsPrvdrs.postData(data, 'proses_api.php').subscribe((res:any)=>{
        this.latitude  = res.result.latitude;
        this.longitude  = res.result.longitude;
       
        
        
        
    }) 
         
    });
  }
  

  


}
