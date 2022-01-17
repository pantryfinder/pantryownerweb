import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastController, LoadingController, AlertController, ModalController } from '@ionic/angular';
import { AccessProviders } from '../providers/access.providers';
import { FormControl, FormGroup, Validators } from '@angular/forms';  
import { TermsandconditionPage } from '../termsandcondition/termsandcondition.page';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  form: FormGroup;

  username: string = "";
  user_fname: string = "";
  user_mname: string = "";
  user_lname: string = "";
  user_contact: string = "";
  user_email: string = "";
  user_type: string = "";
  password: string = ""
  tac: string="";
  created_at: string="";
  confirm_pass: string = "";
  disabledButton;

  constructor(
    private router:Router,
    private toastCtrl: ToastController,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
    private accsPrvdrs: AccessProviders,
    private modalCtrl: ModalController

    ) {  this.initForm(); }

  ngOnInit() {
  }

  initForm() {
    this.form = new FormGroup({
     // number: new FormControl(null, {validators: [Validators.required]}),
      email: new FormControl(null, {validators: [Validators.required, Validators.email]}),
      password: new FormControl(null, {validators: [Validators.required, Validators.minLength(8)]}),
      phone: new FormControl(null, {validators: [Validators.required,  Validators.pattern('^\\s*(?:\\+?(\\d{1,3}))?[-. (]*(\\d{3})[-. )]*(\\d{3})[-. ]*(\\d{4})(?: *x(\\d+))?\\s*$'), Validators.minLength(11)]}),
    });
  }

  ionViewDidEnter(){
    this.disabledButton = false;
  }

  async tryRegister(){
      if(this.user_type == ""){
          this.presentToast('Please select your user type');
      }else if(this.username==""){
          this.presentToast('Please enter your username');
      }else if(this.user_fname==""){
        this.presentToast('Please enter your first name');
      }else if(this.user_mname==""){
        this.presentToast('Please enter your middle name');
      }else if(this.user_lname==""){
        this.presentToast('Please enter your last name');
      }else if(this.user_contact==""){
        this.presentToast('Please enter your phone number');
      }else if(this.tac==""){
          this.presentToast('Terms and Condition');
      }else if(!this.form.valid ){
         
          this.form.markAllAsTouched();
           this.presentToast('Please enter your information correctly');
      }else if(this.password==""){
        this.presentToast('Please enter your password');
      }else if(this.confirm_pass!=this.password){
        this.presentToast('Password are not the same');
      }else{

        this.disabledButton = true;
        const loader = await this.loadingCtrl.create({
          message: 'Please wait....',
        });
        loader.present();
        
        return new Promise(resolve => {
          let body = {
            aksi: 'proses_register',
            username: this.username,
            user_fname: this.user_fname,
            user_mname: this.user_mname,
            user_lname: this.user_lname,
            user_contact: this.user_contact,
            user_email: this.user_email,
            user_type: this.user_type,
            tac: this.tac,  
            password: this.password,
            created: this.created_at
            
          }

           this.accsPrvdrs.postData(body, 'proses_api.php').subscribe((res:any)=>{
              if(res.success==true){
                loader.dismiss();
                this.disabledButton = false;
                this.presentToast(res.msg);
                //this.presentAlert1();
                this.router.navigate(['/login']);
              }else {
                loader.dismiss();
                this.disabledButton = false;
                this.presentToast(res.msg);
              }
           }, (err) => {
            loader.dismiss();
            this.disabledButton = false;
            this.presentAlert1();
          });
         
        });
        
      }

      

     
  }

  onSubmit() {
    if(!this.form.valid) {
      this.form.markAllAsTouched();
      return;
    }
    console.log(this.form.value);
  }

  async presentToast(a){
      const toast = await this.toastCtrl.create({
        message: a,
        duration: 1500,
        position: 'bottom'
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
              this.router.navigate(['/login']);
            }
          }
        ]
      });

      await alert.present();
  }
 
  openRegister(){
    this.router.navigate(['/login']);
  }

  openTAC(){
    this.router.navigate(['/termsandcondition']);
  }

  async presentAlert1() {
    const alert = await this.alertCtrl.create({
      cssClass: 'my-custom-class',
      header: 'Success! You have successfully created an account',
      message: " Make sure you created a real account because were going to inform and notify you about the updates. Thank you <3.",
      buttons: [{
        text: 'OK',
        handler: (blah) => {
          this.router.navigate(['/login']);
        }
      }]
    });

    await alert.present();

    const { role } = await alert.onDidDismiss();
    console.log('onDidDismiss resolved with role', role);
  }

  async openTransparentModal(){
    const modal = await this.modalCtrl.create({
      component: TermsandconditionPage,
      cssClass: 'transparent-modal'
    });
    await modal.present();
  }


}
