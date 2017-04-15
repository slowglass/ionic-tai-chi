import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';


@Component({
  template: `
  <ion-header>
    <ion-navbar>
      <ion-title>Tabs</ion-title>
    </ion-navbar>
  </ion-header>
  <ion-content>{{text}}</ion-content>
  `
})
export class TabContentPage {
  public text = "TEXT";
  constructor(text: string) {
    this.text = text;
  }

  setText(t) { this.text=t;}
}


/*
  Generated class for the SwimmingDragon page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-swimming-dragon',
  templateUrl: 'swimming-dragon.html'
})
export class SwimmingDragonPage {

  public tab1 = new TabContentPage("TAB1");
  public tab2 = new TabContentPage("TAB2");
  public tab3 = new TabContentPage("TAB3");
  public tab4 = new TabContentPage("TAB4");
  public tab1Root = this.tab1;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SwimmingDragonPage');
  }

}
