import { Component, OnInit } from '@angular/core';
import { AccessProviders } from '../providers/access.providers';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, LoadingController, ToastController } from '@ionic/angular';
import { ModalController } from '@ionic/angular';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import {Map, tileLayer, marker, polyline } from "leaflet";
import * as L from 'leaflet'; 
import "esri-leaflet-geocoder/dist/esri-leaflet-geocoder.css";
import "esri-leaflet-geocoder/dist/esri-leaflet-geocoder";
import { HttpClient } from '@angular/common/http';
import * as Leaflet from 'leaflet';
import { LianmapService, lianmap } from 'src/app/services/lianmap.service';
import { IonTabs } from '@ionic/angular'; 
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-pantrydetails',
  templateUrl: './pantrydetails.page.html',
  styleUrls: ['./pantrydetails.page.scss'],
})
export class PantrydetailsPage implements OnInit {
  user = []
  users = []
  pantry: any = [];
  pantry_id: number;
  pantry_name: string;
  user_contact: string;
  list_of_items: string;
  street_address: string;
  barangay: string;
  municipality: string;
  province: string;
  region: string;
  user_email: string;
  gcash_number: string;
  category: string;
  status: string;
  longitude: number;
  latitude: number;
  name = [];
  maplian: any = [];
  created_at: any;
  category_1:string ="";
  category_2: string ="";
  category_3: string ="";
 open_time: string;
 close_time: string;
 pscomments=[]
  segmentValue= '1';
  numberofdonor: []
 
  datastorage: any;
  disabledButton;

  map: L.Map  
  marker: any;
  latLong = [];
  private loading;
  properties=[];
  caseStatus;

  comment: string = "";
  first_name: string = "";
  last_name: string = "";


  sliderOpts = {
    zoom:false,
    slidesPerView: 1.5,
    centeredSlides: true,
    spaceBetween: 20
  };

  ionViewDidEnter(){
    this.storage.get('storage_xxx').then((res)=>{
      console.log(res);
      this.datastorage = res;  
    });
    this.pantry_id;
    this.numberofdonors();
    this.loadcomment();
    this.pscomments=[];
    this.psloadcomment();
    this.properties= [];
  //this.showMap();
  }

  
  public slideOpts2 = {
    slidesPerView: 2.8,
  }
  public slideOpts3 = {
    slidesPerView: 2.4,
    spaceBetween:20,
    
  }
  public slideOpts = {
    slidesPerView: 1.2,
    spaceBetween: 50,
    centeredSlides: true,
    initialSlide: 2,
    coverflowEffect: {
      rotate: 0,
      stretch: 0,
      depth: 200,
      modifier: 1,
      slideShadows: false,
    },
    on: {
      beforeInit() {
        const swiper = this;

        swiper.classNames.push(`${swiper.params.containerModifierClass}coverflow`);
        swiper.classNames.push(`${swiper.params.containerModifierClass}3d`);

        swiper.params.watchSlidesProgress = true;
        swiper.originalParams.watchSlidesProgress = true;
      },
      setTranslate() {
        const swiper = this;
        const {
          width: swiperWidth, height: swiperHeight, slides, $wrapperEl, slidesSizesGrid, $
        } = swiper;
        const params = swiper.params.coverflowEffect;
        const isHorizontal = swiper.isHorizontal();
        const transform$$1 = swiper.translate;
        const center = isHorizontal ? -transform$$1 + (swiperWidth / 2) : -transform$$1 + (swiperHeight / 2);
        const rotate = isHorizontal ? params.rotate : -params.rotate;
        const translate = params.depth;
        // Each slide offset from center
        for (let i = 0, length = slides.length; i < length; i += 1) {
          const $slideEl = slides.eq(i);
          const slideSize = slidesSizesGrid[i];
          const slideOffset = $slideEl[0].swiperSlideOffset;
          const offsetMultiplier = ((center - slideOffset - (slideSize / 2)) / slideSize) * params.modifier;

          let rotateY = isHorizontal ? rotate * offsetMultiplier : 0;
          let rotateX = isHorizontal ? 0 : rotate * offsetMultiplier;
          // var rotateZ = 0
          let translateZ = -translate * Math.abs(offsetMultiplier);

          let translateY = isHorizontal ? 0 : params.stretch * (offsetMultiplier);
          let translateX = isHorizontal ? params.stretch * (offsetMultiplier) : 0;

          // Fix for ultra small values
          if (Math.abs(translateX) < 0.001) translateX = 0;
          if (Math.abs(translateY) < 0.001) translateY = 0;
          if (Math.abs(translateZ) < 0.001) translateZ = 0;
          if (Math.abs(rotateY) < 0.001) rotateY = 0;
          if (Math.abs(rotateX) < 0.001) rotateX = 0;

          const slideTransform = `translate3d(${translateX}px,${translateY}px,${translateZ}px)  rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;

          $slideEl.transform(slideTransform);
          $slideEl[0].style.zIndex = -Math.abs(Math.round(offsetMultiplier)) + 1;

        }

        // Set correct perspective for IE10
        if (swiper.support.pointerEvents || swiper.support.prefixedPointerEvents) {
          const ws = $wrapperEl[0].style;
          ws.perspectiveOrigin = `${center}px 50%`;
        }
      },
      setTransition(duration) {
        const swiper = this;
        swiper.slides
          .transition(duration)
          .find('.swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left')
          .transition(duration);
      }
    }
  }
  constructor( private actRoute: ActivatedRoute,
    private accsPrvdrs: AccessProviders, private storage: Storage,
    private router:Router, private loadingCtrl: LoadingController,
    private modalController: ModalController,
    private geolocation: Geolocation, private alertController: AlertController,
    private http:HttpClient, private toastCtrl: ToastController, public lianmap: LianmapService) {}

 ngOnInit() {
   this.actRoute.params.subscribe((data: any)=>{
     console.log(data);
     this.pantry_id = data.pantry_id;

     if(this.pantry_id!=0){
       this.users = [];
       this.loadUser();
     }
   });
 }


 loadUser(){
   return new Promise(resolve => {
     let body = {
       aksi: 'load_pantry',
       pantry_id: this.pantry_id,
       
     }

     this.accsPrvdrs.postData(body, 'proses_api.php').subscribe((res:any)=>{
       this.pantry_name = res.result.pantry_name;
       this.user_contact = res.result.user_contact;
       this.category_1 = res.result.category_1;
       this.category_2 = res.result.category_2;
       this.category_3 = res.result.category_3;
       this.list_of_items = res.result.list_of_items;
       this.street_address = res.result.street_address;
       this.barangay = res.result.barangay;
       this.municipality = res.result.municipality;
       this.province = res.result.province;
       this.open_time = res.result.open_time;
       this.close_time = res.result.close_time;
       this.region = res.result.region;
       this.user_email = res.result.user_email;
       this.gcash_number= res.result.gcash_number;
       this.status= res.result.status;
    
     })    
   });
 }


 numberofdonors(){
 return new Promise(resolve => {
   let body = {
     aksi: 'numberofdonors',
     pantry_id: this.pantry_id,
   }

   this.accsPrvdrs.postData(body, 'proses_api.php').subscribe((res:any)=>{
     if(res.success==true){
       for(let datas of res.result){
         this.users.push(datas);
       }
     }else{
     }
 },(err)=>{
    
   }) 
 });
}

 
 async doRefresh(event){
   const loader = await this.loadingCtrl.create({
     message: 'Please wait....',
   });
     loader.present();
     this.pscomments=[];
     this.psloadcomment();
     event.target.complete();
     loader.dismiss();
 }

 openMap(){
   this.router.navigate(['/gotomap']);
 }




 async loadcomment(){
   const load = await this.loadingCtrl.create({
     message : "Loading....",
    });
   
   
   return new Promise(resolve => {
     let data = {
       aksi: 'load_comments',
       pantry_id: this.pantry_id,
     }
 
     this.accsPrvdrs.postData(data, 'process_comments.php').subscribe((res:any)=>{
       if(res.success==true){
         for(let datas of res.result){
           this.user.push(datas);
           console.log(datas);
           load.dismiss();
         }
     
       }else{
       load.dismiss();
       this.presentToast(res.msg);
       }
   },(err)=>{
     load.dismiss();
     console.log();
     this.presentToast("Cannot Load Data"); 
      
     }) 
        
   });
 }

 
 async presentToast(a){
   const toast = await this.toastCtrl.create({
     message: a,
     duration: 1500,
     position: 'top'
   });
   toast.present();
}

async postcomment(a){
    
  if(this.comment==""){      
    this.presentToast('Please enter your comment');
  }else {

  const alert = await this.alertController.create({
    
    header: "",
    message: "Submit this comment ?",
    buttons: [
      {
        text: "No",
        role: "cancel",
        handler: () => {
          console.log("No");
         
        },
      },
      {
        text: "Yes",
        handler: () => {
          console.log("Yes");
         
          return new Promise(resolve => {
            let body = {
              aksi: 'post_comments',
              pantry_id: this.pantry_id,
              first_name: this.first_name,
              last_name: this.last_name,
              comment: this.comment,
             
              action: a
            }
            
            this.accsPrvdrs.postData(body,'pantryseekerscomment.php').subscribe((res:any)=>{
              if(res.success==true){
                alert.dismiss();
                this.disabledButton = false;
                console.log(res);
                this.presentToast(res.msg);
                
              //this.sendsms();
              //this.router.navigate(['/viewcomments/']);
              }else {
                alert.dismiss();
                this.disabledButton = false;
                this.presentToast(res.msg);
              }
           }, (err) => {
            alert.dismiss();
             this.disabledButton = false;
             this.presentAlert('Successful');
           });
           
          });
        
        },
      },
    ],
   
  });

  await alert.present();
}
} 

async psloadcomment(){
  const load = await this.loadingCtrl.create({
    message : "Loading....",
   });
  
  
  return new Promise(resolve => {
    let data = {
      aksi: 'load_comments',
      pantry_id: this.pantry_id,
    }

    this.accsPrvdrs.postData(data, 'pantryseekerscomment.php').subscribe((res:any)=>{
      if(res.success==true){
        for(let datas of res.result){
          this.pscomments.push(datas);
          console.log(datas);
          load.dismiss();
        }
    
      }else{
      load.dismiss();
      this.presentToast(res.msg);
      }
  },(err)=>{
    load.dismiss();
    console.log();
    this.presentToast("Cannot Load Data"); 
     
    }) 
       
  });
}


async presentAlert(a){
  const alert = await this.alertController.create({
    header: a,
    backdropDismiss: false,
    buttons: [
      {
        text: 'OK',
        handler: (blah) => {
          console.log('Successful');
          //this.router.navigate(['/donorpage/listofpantry']);
        }
      }
    ]
  });

  await alert.present();
}

segmentChanged(event){
  console.log(event);
  this.segmentValue = event.detail.value;
}







}