import { Component, OnInit, ViewChild } from '@angular/core';
import { IonTabs } from '@ionic/angular';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastController, LoadingController, AlertController, NavController } from '@ionic/angular';
import { AccessProviders } from '../../providers/access.providers';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-donorlist',
  templateUrl: './donorlist.page.html',
  styleUrls: ['./donorlist.page.scss'],
})
export class DonorlistPage implements OnInit {


  constructor(
    private router: Router,
    private alertController: AlertController,
    private toastCtrl: ToastController,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
    private accsPrvdrs: AccessProviders,
    private storage: Storage,
    private navCtrl: NavController) { }

  p_name: string;

  datastorage: any;


  ngOnInit() {
  }

  ionViewDidEnter() {
    this.storage.get('storage_xxx').then((res) => {
      console.log(res);
      this.datastorage = res;
      this.p_name = this.datastorage.pantry_name;

    });
}

}
