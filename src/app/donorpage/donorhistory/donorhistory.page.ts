import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ToastController, LoadingController, AlertController, NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { IonTabs } from '@ionic/angular';
import { AccessProviders } from '../../providers/access.providers';
import { donate_info, DonateService } from 'src/app/services/donate.service';


@Component({
  selector: 'app-donorhistory',
  templateUrl: './donorhistory.page.html',
  styleUrls: ['./donorhistory.page.scss'],
})
export class DonorhistoryPage implements OnInit {

  donate: donate_info[];

    datastorage: any;
    name: string;
    gender: string;
    date_birthday: string;
    email_address: string;
    users: any = [];
  
  constructor(
    private router: Router,
    private alertController: AlertController,
    private toastCtrl: ToastController,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
    private accsPrvdrs: AccessProviders,
    private storage: Storage,
    private navCtrl: NavController,
    private service: DonateService
  ) { }

  ngOnInit() {
    this.service.getAll().subscribe(response => {
      this.donate = response;
     })

  }
}
