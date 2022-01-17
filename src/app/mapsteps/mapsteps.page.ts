import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-mapsteps',
  templateUrl: './mapsteps.page.html',
  styleUrls: ['./mapsteps.page.scss'],
})
export class MapstepsPage implements OnInit {

  constructor(private modalCtrl: ModalController, private router:Router) { }

  ngOnInit() {
  }
  close(){
    this.router.navigate(['/ownerpage/addpantry']);
    this.modalCtrl.dismiss();
  }

}
