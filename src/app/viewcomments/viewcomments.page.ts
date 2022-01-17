import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router,  } from '@angular/router';
import { AlertController, LoadingController, ToastController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { AccessProviders } from '../providers/access.providers';


@Component({
  selector: 'app-viewcomments',
  templateUrl: './viewcomments.page.html',
  styleUrls: ['./viewcomments.page.scss'],
})


export class ViewcommentsPage implements OnInit {
  pantry_id: any;
  phone_number: string="";

  term;

  user_fname: string = "";
  user_lname: string = "";
  user_mname: string = "";

  comment: string = "";

  address: string = "";
  email: string ="";
  date_of_donation: string = "";

  transaction: string = ""
  user_id: any;
  datastorage: any;
  user_contact: string= "";
  user_email: string = "";
  pantry_name: string="";
  disabledButton;
  public recommendation=[];

users= []
 
  constructor(  
     private actRoute: ActivatedRoute, private accsPrvdrs: AccessProviders, 
     private storage: Storage,  private router:Router, 
     private loadingCtrl: LoadingController,  private alertController: AlertController,
     private toastCtrl: ToastController, private alertCtrl: AlertController) {}

  ngOnInit() {
    this.actRoute.params.subscribe((data: any)=>{
      console.log(data);
      this.pantry_id = data.pantry_id;
     
      
      if(this.pantry_id!=0){
        this.loaddonors(); 
      } 
      this.users = [];
      this.loadcomment();    
      
   });


  }

    ionViewDidEnter(){
          
        
          this.storage.get('storage_xxx').then((res)=>{
          console.log(res);
          this.datastorage = res;
          this.user_id = this.datastorage.user_id;  
          this.loadUser();           
        });
       
      //  this.loadPantry();
      }
 
  
  async doRefresh(event){
    const loader = await this.loadingCtrl.create({
      message: 'Please wait....',
    });
      loader.present();
   
     this.ngOnInit();
    
      event.target.complete();
       
      loader.dismiss();
  }

  async loaddonors(){
    const load = await this.loadingCtrl.create({
      message : "Loading....",
     });
    
    
    return new Promise(resolve => {
      let data = {  
        aksi: 'load_pantry',
        user_id: this.user_id,
        pantry_id: this.pantry_id,
      }

      this.accsPrvdrs.postData(data, 'proses_api.php').subscribe((res:any)=>{
        this.pantry_name  = res.result.pantry_name;
       
    }) 
         
    });
  }


  loadUser(){
    return new Promise(resolve => {
      let body = {
        aksi: 'load_donordata',
        user_id: this.user_id,
      }

      this.accsPrvdrs.postData(body, 'proses_api.php').subscribe((res:any)=>{
        this.user_fname  = res.result.user_fname;
        this.user_lname  = res.result.user_lname;
      
      })
    
    });

  }

   async postcomment(a){
    
    if(this.comment==""){      
      this.presentToast('Please enter your comment');
    }else {

    const alert = await this.alertController.create({
      
      header: "",
      message: "Submit this comment ?",
      buttons: [
        {
          text: "No",
          role: "cancel",
          handler: () => {
            console.log("No");
           
          },
        },
        {
          text: "Yes",
          handler: () => {
            console.log("Yes");
           
            return new Promise(resolve => {
              let body = {
                aksi: 'post_comments',
                user_id: this.user_id,
                pantry_id: this.pantry_id,
                user_fname: this.user_fname,
                user_lname: this.user_lname,
                comment: this.comment,
               
                
                action: a
                
              }
              
              this.accsPrvdrs.postData(body,'process_comments.php').subscribe((res:any)=>{
                if(res.success==true){
                  alert.dismiss();
                  this.disabledButton = false;
                  console.log(res);
                  this.presentToast(res.msg);
                //this.sendsms();
                // this.router.navigate(['/viewcomments/']);
                }else {
                  alert.dismiss();
                  this.disabledButton = false;
                  this.presentToast(res.msg);
                }
             }, (err) => {
              alert.dismiss();
               this.disabledButton = false;
               this.presentAlert('Successful');
             });
             
            });
          
          },
        },
      ],
     
    });
  
    await alert.present();
  }
} 


async loadcomment(){
  const load = await this.loadingCtrl.create({
    message : "Loading....",
   });
  
  
  return new Promise(resolve => {
    let data = {
      aksi: 'load_comments',
      pantry_id: this.pantry_id,
    }

    this.accsPrvdrs.postData(data, 'process_comments.php').subscribe((res:any)=>{
      if(res.success==true){
        for(let datas of res.result){
          this.users.push(datas);
          console.log(datas);
          load.dismiss();
        }
    
      }else{
      load.dismiss();
      this.presentToast(res.msg);
      }
  },(err)=>{
    load.dismiss();
    console.log();
    this.presentToast("Cannot Load Data"); 
     
    }) 
       
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

async presentAlert(a){
    const alert = await this.alertCtrl.create({
      header: a,
      backdropDismiss: false,
      buttons: [
        {
          text: 'OK',
          handler: (blah) => {
            console.log('Successful');
            //this.router.navigate(['/donorpage/listofpantry']);
          }
        }
      ]
    });

    await alert.present();
}





}