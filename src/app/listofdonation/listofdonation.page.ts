import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router,  } from '@angular/router';
import { AlertController, LoadingController, ToastController, NavController, ActionSheetController, ModalController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { AccessProviders } from '../providers/access.providers';


@Component({
  selector: 'app-listofdonation',
  templateUrl: './listofdonation.page.html',
  styleUrls: ['./listofdonation.page.scss'],
})
export class ListofdonationPage implements OnInit {

  constructor(
    private route: Router,
    private http: HttpClient,
    private alertController: AlertController,
    public loadCtrl: LoadingController,
    public AlertCtrl: AlertController,
    private navCtrl: NavController,
    private actionCtrl: ActionSheetController,
    private storage: Storage,
    private router: Router,
    private actRoute: ActivatedRoute,
    private toastCtrl: ToastController,
    private accsPrvdrs: AccessProviders,
    private modalCtrl: ModalController) { }
    datastorage: any;

    user_id: number;
    users = []
    user = []
    pantry: any = [];
    pantry_id: number;
    donation_id: number;
    btnVal = "Pending";
    disabledButton;
    
  segmentValue= '1';
    
  ngOnInit() {
    this.actRoute.params.subscribe((data: any)=>{
      console.log(data);
      this.pantry_id = data.pantry_id;
      if(this.pantry_id!=0){
        this.users = [];
        this.loaddonors();
        this.user = [];
        this.loaddonors1();
        
      }
    });
  }

  ionViewDidEnter() {
    
    
  }

  async loaddonors(){
    const load = await this.loadCtrl.create({
      message : "Loading....",
     });
    
    
    return new Promise(resolve => {
      let data = {
        aksi: 'load_listofdonate',
        pantry_id: this.pantry_id,
      }

      this.accsPrvdrs.postData(data, 'proses_api.php').subscribe((res:any)=>{
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
      
      this.presentToast("Cannot Load Data"); 
       
      }) 
         
    });
  }

  async presentToast(a){
    const toast = await this.toastCtrl.create({
      message : a,
      duration : 1500,
      position : 'top'
    });
    toast.present();
  }


  changeText()
      { 
        this.btnVal = "Approved!!"
        
      }


      async presentActionSheet() {
        const actionSheet = await this.actionCtrl.create({
          header: 'Albums',
          cssClass: 'my-custom-class',
          buttons: [{
            text: 'Delete',
            role: 'destructive',
            icon: 'trash',
            handler: () => {
              console.log('Delete clicked');
            }
          }, {
            text: 'Share',
            icon: 'share',
            handler: () => {
              console.log('Share clicked');
            }
          }, {
            text: 'Play (open modal)',
            icon: 'caret-forward-circle',
            handler: () => {
              console.log('Play clicked');
            }
          }, {
            text: 'Favorite',
            icon: 'heart',
            handler: () => {
              console.log('Favorite clicked');
            }
          }, {
            text: 'Cancel',
            icon: 'close',
            role: 'cancel',
            handler: () => {
              console.log('Cancel clicked');
            }
          }]
        });
        await actionSheet.present();
    
        const { role } = await actionSheet.onDidDismiss();
        console.log('onDidDismiss resolved with role', role);
      }



      async approved() {
        this.disabledButton = true;
        const loader = await this.loadCtrl.create({
          message: 'Please wait....',
        });
        loader.present();
        const alert = await this.alertController.create({
          
          header: "Alert",
          message: "Are you sure that you want to APPROVE? You cant change it after you confrim it.",
          buttons: [
            {
              text: "Cancel",
              role: "cancel",
              handler: () => {
                console.log("No");
               
              },
            },
            {
              text: "Confirm",
              handler: () => {
                console.log("Yes"); 
              
                this.navCtrl.navigateRoot(['/listofdonation']); 
    
                const toast = this.toastCtrl.create({
                  
                  message: 'You Successfully Approved the Donation',
                   duration: 1500  
                 });
              
              },
              
            },
          ],
         
        });
      
        await alert.present();
       
      }

      async crudAction(a){
        this.disabledButton = true;
          const loader = await this.loadCtrl.create({
            message: 'Please wait....',
          });
          loader.present();
    
          return new Promise(resolve => {
            let body = {
              aksi: 'updatestatus',
              pantry_id :this.pantry_id,
              user_id: this.user_id,
              action: a
              
            }
             this.accsPrvdrs.postData(body, 'proses_api.php').subscribe((res:any)=>{
                if(res.success==true){
                  loader.dismiss();
                  this.disabledButton = false;
                  this.presentToast(res.msg);
                 
                }else {
                  loader.dismiss();
                  this.disabledButton = false;
                  this.presentToast(res.msg);
                }
              },(err) =>{
               loader.dismiss();
               this.disabledButton = false;
               console.log();
              
             });
           
          });
        
    }
    
   

    approveddonate(a){
        this.router.navigate(['/approved/' +a]);
     
    }

    segmentChanged(event){
      console.log(event);
      this.segmentValue = event.detail.value;
    }

    async loaddonors1(){
      const load = await this.loadCtrl.create({
        message : "Loading....",
       });
      
      
      return new Promise(resolve => {
        let data = {
          aksi: 'load_listofdonate1',
          pantry_id: this.pantry_id,
        }
  
        this.accsPrvdrs.postData(data, 'proses_api.php').subscribe((res:any)=>{
          if(res.success==true){
            for(let datas of res.result){
              this.user.push(datas);
              console.log(datas);
              load.dismiss();
            }
        
          }else{
          load.dismiss();
          
          this.presentToast(res.msg);
          }
      },(err)=>{
        load.dismiss();
        
        this.presentToast("Cannot Load Data"); 
         
        }) 
           
      });
    }
  
  

}
