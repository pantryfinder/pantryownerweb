import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ListofimagesPage } from '../../listofimages/listofimages.page';
import { Storage } from '@ionic/storage';
import { Router, ActivatedRoute } from '@angular/router';
import { PantryService, community_pantry } from 'src/app/services/pantry.service';
import { ToastController, LoadingController, AlertController, NavController } from '@ionic/angular';
import { AccessProviders } from '../../providers/access.providers';
import { OwnerrecommendationsPage } from '../../ownerrecommendations/ownerrecommendations.page';
import { TopdonorsPage } from '../../topdonors/topdonors.page';
import { RecommendationService, recommendation } from 'src/app/services/recommendation.service';


@Component({
  selector: 'app-listofpantry',
  templateUrl: './listofpantry.page.html',
  styleUrls: ['./listofpantry.page.scss'],
})
export class ListofpantryPage implements OnInit {
  pantry: any = [];
  pantry_id: number;
  pantry_name: string;
  phone_number: string;
  list_of_items: string;
  street_address: string;
  barangay: string;
  municipality: string;
  province: string;
  //region: string;
  email: string;
  gcash_number: string;
  category: string;
  status: string;
  public recommendation=[];
  user_id: number;
  users = []
  recommends = []
  schedule: string;
  
  datastorage: any;

  sliderOpts = {
    zoom:false,
    slidesPerView: 1.5,
    centeredSlides: true,
    spaceBetween: 20
  };

  ionViewDidEnter(){
    this.storage.get('storage_xxx').then((res) => {
      console.log(res);
      this.datastorage = res;
      this.user_id = this.datastorage.user_id;
      this.users = [];
       this.loadUser();
       this.recommends = [];
       this.recommend();
    });
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
  constructor(
    private service: PantryService, 
     public recommendationService: RecommendationService,
    private accsPrvdrs: AccessProviders, 
    private storage: Storage,  
    private router:Router, private loadingCtrl: LoadingController,
    private modalController: ModalController,
    private toastCtrl: ToastController,) {}

  ngOnInit() {
  //  this.service.getAllpantry().subscribe(response => {
    //  this.pantry = response;
   // })   

      this.recommendationService.getRecommendation().subscribe(data =>{
        console.log(data);
        this.recommendation = data;
    
     })


  }
  openPreview(img){
    this.modalController.create({
      component: ListofimagesPage,
      componentProps: {
        img: img
      }
    }).then(modal => modal.present());
  }

  
  async doRefresh(event){
    const loader = await this.loadingCtrl.create({
      message: 'Please wait....',
    });
      loader.present();

      this.ngOnInit();
      this.ionViewDidEnter();
      event.target.complete();

      loader.dismiss();
  }


  async loadUser(){
    const load = await this.loadingCtrl.create({
      message : "Loading....",
     });
    
    
    return new Promise(resolve => {
      let data = {
        aksi: 'load_communitypantry',
        user_id: this.user_id,
      }

      this.accsPrvdrs.postData(data, 'proses_api.php').subscribe((res:any)=>{
        if(res.success==true){
          for(let datas of res.result){
            this.users.push(datas);
            load.dismiss();
          }
      
        }else{
        load.dismiss();
        
        this.presentToast(res.msg);
        }
    },(err)=>{
      load.dismiss();
      
      this.presentToast("Cannot Load Data"); 
       
      }) 
         
    });
  }

  async recommend(){
    const load = await this.loadingCtrl.create({
      message : "Loading....",
     });
    
    
    return new Promise(resolve => {
      let data = {
        aksi: 'load_recommend',
      
      }

      this.accsPrvdrs.postData(data, 'proses_api.php').subscribe((res:any)=>{
        if(res.success==true){
          for(let datas of res.result){
            this.recommends.push(datas);
            load.dismiss();
          }
      
        }else{
        load.dismiss();
        
        this.presentToast(res.msg);
        }
    },(err)=>{
      load.dismiss();
      
      this.presentToast("Cannot Load Data"); 
       
      }) 
         
    });
  }


  async presentToast(a){
    const toast = await this.toastCtrl.create({
      message : a,
      duration : 1500,
      position : 'top'
    });
    toast.present();
  }



  openPantry(a){
    this.router.navigate(['/pantrydetails/' +a]);
  }

  async openTransparentModal(){
    const modal = await this.modalController.create({
      component: OwnerrecommendationsPage,
      cssClass: 'transparent-modal'
    });
    await modal.present();
  }

  async openTransparentModalDonors(){
    const modal = await this.modalController.create({
      component: TopdonorsPage,
      cssClass: 'transparent-modal'
    });
    await modal.present();
  }

}