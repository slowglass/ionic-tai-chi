import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';
import { Dialogs } from '@ionic-native/dialogs';
import { Dropbox } from '../../providers/dropbox';
import { AlertController } from 'ionic-angular';

declare var micromarkdown: any;

@Component({
  selector: 'page-notes',
  templateUrl: 'notes.html'
})
export class NotesPage {
  private showMarkdown: boolean = true;
  private original: string = "";
  private text: string = "";
  private md: string;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public dropbox: Dropbox,
    public loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
    private dialogs: Dialogs) { }


  dropboxLogin(path) {
    if (this.dropbox.isLoggedIn())
      this.open(path);

    let loading = this.loadingCtrl.create({ content: 'Syncing from Dropbox...' });
    this.dropbox.login().then(
      (success) => {
        loading.dismiss();
        this.open(path);
      },
      (err) => { });
  }

  ionViewWillEnter() {
    this.original = "";
    this.text = "";
    this.md = "";
  }

  ionViewDidEnter() {
    let note = this.navParams.get('note');
    this.dropboxLogin(note);
  }

  ionViewCanLeave() {
    return new Promise(
      (resolve: Function, reject: Function) => {
        // No need to ask to save
        if (this.showMarkdown || this.original === this.text) { resolve(); return; }
        let alert = this.alertCtrl.create({
          title: 'Log out',
          message: 'Document changed. Do you wish to save?',
          buttons: [
            { text: 'No', role: 'cancel', handler: () => { resolve(); } },
            { text: 'Yes', handler: () => { resolve(); } }
          ]
        });
        alert.present();
      });
  }

  save() {
    this.original = this.text;
    this.md = micromarkdown.parse(this.text);
    this.showMarkdown = true;
  }

  edit() {
    this.showMarkdown = false;
  }

  open(path) {
    let loading = this.loadingCtrl.create({ content: 'Syncing from Dropbox...' });

    loading.present(loading);

    this.dropbox.getFile(path).subscribe(
      (data) => {
        this.text = data;
        this.original = data;
        this.md = micromarkdown.parse(data);
        loading.dismiss();
      },
      (err) => { console.log(err); }
    );
  }



}
