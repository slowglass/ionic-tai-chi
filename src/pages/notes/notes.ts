import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';
import { Dialogs } from '@ionic-native/dialogs';
import { Dropbox } from '../../providers/dropbox';

declare var micromarkdown:any;

@Component({
  selector: 'page-notes',
  templateUrl: 'notes.html'
})
export class NotesPage {
  private showMarkdown:boolean = true;
  private text:string = "Need to load";
  private md:string;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public dropbox: Dropbox,
    public loadingCtrl: LoadingController,
    private dialogs: Dialogs) {}

    
  ionViewWillEnter() {
    this.text = "Need to load";
  }

  ionViewDidEnter() {
      let note  = this.navParams.get('note');
      let loading = this.loadingCtrl.create({ content: 'Syncing from Dropbox...' });
      this.dropbox.login().then(
        (success) => { 
          loading.dismiss(); 
          console.log('Logged in'); 
          this.open(note);
        },
        (err) => {
          this.dialogs.alert('Hello world')
            .then(() => loading.dismiss())
            .catch(e => console.log('Error displaying dialog', e));
        });
      
  }
  
  edit(flag) { this.showMarkdown = !flag; }

  open(path) {
    let loading = this.loadingCtrl.create({ content: 'Syncing from Dropbox...' });

    loading.present(loading);
    
    this.dropbox.getFile(path).subscribe(
      (data) => {
        this.text = data;
        this.md = micromarkdown.parse(data);
        loading.dismiss();
      }, 
      (err) => { console.log(err); }
    );
  }


}
