  import { Component, OnInit } from '@angular/core';
  import { Router } from '@angular/router';
  import { menuController } from '@ionic/core';
  import { AlertController, NavController } from '@ionic/angular';
  import { Storage } from '@ionic/storage';


  //import { UtilService } from './util.service';

  @Component({
    selector: 'app-root',
    templateUrl: 'app.component.html',
    styleUrls: ['app.component.scss'],
  })
  export class AppComponent {
  

    constructor(
      private navCtrl: NavController,
      private router: Router,
      private storage: Storage,
      private alertCtrl: AlertController,
    
    ) { this.initializeApp();
      
    }




    initializeApp(){
      this.storage.get('storage_xxx').then((res)=> {
        if(res == null){
          this.navCtrl.navigateRoot('/index');
        }
      });
    }
    
    close() {
      menuController.toggle();
      
    }
    pantrypost(){
      this.router.navigateByUrl('pantrypost');
    }

    home(){
      this.router.navigateByUrl('login');
    }

    map(){
      this.router.navigateByUrl('map');
    }

    aboutus(){
      this.router.navigateByUrl('aboutus');
    }




  
  }