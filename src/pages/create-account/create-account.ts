import { Component } from '@angular/core';
import { IonicPage, NavController, LoadingController, AlertController} from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthProvider } from '../../providers/auth/auth';

@IonicPage()
@Component({
  selector: 'page-create-account',
  templateUrl: 'create-account.html',
})
export class CreateAccountPage {

  private registerForm: FormGroup;
  public loading;

  constructor(public navCtrl: NavController, public fb: FormBuilder, public loadingCtrl: LoadingController, public alertCtrl: AlertController, public authProvider: AuthProvider) {
    this.registerForm = this.fb.group({
      fname: ['', Validators.required],
      lname: ['', Validators.required],
      email: ['', Validators.compose([Validators.required, Validators.email])],
      password: ['', Validators.required]
    })
  }

  registerSubmitForm() {
    if(!this.registerForm.valid){
      console.log(this.registerForm.value);
    } else {
      this.authProvider.signUpUser(this.registerForm.value.email, this.registerForm.value.password, this.registerForm.value.fname, this.registerForm.value.lname)
        .then(authData => {
          this.loading.dismiss().then(() => {
            this.navCtrl.setRoot('TodoListPage')
          }, error => {
            let alert = this.alertCtrl.create({
              message: error.message,
              buttons: [
                {
                  text: 'ok',
                  role: 'cancel'
                }
              ]
            });
            alert.present();
          });
        });
    }
    this.loading = this.loadingCtrl.create();
    this.loading.present();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CreateAccountPage');
  }

}
