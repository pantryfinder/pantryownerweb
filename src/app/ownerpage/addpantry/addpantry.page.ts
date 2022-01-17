import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../../api.service';
import { ActivatedRoute } from '@angular/router';
import { ToastController, LoadingController, AlertController, ModalController } from '@ionic/angular';
import { AccessProviders } from '../../providers/access.providers';
import { Storage } from '@ionic/storage';
import { FormControl, FormGroup, Validators } from '@angular/forms';  
import { MapstepsPage } from '../../mapsteps/mapsteps.page';



@Component({
  selector: 'app-addpantry',
  templateUrl: './addpantry.page.html',
  styleUrls: ['./addpantry.page.scss'],
})
export class AddpantryPage implements OnInit {
  form: FormGroup;
  pantry_name: string = "";
  user_contact: string = "";
  list_of_items: string = "";
  street_address: string = "";
  barangay: string = "";
  municipality: string = "";
  province: string = "";
  //region: string = "";
  email: string = "";
  gcash_number: string = "";
  category: string = "";
  status: string = ""; 
  longitude: string = "";
  latitude: string = "";
  user_id: any;
  category_1: any;
  category_2:any;
  category_3: any;
  open_time: string="";
  close_time: string="";
  user_email: string = "";
  disabledButton;
  datastorage: any;

 

  constructor(
    public _apiService: ApiService,
    private router:Router,
    private toastCtrl: ToastController,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
    private accsPrvdrs: AccessProviders,
    private modalCtrl: ModalController,
    private storage: Storage,) { this.initForm(); }

   ngOnInit() {
  }
  initForm() {
    this.form = new FormGroup({
     // number: new FormControl(null, {validators: [Validators.required]}),
      phone: new FormControl(null, {validators: [Validators.required,  Validators.pattern('^\\s*(?:\\+?(\\d{1,3}))?[-. (]*(\\d{3})[-. )]*(\\d{3})[-. ]*(\\d{4})(?: *x(\\d+))?\\s*$'), Validators.minLength(11)]}),
    });
  }

  ionViewDidEnter(){
    this.storage.get('storage_xxx').then((res)=>{
      console.log(res);
      this.datastorage = res;
      this.user_id = this.datastorage.user_id;
      this.loadUser();
      
    });
  }

  loadUser(){
    return new Promise(resolve => {
      let body = {
        aksi: 'load_single_data',
        user_id: this.user_id,
      }

      this.accsPrvdrs.postData(body, 'update_profile.php').subscribe((res:any)=>{
        this.user_contact = res.result.user_contact;
        this.user_email = res.result.user_email;
      })
    
    });

  }
  
  async addPantry(){

  if(this.pantry_name == ""){
      this.presentToast('Please enter your Pantry Name');
  }else if(this.user_contact==""){
      this.presentToast('Please enter your Phone Number');
  }else if(this.list_of_items==""){
    this.presentToast('Please enter your List of Items');
  }else if(this.street_address==""){
    this.presentToast('Please enter your Street Address');
  }else if(this.barangay==""){
    this.presentToast('Please enter your Barangay');
  }else if(this.municipality==""){
    this.presentToast('Please enter your Municipality');
  }else if(this.province==""){
    this.presentToast('Please enter your Province');
  }else if(this.open_time==""){
    this.presentToast('Please enter your Open Time');
  }else if(this.close_time==""){
    this.presentToast('Please enter your Close Time');
  }else if(this.user_email==""){
    this.presentToast('Please enter your Email');
  }else if(this.gcash_number==""){
    this.presentToast('Please enter GCash Number');
  }else if(!this.form.valid ){
    this.form.markAllAsTouched();
     this.presentToast('Please enter your information correctly');
  }else if(this.status==""){
    this.presentToast('Please enter your Status');
  }else {
    this.disabledButton = true;
    const loader = await this.loadingCtrl.create({
      message: 'Please wait....',
    });
    loader.present();
    
      return new Promise(resolve => {
        let body = {
          aksi: 'proses_pantry',
            user_id: this.user_id,
            pantry_name:  this.pantry_name,
            user_contact:  this.user_contact,
            category_1: this.category_1,
            category_2: this.category_2,
            category_3: this.category_3,
            list_of_items: this.list_of_items,
            latitude: this.latitude,
            longitude: this.longitude,
            street_address:this.street_address,
            barangay: this.barangay,
            municipality:this.municipality,
            province:this.province,
            open_time: this.open_time,
            close_time: this.close_time,
            user_email: this.user_email,
            gcash_number: this.gcash_number,           
            status: this.status
        }

         this.accsPrvdrs.postData(body, 'prosess_pantry.php').subscribe((res:any)=>{
            if(res.success==true){
              loader.dismiss();
              this.disabledButton = false;
              this.presentToast(res.msg);
             // this.storage.set('storage_xxx', res.result); // create storage session
              this.router.navigate(['/ownerpage/listofpantry']);
            }else {
              loader.dismiss();
              this.disabledButton = false;
              this.presentToast(res.msg);
            }
         }, (err) => {
           loader.dismiss();
           this.disabledButton = false;
           this.presentAlert('Success! You have successfully created a Community Pantry. Hope you will help many people who are in needs.');
          
          });       
      });
    }
}

async presentToast(a){
  const toast = await this.toastCtrl.create({
    message: a,
    duration: 1500,
    position: 'top'
  });
  toast.present();
}

async presentAlert(a){
  const alert = await this.alertCtrl.create({
    header: a,
    backdropDismiss: false,
    buttons: [
      {
        text: 'OK',
        handler: (blah) => {
          console.log('Successful');
          this.router.navigate(['/ownerpage/listofpantry']);
        }
      }
    ]
  });

  await alert.present();
}

async doRefresh(event){
  const loader = await this.loadingCtrl.create({
    message: 'Please wait....',
  });
    loader.present();

    this.ionViewDidEnter();
    event.target.complete();

    loader.dismiss();
}

async openTransparentModal(){
  const modal = await this.modalCtrl.create({
    component: MapstepsPage,
    cssClass: 'transparent-modal'
  });
  await modal.present();
}


}