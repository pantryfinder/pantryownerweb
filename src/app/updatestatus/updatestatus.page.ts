import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { Router, ActivatedRoute } from '@angular/router';
import { PantryService, community_pantry } from 'src/app/services/pantry.service';
import { ToastController, LoadingController, AlertController, NavController } from '@ionic/angular';
import { AccessProviders } from '../providers/access.providers';

@Component({
  selector: 'app-updatestatus',
  templateUrl: './updatestatus.page.html',
  styleUrls: ['./updatestatus.page.scss'],
})
export class UpdatestatusPage implements OnInit {

  pantry_name: string = "";
 
  status: string = ""; 
  pantry_id: number;
  disabledButton;

  constructor(private router:Router,
    private toastCtrl: ToastController,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
    private accsPrvdrs: AccessProviders,
    private actRoute: ActivatedRoute,
    private navCtrl: NavController) { }

  ngOnInit() {
    this.actRoute.params.subscribe((data: any)=>{
      console.log(data);
      this.pantry_id = data.pantry_id;

      if(this.pantry_id!=0){
        this.loadPantry();
      }
    });
  }

  loadPantry(){
    return new Promise(resolve => {
      let body = {
        aksi: 'load_pantry',
        pantry_id: this.pantry_id,
      }

      this.accsPrvdrs.postData(body, 'update_pantry.php').subscribe((res:any)=>{
            this.pantry_name = res.result.pantry_name,
            this.status= res.result.status      
      })
    });
  }

  async crudAction(a){
 
      const loader = await this.loadingCtrl.create({
        message: 'Please wait....',
      });
      loader.present();

      return new Promise(resolve => {
        let body = {
          aksi: 'update_status',
           pantry_id: this.pantry_id,
            status: this.status,
            action: a
        }
         this.accsPrvdrs.postData(body, 'update_pantry.php').subscribe((res:any)=>{
            if(res.success==true){
              loader.dismiss();
              this.disabledButton = false;
              this.presentToast(a+res.msg);
              this.router.navigate(['/mypantry']);
              
            }else {
              loader.dismiss();
              this.disabledButton = false;
              this.presentAlert(res.msg,a);
            }
         }, (err) => {
          loader.dismiss();
           this.disabledButton = false;     
           this.router.navigate(['/mypantry']);     
         });
       
      });
}

async presentToast(a){
    const toast = await this.toastCtrl.create({
      message: a,
      duration: 1500,
      position: 'bottom'
    });
    toast.present();
}

async presentAlert(a,b){
  const alert = await this.alertCtrl.create({
    header: a,
    backdropDismiss: false,
    buttons: [
      {
        text: 'Close',
        handler: (blah) => {
          console.log('Confirm Cancel: blah');
          //action
        }
      }, {
        text: 'Try again',
        handler:()=>{
          this.crudAction(b);
        }
      }
    ]
  });

  await alert.present();
}

close(){
  this.router.navigateByUrl('/mypantry');
}




}