import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';

@Component({
  selector: 'app-listofimages',
  templateUrl: './listofimages.page.html',
  styleUrls: ['./listofimages.page.scss'],
})
export class ListofimagesPage implements OnInit {
  img: any;

  sliderOpts = {
    zoom: {
      maxRatio: 5
    }
  }


  constructor(private navParams: NavParams, private modalController: ModalController) { }

  ngOnInit() {
    this.img = this.navParams.get('img');
  }
  
  close(){
    this.modalController.dismiss();
  }

}
