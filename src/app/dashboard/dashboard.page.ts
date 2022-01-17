
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertController } from '@ionic/angular';
import { NavController, LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {
  registerForm: FormGroup;
  submitted = false;
  private loading;

  constructor( private route: Router,  private loadingCtrl: LoadingController, private formBuilder: FormBuilder, public alertController: AlertController){}
  //Add user form actions
  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Great!!',
      message: 'User has been registered.',
      buttons: ['OK']
    });

    await alert.present();

    
  }
  get f() { return this.registerForm.controls; }
  onSubmit() {
     this.submitted = true;
    // stop here if form is invalid
    if (this.registerForm.invalid) {
        return;
    }
    //True if all the fields are filled
    if(this.submitted)
    {
      
      // Initialize Params Object
      var myFormData = new FormData();
    
    // Begin assigning parameters
    
        myFormData.append('myUsername', this.registerForm.value.firstname);
        myFormData.append('myEmail', this.registerForm.value.email);
        myFormData.append('myPass', this.registerForm.value.password);
    
   
        this.presentAlert();
        
    }
  
  }
    ngOnInit() {
      //Add User form validations
      this.registerForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      firstname: ['', [Validators.required]],
      password: ['', [Validators.required]]
      });
    }
    
    home(){
      this.loadingCtrl.create({
        message:'Creating Account...'
      }).then((overlay) => {
        this.loading = overlay;
        this.loading.present();
      });
  
      setTimeout(() => {
        this.loading.dismiss();
         this.route.navigateByUrl('home');
      }, 1000);
    }
    

}


 // results: any;
  //roleValue:any;

  //constructor(public http:HttpClient, private serv: ServiceproviderService, private router: Router, private route: ActivatedRoute,
    //  public actionSheetController: ActionSheetController) { 

//this.route.queryParams.subscribe(params => {
  //console.log("Data Received", params.role);

    //params saved in locally
    //localStorage.setItem('roleValue', params.role)

    //saving the value in the variable.
    //this.roleValue = localStorage.getItem('roleValue');

      //checking if the value is admin then run the script and return the count of the user.
      //if (this.roleValue == 'admin'){
        //this.http.get("http://localhost/database/dashboard.php?roleValue=user").
        //subscribe(result => {
          //this.results = result;
          //console.log('In Dashboard', this.results);
          
        //})
     // }
  //})

//}

  //ngOnInit() {
  //}

  //async presentModal(){
   // const actionSheet = await this.actionSheetController.create({
     // header: 'My Account',
      //cssClass: 'EditIcon', 
      //buttons: [{
       // text: 'Profile',
        //role: 'information',
        //icon: 'grid',
        //handler: () => {
          //console.log('Profile Clicked');
       // }
      //}
      //,{
        //text: 'Settings',
        //role: 'information',
        //icon: 'settings',
        //handler: ()=> {
         // console.log('Settings Clicked');
        //}
     // },
      //{
        //text: 'Lougout',
        //icon: 'power',
        //handler: () => {
         // localStorage.clear();
         // this.router.navigate(['/home']);
       // }
   //   }]

  //  });

  //  await actionSheet.present();
 //}

//}
