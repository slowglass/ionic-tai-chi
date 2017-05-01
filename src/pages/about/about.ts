import { Component } from '@angular/core';
import { LoadingController } from 'ionic-angular';
import { AppVersion } from '@ionic-native/app-version';
import { SoundPlayer } from '../../providers/sound-player'
import { Dropbox } from '../../providers/dropbox'
@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {
  private versionNumber = "Unknown";
  private versionCode = "Unknown";
  private packageName = "Unknown";
  private appName = "ionic-tai-chi";
  private soundSystem = "Generic Sound Player";
  private storageType = "Ionic Web Storage";
  private dropboxInfo = { type: "", user: "" };
  constructor(
    private loadingCtrl: LoadingController,
    private dropbox: Dropbox,
    appVersion: AppVersion,
    soundPlayer: SoundPlayer
  ) {
    this.soundSystem = soundPlayer.desc();
    if (appVersion != null) {
      appVersion.getVersionNumber().then((val) => { this.versionNumber = val; }).catch((err) => { });
      appVersion.getVersionCode().then((val) => { this.versionCode = val; }).catch((err) => { });
      appVersion.getPackageName().then((val) => { this.packageName = val; }).catch((err) => { });
      appVersion.getAppName().then((val) => { this.appName = val; }).catch((err) => { });
    }
  }

  dropboxLogin() {
    if (this.dropbox.isLoggedIn()) return;

    let loading = this.loadingCtrl.create({ content: 'Syncing from Dropbox...' });
    this.dropbox.login().then(
      (success) => { loading.dismiss(); },
      (err) => { });
  }

  updateDropboxInfo() {
    if (this.dropbox.isLoggedIn()) {
      this.storageType = "Ionic Web Storage + Dropbox";
      this.dropboxInfo.type = this.dropbox.desc;
      this.dropbox.getUserInfo().subscribe(
        (data) => { this.dropboxInfo.user = "(" + data + ")"; },
        (err) => { console.log(err); }
      );
    } else {
      this.dropboxInfo.type = "";
      this.dropboxInfo.user = "Not logged in";
    }
  }

  ionViewDidEnter() {
    this.dropboxLogin();;
    this.updateDropboxInfo()
  }

}
