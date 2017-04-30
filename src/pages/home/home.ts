import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';
import { TimersPage } from '../timers/timers';
import { FormsPage } from '../forms/forms';
import { SwimmingDragonPage } from '../swimming-dragon/swimming-dragon';

import { Dropbox } from '../../providers/dropbox';
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
  formsPage: any = FormsPage;
  sdPage: any = SwimmingDragonPage;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public dropbox: Dropbox,
    public loadingCtrl: LoadingController) { }

  getLogo(idx): string {
    return "assets/img/stance" +
      (idx % 8).toString() +
      ".png";
  }

  openPage(p) {
    this.navCtrl.push(p);
  }

  /**
   * TEST CODE
   */

  depth: number = 0;
  folders: any;

  ionViewDidLoad() {
    this.folders = [];
 
    let loading = this.loadingCtrl.create({
      content: 'Syncing from Dropbox...'
    });
 
    loading.present();
 
    this.dropbox.getFolders().subscribe(data => {
      this.folders = data.entries;
      loading.dismiss();
    }, (err) => {
      console.log(err);
    });
  }

  ionViewDidEnter(){
    let loading = this.loadingCtrl.create({
      content: 'Syncing from Dropbox...'
    });
  
    loading.present();
  
    this.dropbox.getFolders().subscribe(data => {
      this.folders = data.entries;
      loading.dismiss();
    }, (err) => {
      console.log(err);
    });
  }

  openFolder(path) {

    let loading = this.loadingCtrl.create({
      content: 'Syncing from Dropbox...'
    });

    loading.present(loading);

    this.dropbox.getFolders(path).subscribe(data => {
      this.folders = data.entries;
      this.depth++;
      loading.dismiss();
    }, err => {
      console.log(err);
    });

  }


  goBack() {
    let loading = this.loadingCtrl.create({
      content: 'Syncing from Dropbox...'
    });

    loading.present(loading);

    this.dropbox.goBackFolder().subscribe(data => {
      this.folders = data.entries;
      this.depth--;
      loading.dismiss();
    }, err => {
      console.log(err);
    });

  }
}
