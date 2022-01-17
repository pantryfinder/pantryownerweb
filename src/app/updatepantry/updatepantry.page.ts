import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastController, LoadingController, AlertController, NavController } from '@ionic/angular';
import { AccessProviders } from '../providers/access.providers';



@Component({
  selector: 'app-updatepantry',
  templateUrl: './updatepantry.page.html',
  styleUrls: ['./updatepantry.page.scss'],
})
export class UpdatepantryPage implements OnInit {

  pantry_name: string = "";
  user_contact: string = "";
  list_of_items: string = "";
  street_address: string = "";
  barangay: string = "";
  municipality: string = "";
  province: string = "";
  region: string = "";
  user_email: string = "";
  gcash_number: string = "";
  category_1: string;
  category_2: string;
  category_3: string;
  status: string = ""; 
  pantry_id: number;
  open_time: any;
  close_time: any;
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
            this.user_contact= res.result.user_contact,
            this.category_1= res.result.category_1,
            this.category_2= res.result.category_2,
            this.category_3= res.result.category_3,
            this.list_of_items= res.result.list_of_items,
            this.street_address= res.result.street_address,
            this.barangay= res.result.barangay,
            this.municipality= res.result.municipality,
            this.province= res.result.province,
            this.open_time= res.result.open_time,
            this.close_time= res.result.close_time,
            this.user_email= res.result.user_email,
            this.gcash_number= res.result.gcash_number,
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
          aksi: 'update',
           pantry_id: this.pantry_id,
            pantry_name:  this.pantry_name,
            user_contact:  this.user_contact,
            category_1:  this.category_1,
            category_2:  this.category_2,
            category_3:  this.category_3,
            list_of_items: this.list_of_items,
            street_address:this.street_address,
            barangay: this.barangay,
            municipality:this.municipality,
            province:this.province,
            open_time: this.open_time,
            close_time: this.close_time,
            user_email: this.user_email,
            gcash_number: this.gcash_number,           
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

back(){
  this.router.navigateByUrl('/mypantry');
}


}