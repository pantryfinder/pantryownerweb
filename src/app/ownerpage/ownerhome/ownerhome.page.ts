import { Component, OnInit, ViewChild } from '@angular/core';
import { IonSlides } from '@ionic/angular';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastController, LoadingController, AlertController, NavController } from '@ionic/angular';
import { AccessProviders } from '../../providers/access.providers';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-ownerhome',
  templateUrl: './ownerhome.page.html',
  styleUrls: ['./ownerhome.page.scss'],
})
export class OwnerhomePage implements OnInit {

  @ViewChild('slides') slides: IonSlides;
    slideOpts: any = {};
    slideImages: any[] = [];
  

    buttonValue = 'grid';
    buttonItems: any[] = [];
    posts: any[] = [];
  
    complete: any;
  
    constructor(
      private router: Router,
      private alertController: AlertController,
      private toastCtrl: ToastController,
      private loadingCtrl: LoadingController,
      private alertCtrl: AlertController,
      private accsPrvdrs: AccessProviders,
      private storage: Storage,
      private navCtrl: NavController
    ) { }
  
    datastorage: any;
  
    fname: string;
    mname: string;
    lname: string;
    u_name: string;
    u_email: string;
    u_number: string;
  
    p_name: string;
    number: string;
    listofitems: string;
    address: string;
    ba: string;
    mu: string;
    pro: string;
    re: string;
    em: string;
    g_number: string;
    cat: string;
    stat: string;
    u_id: any;
    users: any = [];
  
    ngOnInit() {
      this.slideImages = [
        'assets/imgs/1.jpg',
        'assets/imgs/2.jpg',
        'assets/imgs/3.jpg'
      ];
  
      this.slideOpts = {
        on: {
          beforeInit() {
            const swiper = this;
            swiper.classNames.push(`${swiper.params.containerModifierClass}fade`);
            const overwriteParams = {
              slidesPerView: 1,
              slidesPerColumn: 1,
              slidesPerGroup: 1,
              watchSlidesProgress: true,
              spaceBetween: 0,
              virtualTranslate: true,
            };
            swiper.params = Object.assign(swiper.params, overwriteParams);
            swiper.params = Object.assign(swiper.originalParams, overwriteParams);
          },
          setTranslate() {
            const swiper = this;
            const { slides } = swiper;
            for (let i = 0; i < slides.length; i += 1) {
              const $slideEl = swiper.slides.eq(i);
              const offset$$1 = $slideEl[0].swiperSlideOffset;
              let tx = -offset$$1;
              if (!swiper.params.virtualTranslate) tx -= swiper.translate;
              let ty = 0;
              if (!swiper.isHorizontal()) {
                ty = tx;
                tx = 0;
              }
              const slideOpacity = swiper.params.fadeEffect.crossFade
                ? Math.max(1 - Math.abs($slideEl[0].progress), 0)
                : 1 + Math.min(Math.max($slideEl[0].progress, -1), 0);
              $slideEl
                .css({
                  opacity: slideOpacity,
                })
                .transform(`translate3d(${tx}px, ${ty}px, 0px)`);
            }
          },
          setTransition(duration) {
            const swiper = this;
            const { slides, $wrapperEl } = swiper;
            slides.transition(duration);
            if (swiper.params.virtualTranslate && duration !== 0) {
              let eventTriggered = false;
              slides.transitionEnd(() => {
                if (eventTriggered) return;
                if (!swiper || swiper.destroyed) return;
                eventTriggered = true;
                swiper.animating = false;
                const triggerEvents = ['webkitTransitionEnd', 'transitionend'];
                for (let i = 0; i < triggerEvents.length; i += 1) {
                  $wrapperEl.trigger(triggerEvents[i]);
                }
              });
            }
          },
        }
      };
  
    }
  
    ionViewDidEnter() {
      this.storage.get('storage_xxx').then((res) => {
        console.log(res);
        this.datastorage = res;
        this.fname = this.datastorage.user_fname;
        this.mname = this.datastorage.user_mname;
        this.lname = this.datastorage.user_lname;
        this.u_name = this.datastorage.username;
        this.u_number = this.datastorage.user_contact;
        this.u_email = this.datastorage.user_email;
         this.u_id = this.datastorage.user_id;
  
       
      });
  
      //this.p_name =  this.datastorage.pantry_name;
      // this.number =  this.datastorage.phone_number;
      //this.listofitems = this.datastorage.list_of_items;
      // this.address =this.datastorage.street_address;
      // this.ba = this.datastorage.barangay;
      // this.mu = this.datastorage.municipality;
      //this.pro = this.datastorage.province;
      //  this.re = this.datastorage.region;
      // this.em = this.datastorage.email;
      //  this.g_number = this.datastorage.gcash_number;
      //  this.cat = this.datastorage.category;
      //  this.stat = this.datastorage.status;
  
      
   
    this.slides.startAutoplay();
  

  
    }
  

    
    buttonsChanged(event) {
      console.log(event.detail.value);
      this.buttonValue = event.detail.value;
    }
  }
  