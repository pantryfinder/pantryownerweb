import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { CategoriesPage } from '../categories/categories.page';

@Component({
  selector: 'app-index',
  templateUrl: './index.page.html',
  styleUrls: ['./index.page.scss'],
})
export class IndexPage implements OnInit {
  slideOpts = {
    initialSlide: 0,
    speed: 400
  };

  

  constructor(private router: Router, private modalCtrl: ModalController,) { }

  ngOnInit() {
  }

  navigateToLoginPage(){
    this.router.navigate(['pantrypost']);
  }

  async openTransparentModal(){
    const modal = await this.modalCtrl.create({
      component: CategoriesPage,
      cssClass: 'transparent-modal'
    });
    await modal.present();
  }

}
