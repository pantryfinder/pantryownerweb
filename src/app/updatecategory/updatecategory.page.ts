import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastController, LoadingController, AlertController, NavController } from '@ionic/angular';
import { AccessProviders } from '../providers/access.providers';


@Component({
  selector: 'app-updatecategory',
  templateUrl: './updatecategory.page.html',
  styleUrls: ['./updatecategory.page.scss'],
})
export class UpdatecategoryPage implements OnInit {

  pantry_name: string = "";
  list_of_items: string = "";
  
  category_1: any;
  category_2: any;
  category_3: any;
  pantry_id: number;
  
  disabledButton;
  form: { val: string; isChecked: boolean; }[];

  load = [
   {val: 'dd', isChecked:false } ];

  constructor(private router:Router,
    private toastCtrl: ToastController,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
    private accsPrvdrs: AccessProviders,
    private actRoute: ActivatedRoute,
    private navCtrl: NavController) { }

  ngOnInit() {
   
  }

  ionViewDidEnter(){
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

      this.accsPrvdrs.postData(body, 'updatecategory.php').subscribe((res:any)=>{
        
            this.pantry_name = res.result.pantry_name,
            this.category_1= res.result.category_1,
            this.category_2= res.result.category_2,
            this.category_3= res.result.category_3,
            this.list_of_items= res.result.list_of_items      
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
          aksi: 'update_category',
           pantry_id: this.pantry_id,
            pantry_name:  this.pantry_name,          
            category_1: this.category_1,
            category_2: this.category_2,
            category_3: this.category_3,
            list_of_items: this.list_of_items,         
            action: a
          
        }
         this.accsPrvdrs.postData(body, 'updatecategory.php').subscribe((res:any)=>{
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