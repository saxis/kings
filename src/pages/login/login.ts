import { Component } from '@angular/core';
import { IonicPage, NavController, Loading, LoadingController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import firebase from 'firebase';
import { AuthProvider } from '../../providers/auth/auth';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  private loginForm: FormGroup;

  constructor(public navCtrl: NavController, private fB: FormBuilder, public loadingCtrl: LoadingController, private as: AuthProvider) {
    this.loginForm = this.fB.group({
      email: ['', Validators.compose([Validators.required, Validators.email])],
      password: ['', Validators.required]
    })
  }

  async loginSubmitForm(): Promise<void> {
    if(!this.loginForm.valid){
      console.log(this.loginForm.value);
    } else {
      const loading:Loading = this.loadingCtrl.create();
      loading.present();
      try {
        const loginUser:firebase.User = await this.as.loginUser(this.loginForm.value.email, this.loginForm.value.password)
        console.log('loginUser ' + loginUser);
        await loading.dismiss();
        this.navCtrl.setRoot('TodoListPage');
      } catch(error) {
        await loading.dismiss();
        console.log('error ' + error);
      }
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

}
