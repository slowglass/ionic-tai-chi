import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';
import { NotesPage } from '../notes/notes';
import { Dialogs } from '@ionic-native/dialogs';
import { Dropbox } from '../../providers/dropbox';

import { NoteReferenceStore } from '../../providers/notes/notebook';

@Component({
  selector: 'page-notebook',
  templateUrl: 'notebook.html'
})

export class NotebookPage {
  constructor(
    private noteReferenceStore: NoteReferenceStore,
    public navCtrl: NavController,
    public navParams: NavParams,
    public dropbox: Dropbox,
    public loadingCtrl: LoadingController,
    private dialogs: Dialogs) { }

  files: Array<any>;

  ionViewDidLoad() {
    this.files = [];
    this.noteReferenceStore.readFromLocalStore(
      () => {
        console.log("Step4a");
        let l = this.noteReferenceStore.getNotes("");
        console.log("Path(/):" + JSON.stringify(l));
        l = this.noteReferenceStore.getNotes("/work");
        console.log("Path(/work):" + JSON.stringify(l));
      }
    );
  }

  dropboxLogin(notebook) {
      if (this.dropbox.isLoggedIn()) 
        this.readFolderData(notebook);

      let loading = this.loadingCtrl.create({ content: 'Syncing from Dropbox...' });
      this.dropbox.login().then(
        (success) => { 
          loading.dismiss(); 
          console.log('Logged in'); 
          this.readFolderData(notebook);
        },
        (err) => {  });
  }

  ionViewDidEnter() {
      let notebook = this.navParams.get('notebook');
      this.dropboxLogin(notebook);
  }

  openFolder(path) {
    this.navCtrl.push(NotebookPage, {notebook: path});
  }

  readFolderData(path) {
    let loading = this.loadingCtrl.create({
      content: 'Syncing from Dropbox...'
    });

    loading.present(loading);
    this.dropbox.getFolders(path).subscribe(
      (data) => {
        this.files = data.entries;
        loading.dismiss();
      }, 
      (err) => { loading.dismiss(); }
    );
  }

  openFile(idx) {
    let file = this.files[idx];
    console.log("File Info:"+JSON.stringify(file));
    this.navCtrl.push(NotesPage, { note: file.path_lower });
  }

}
