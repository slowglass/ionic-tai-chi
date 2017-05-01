import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';
import { TimersPage } from '../timers/timers';
import { FormsPage } from '../forms/forms';
import { SwimmingDragonPage } from '../swimming-dragon/swimming-dragon';
import { NotebookPage } from '../notebook/notebook';
import { AboutPage } from '../about/about';

import { Dialogs } from '@ionic-native/dialogs';
import { Dropbox } from '../../providers/dropbox';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  styles: ['.strikethrough { text-decoration: line-through;}']
})


export class HomePage {
  private cards:Array<{name:string, index: number, page:any}> = [];
  formsPage: any = FormsPage;
  sdPage: any = SwimmingDragonPage;
  notebookPage: any = NotebookPage;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public dropbox: Dropbox,
    public loadingCtrl: LoadingController,
    private dialogs: Dialogs) {
      this.cards.push({name:"Timers",          index:0, page: TimersPage });
      this.cards.push({name:"Forms",           index:1, page: FormsPage });
      this.cards.push({name:"Swimming Dragon", index:2, page: SwimmingDragonPage });
      this.cards.push({name:"Notebook",        index:3, page: NotebookPage });
      this.cards.push({name:"About",           index:4, page: AboutPage });
     }

  getLogo(idx): string {
    return "assets/img/stance" +
      (idx % 8).toString() +
      ".png";
  }

  openPage(p) {
    this.navCtrl.push(p);
  }

}
