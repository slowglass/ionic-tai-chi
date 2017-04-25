import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { TimersPage } from '../timers/timers';

/*
  Generated class for the Home page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  styles: ['.strikethrough { text-decoration: line-through;}']
})
export class HomePage {

  timersPage: any = TimersPage;

  constructor(public navCtrl: NavController, public navParams: NavParams) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad HomePage');
  }

  getLogo(idx) : string { 
    return "assets/img/stance" +
      (idx%8).toString() +
      ".png";
    }

  openPage(p) {
      this.navCtrl.push(p);
  }
}
