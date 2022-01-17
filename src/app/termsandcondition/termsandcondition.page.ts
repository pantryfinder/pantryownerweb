import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-termsandcondition',
  templateUrl: './termsandcondition.page.html',
  styleUrls: ['./termsandcondition.page.scss'],
})
export class TermsandconditionPage implements OnInit {

  constructor(private modalCtrl: ModalController, private router:Router) { }

  ngOnInit() {
  }

  close(){
    this.router.navigate(['/register']);
    this.modalCtrl.dismiss();
  }

}
