import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';
import { NotesPage } from '../notes/notes';
import { Dialogs } from '@ionic-native/dialogs';
import { Dropbox } from '../../providers/dropbox';

@Component({
  selector: 'page-notebook',
  templateUrl: 'notebook.html'
})

export class NotebookPage {
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public dropbox: Dropbox,
    public loadingCtrl: LoadingController,
    private dialogs: Dialogs) { }

  depth: number = 0;
  files: Array<any>;

  ionViewDidLoad() {
    this.files = [];
  }

  dropboxLogin() {
      if (this.dropbox.isLoggedIn()) return;

      let loading = this.loadingCtrl.create({ content: 'Syncing from Dropbox...' });
      this.dropbox.login().then(
        (success) => { 
          loading.dismiss(); 
          console.log('Logged in'); 
          this.openFolder("");
        },
        (err) => {
          this.dialogs.alert('Hello world')
            .then(() => loading.dismiss())
            .catch(e => console.log('Error displaying dialog', e));
        });
  }

  ionViewDidEnter() {
      this.dropboxLogin();
  }

  openFolder(path) {
    let loading = this.loadingCtrl.create({
      content: 'Syncing from Dropbox...'
    });

    loading.present(loading);
    this.dropbox.getFolders(path).subscribe(
      (data) => {
        this.files = data.entries;
        this.depth++;
        loading.dismiss();
      }, 
      (err) => { 
        loading.dismiss();
        console.log(err); 
      }
    );
  }

  openFile(idx) {
    let file = this.files[idx];
    console.log("File Info:"+JSON.stringify(file));
    this.navCtrl.push(NotesPage, { note: file.path_lower });
  }

  goBack() {
    let loading = this.loadingCtrl.create({
      content: 'Syncing from Dropbox...'
    });

    loading.present(loading);

    this.dropbox.goBackFolder().subscribe(data => {
      this.files = data.entries;
      this.depth--;
      loading.dismiss();
    }, err => {
      console.log(err);
    });

  }
}
