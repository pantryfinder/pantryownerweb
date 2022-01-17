import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastController, LoadingController, AlertController, NavController } from '@ionic/angular';
import { AccessProviders } from '../providers/access.providers';

@Component({
  selector: 'app-updatedonorprofile',
  templateUrl: './updatedonorprofile.page.html',
  styleUrls: ['./updatedonorprofile.page.scss'],
})
export class UpdatedonorprofilePage implements OnInit {

  
  user_id: number;
  username: string = "";
  user_fname: string = "";
  user_mname: string = "";
  user_lname: string = "";
  user_contact: string = "";
  user_email: string = "";
  user_type: string = "";
  password: string = ""
  confirm_pass: string = "";
  disabledButton;

  constructor(private router:Router,
    private toastCtrl: ToastController,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
    private accsPrvdrs: AccessProviders,
    private actRoute: ActivatedRoute,
    private navCtrl: NavController,) { }

  ngOnInit() {
    this.actRoute.params.subscribe((data: any)=>{
      console.log(data);
      this.user_id = data.user_id;

      if(this.user_id!=0){
        this.loadUser();
      }
    });
  }


  loadUser(){
    return new Promise(resolve => {
      let body = {
        aksi: 'load_single_data',
        user_id: this.user_id,
      }

      this.accsPrvdrs.postData(body, 'proses_api.php').subscribe((res:any)=>{
        this.username = res.result.username;
        this.user_fname = res.result.user_fname;
        this.user_mname = res.result.user_mname;
        this.user_lname = res.result.user_lname;
        this.user_mname = res.result.user_mname;
        this.user_contact = res.result.user_contact;
        this.user_email = res.result.user_email;
      })
    
    });

  }

  async crudAction(a){
    this.disabledButton = true;
      const loader = await this.loadingCtrl.create({
        message: 'Please wait....',
      });
      loader.present();

      return new Promise(resolve => {
        let body = {
          aksi: 'update',
          user_id: this.user_id,
          username: this.username,
          user_fname: this.user_fname,
          user_mname: this.user_mname,
          user_lname: this.user_lname,
          user_contact: this.user_contact,
          user_email: this.user_email,
          password: this.password,
          action: a
          
        }
         this.accsPrvdrs.postData(body, 'proses_api.php').subscribe((res:any)=>{
            if(res.success==true){
              loader.dismiss();
              this.disabledButton = false;
              this.presentToast(a+res.msg);
              this.router.navigate(['/donorpage/donorhome']);
            }else {
              loader.dismiss();
              this.disabledButton = false;
              this.presentAlert(res.msg,a);
            }
          },(err) =>{
           loader.dismiss();
           this.disabledButton = false;
           this.presentToast('Updated Successfully, refresh to view');
           this.router.navigate(['/donorpage/donorhome']);
         });
       
      });
    
}

async presentToast(a){
    const toast = await this.toastCtrl.create({
      message: a,
      duration: 1500,
      position: 'top'
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


}
