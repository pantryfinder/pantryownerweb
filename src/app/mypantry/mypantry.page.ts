import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router,  } from '@angular/router';
import { AlertController, LoadingController, ToastController, NavController, ActionSheetController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { AccessProviders } from '../providers/access.providers';

import { ApiService, community_pantry } from 'src/app/api.service';
@Component({
  selector: 'app-mypantry',
  templateUrl: './mypantry.page.html',
  styleUrls: ['./mypantry.page.scss'],
})
export class MypantryPage implements OnInit {

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
    public apiService: ApiService,
    private toastCtrl: ToastController,
    private accsPrvdrs: AccessProviders) { }

    datastorage: any;

    fname: string;
    mname: string;
    lname: string;
    u_name: string;
    u_email: string;
    u_number: string;
    user_id: number;
    users = []
    pantry: any = [];
    pantry_id: number;
    pantry_name: string;
    phone_number: string;
    list_of_items: string;
    street_address: string;
    barangay: string;
    municipality: string;
    province: string;
    //region: string;
    user_email: string;
    gcash_number: string;
    category: string;
    status: string;
    category_1:string ="";
    category_2: string ="";
    category_3: string ="";
    disabledButton;

  ngOnInit() {
    
  }

  ionViewDidEnter() {
    this.storage.get('storage_xxx').then((res) => {
      console.log(res);
      this.datastorage = res;
      this.user_id = this.datastorage.user_id;
      this.users = [];
       this.loadUser();
    });

  }

    async loadUser(){
      const load = await this.loadCtrl.create({
        message : "Loading....",
       });
      
      
      return new Promise(resolve => {
        let data = {
          aksi: 'load_mypantry',
          user_id: this.user_id,
        }

        this.accsPrvdrs.postData(data, 'proses_api.php').subscribe((res:any)=>{
          if(res.success==true){
            for(let datas of res.result){
              this.users.push(datas);
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


    async deletePantry(a) {
      this.disabledButton = true;
      const alert = await this.alertController.create({
        
        header: "Alert",
        message: "Are you sure that you want to DELETE this Community Pantry?",
        buttons: [
          {
            text: "Close",
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
            aksi: 'deletepantry',
            pantry_id: a
          }
          this.accsPrvdrs.postData(body, 'proses_api.php').subscribe((res:any)=>{
            if(res.success==true){
              this.presentToast('You successfully delete your pantry');
              this.ionViewDidEnter();
            }else{
              this.presentToast('Delete error');
            }
          });
        });  
  
            
            },
            
          },
        ],
       
      });
    
      await alert.present();
     
    }

    async presentToast(a){
      const toast = await this.toastCtrl.create({
        message : a,
        duration : 1500,
        position : 'top'
      });
      toast.present();
    }

    openPantry(a){
      this.router.navigate(['/listofdonation/' +a]);
    }
   updatePantry(a){
      this.router.navigate(['/updatepantry/' +a]);
    }

    back1(){
      this.router.navigateByUrl('/ownerpage/listofpantry');
    }

    updateStatus(a){
      this.router.navigate(['/updatestatus/' +a]);
    }
  
}