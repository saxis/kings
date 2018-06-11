import { Component } from '@angular/core';
import { NavController, IonicPage } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController, public auth: AuthProvider) {

  }

  githubLogin():void {
    this.auth.loginWithGithub().then((currentUser) => {
      this.navCtrl.setRoot('TodoListPage');
    });
  }

  signupUsers(): void {
    this.navCtrl.push('CreateAccountPage');
  }

  login(): void {
    this.navCtrl.push('LoginPage');
  }

}
