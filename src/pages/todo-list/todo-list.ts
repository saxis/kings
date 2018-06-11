import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DataProvider } from '../../providers/data/data';
import { AuthProvider } from '../../providers/auth/auth';


@IonicPage()
@Component({
  selector: 'page-todo-list',
  templateUrl: 'todo-list.html',
})
export class TodoListPage {
  listItems = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, public ds: DataProvider, public as: AuthProvider) {
    this.listItems = this.ds.lists;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TodoListPage');
  }

  logout(): void {
    this.as.logoutUser()
    .then(isLoggedOut => {
      this.navCtrl.setRoot('HomePage');
    }).catch((error:any) => {
      console.log(error)
    })
  }

}
