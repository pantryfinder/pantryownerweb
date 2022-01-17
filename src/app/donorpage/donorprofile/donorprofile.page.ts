import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { IonSlides } from '@ionic/angular';


@Component({
  selector: 'app-donorprofile',
  templateUrl: './donorprofile.page.html',
  styleUrls: ['./donorprofile.page.scss'],
})
export class DonorprofilePage implements OnInit {

  @ViewChild('slides') slides: IonSlides;
  slideOpts: any = {};
  slideImages: any[] = [];

  constructor( private route:Router, 
    private http:HttpClient, private alertController: AlertController,
    private storage: Storage, private loadingCtrl: LoadingController) { }
  
    datastorage: any;

    fname: string;
    mname: string;
    lname: string;
    u_name: string;
    u_email: string;
    u_number: string;
     
    

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

  ionViewDidEnter(){
    this.storage.get('storage_xxx').then((res)=>{
      console.log(res);
      this.datastorage = res;
      this.fname = this.datastorage.user_fname;
      this.mname = this.datastorage.user_mname;
      this.lname = this.datastorage.user_lname;
      this.u_name = this.datastorage.username;
      this.u_number = this.datastorage.user_contact;
      this.u_email = this.datastorage.user_email;
    });
    this.slides.startAutoplay();
  
  }

  async doRefresh(event){
    const loader = await this.loadingCtrl.create({
      message: 'Please wait....',
    });
      loader.present();

      this.ionViewDidEnter();
      this.ngOnInit();
      event.target.complete();

      loader.dismiss();
  }

}
