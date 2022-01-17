import { Component, OnInit } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import {Map, tileLayer, marker, polyline } from "leaflet";
import { LoadingController } from '@ionic/angular';
import * as L from 'leaflet'; 
import "esri-leaflet-geocoder/dist/esri-leaflet-geocoder.css";
import "esri-leaflet-geocoder/dist/esri-leaflet-geocoder";
import { HttpClient } from '@angular/common/http';
import * as Leaflet from 'leaflet';
import { LianmapService, lianmap } from 'src/app/services/lianmap.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-map',
  templateUrl: './map.page.html',
  styleUrls: ['./map.page.scss'],
})
export class MapPage {
  map: L.Map  
  marker: any;
  latLong = [];
  private loading;
  properties=[];
  caseStatus;
  maplian: any = [];

 constructor(
  private router:Router,
  private geolocation: Geolocation,
   private loadingCtrl: LoadingController, 
   private http:HttpClient,
   public lianmap: LianmapService
 ) {}

 ionViewDidEnter(){
  this.showMap();
}

showMap(){
  this.map = new Map('map').setView([ 14.035020, 120.652878], 12);
  var osm = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
             attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        });
     osm.addTo(this.map);

     this.lianmap.getAllmap().subscribe(response => {
      this.maplian = response;

      for(const marker of this.maplian){

        var UrgentMarker = new Leaflet.Icon({
          iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
          shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
          iconSize: [25, 41],
          iconAnchor: [12, 41],
          popupAnchor: [1, -34],
          shadowSize: [41, 41]
        });
        var NonUrgentMarker = new Leaflet.Icon({
          iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
          shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
          iconSize: [25, 41],
          iconAnchor: [12, 41],
          popupAnchor: [1, -34],
          shadowSize: [41, 41]
        });
        var openpantry = new Leaflet.Icon({
          iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-yellow.png',
          shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
          iconSize: [25, 41],
          iconAnchor: [12, 41],
          popupAnchor: [1, -34],
          shadowSize: [41, 41]
        });
        if(marker.status=="Closed"){
          this.caseStatus=UrgentMarker
        }else if(marker.status=="Needs Donation") {
          this.caseStatus=openpantry
        }else{
          this.caseStatus=NonUrgentMarker
        }
    
          L.marker([marker.longitude, marker.latitude],{icon:this.caseStatus}).addTo(this.map)
        //  .bindPopup(marker.title+marker.image);
        .bindPopup(`<center>
                      <p >
                      <strong> ${marker.pantry_name} <br>
                      ${marker.street_address}, ${marker.barangay}, ${marker.municipality}, ${marker.province}</strong> <br>
                     <strong> Pantry Owner: </strong> ${marker.user_fname} ${marker.user_lname}<br>
                     <strong> List of Items: </strong>${marker.list_of_items}<br>
                     <strong> Schedule: </strong> ${marker.open_time} to ${marker.close_time} <br>
                     <strong> Status: </strong>${marker.status}
                    </p>
                   
                    <br/>
                    </center>`);
      }
    })

    

     
}

getPositions(){
  this.loadingCtrl.create({
    message:'Finding your location, wait for a second...'
  }).then((overlay) => {
    this.loading = overlay;
    this.loading.present();
  });

  setTimeout(() => {
    this.loading.dismiss();
    

  this.geolocation.getCurrentPosition({
    enableHighAccuracy: true
  }).then((res) => {
    return this.latLong = [
      res.coords.latitude,
      res.coords.longitude
    ]
  }).then((latlng) => {
      this.showMarker(latlng);
  });

}, 5000 );
  
} 

showMarker(latLong){
  
  this.marker = marker(latLong);
  this.marker.addTo(this.map)
  .bindPopup('You are here');

  this.marker.addEventListener("mouseover", ()=> {
    this.map.flyTo(latLong, 15);
  })
}


back(){
  this.router.navigateByUrl('/ownerpage/ownerhome');
}

  maps(){
  
       fetch('./assets/data.json')
      .then(res=>res.json())
      .then(data =>{
        this.properties=data.data;
  
        for(const marker of this.properties){
  
          var UrgentMarker = new Leaflet.Icon({
            iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
            shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
            iconSize: [25, 41],
            iconAnchor: [12, 41],
            popupAnchor: [1, -34],
            shadowSize: [41, 41]
          });
          var NonUrgentMarker = new Leaflet.Icon({
            iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
            shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
            iconSize: [25, 41],
            iconAnchor: [12, 41],
            popupAnchor: [1, -34],
            shadowSize: [41, 41]
          });
          var NonUrgentMarker = new Leaflet.Icon({
            iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png',
            shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
            iconSize: [25, 41],
            iconAnchor: [12, 41],
            popupAnchor: [1, -34],
            shadowSize: [41, 41]
          });
          if(marker.isUrgent==true){
            this.caseStatus=UrgentMarker
          }else{
            this.caseStatus=NonUrgentMarker
          }
      
            L.marker([marker.longitude, marker.latitude],{icon:this.caseStatus}).addTo(this.map)
          //  .bindPopup(marker.title+marker.image);
          .bindPopup(`<center>
                        <p>
                          <strong> ${marker.title} </strong> 
                        </p>
                        <p>
                        List of goods: ${marker.description}<br/>
                        Name of owner:  ${marker.nameofowner}
                      </p>
                      <img style="max-width: 190px;" src="${marker.image}"/>
                      <br/>
                      </center>`);

                     
        }
      })
  
  }
}
