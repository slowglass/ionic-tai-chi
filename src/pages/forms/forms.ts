import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Forms } from '../../providers/forms'
/*
  Generated class for the Forms page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-forms',
  templateUrl: 'forms.html'
})
export class FormsPage {

  constructor(
      public navCtrl: NavController,
      public navParams: NavParams,
      public forms: Forms) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad FormsPage');
  }

}
