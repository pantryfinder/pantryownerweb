import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router,  } from '@angular/router';

import { AlertController, LoadingController, ToastController, NavController, ActionSheetController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { AccessProviders } from '../../providers/access.providers';

import { ApiService, community_pantry } from 'src/app/api.service';




@Component({
  selector: 'app-mypantry',
  templateUrl: './mypantry.page.html',
  styleUrls: ['./mypantry.page.scss'],
})
export class MypantryPage implements OnInit {

data: any;
  public community_pantry=[];
  user_id: any;
  datastorage: any;

  constructor(
    private route: Router,
    private http: HttpClient,
    private alertController: AlertController,
    public loadCtrl: LoadingController,
    public AlertCtrl: AlertController,
    private navCtrl: NavController,
    private actionCtrl: ActionSheetController,
    private storage: Storage,
    private router: Router,
 
    private actRouted: ActivatedRoute,
    public apiService: ApiService,
    private toastCtrl: ToastController,
    private accsPrvdrs: AccessProviders) { }

  ngOnInit() {

    this.apiService.getData().subscribe(data =>{
      console.log(data);
      this.community_pantry = data;
    })   
  } 

  ionViewDidEnter(){
    
  }
 

}

