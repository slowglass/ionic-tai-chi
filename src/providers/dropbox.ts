import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { Storage } from '@ionic/storage';
import { Device } from '@ionic-native/device';
import 'rxjs/add/operator/map';

@Injectable()
export class Dropbox {

  loggedIn: boolean = false;
  private accessToken: any;
  private folderHistory: any = [];
  private appKey: any;
  private redirectURI: any;
  private url: any;
  private _desc:string = "Not logged in";

  constructor(
    public http: Http,
    device: Device, 
    private storage: Storage,
    private inAppBrowser: InAppBrowser) {

    if (device == null || device.uuid==null)
    {
      this._desc="Personal Login Key";
      this.accessToken = '3wsLXh8GbvUAAAAAAAArcofYIsuHOAVC4JFTpc1b8poeDws0PhBZUAKiSTR91SMU';
    } else { 
      this.storage.get('dropboxCreds').then(
      (storedData) => {
        if (storedData) {
          this.accessToken = storedData;
        } else {
          this.accessToken
        }
      });
    }
    //OAuth
    this.appKey = 'jevv2sy0efjndu1';
    this.redirectURI = 'http://localhost';
    this.url = 'https://www.dropbox.com/1/oauth2/authorize?client_id=' + this.appKey + '&redirect_uri=' + this.redirectURI + '&response_type=token';

  }

  isLoggedIn():boolean { return this.loggedIn; }
  get desc() { return this._desc; }
  login() {
    return new Promise((resolve, reject) => {
      if (this.accessToken != null) {
        this.loggedIn = true;
        this._desc="Dropbox Login";
        resolve(this.accessToken);
        return;
      }
      let browser = this.inAppBrowser.create(this.url, 'location=no,toolbar=no');
      let listener = browser.on('loadstart').subscribe((event: any) => {
  
        //Ignore the dropbox authorize screen
        if(event.url.indexOf('oauth2/authorize') > -1) {
          return;
        }
  
        //Check the redirect uri
        if(event.url.indexOf(this.redirectURI) > -1 ){
          console.log("Login redirectURI: '"+event.url+"'");
          listener.unsubscribe();
          browser.close();
          let token = event.url.split('=')[1].split('&')[0];
          this.accessToken = token;
          this.storage.set('dropboxCreds', token);
          this.loggedIn = true;
          resolve(event.url);
        } else {
          reject("Could not authenticate");
        }
  
      });
  
    });
  
  }

  getUserInfo() {
    let headers = new Headers();

    headers.append('Authorization', 'Bearer ' + this.accessToken);
    headers.append('Content-Type', 'application/json');

    return this.http.post('https://api.dropboxapi.com/2/users/get_current_account', "null", { headers: headers })
      .map(res => res.json().name.display_name);
  }

  getFile(path) {
     let headers = new Headers();

    headers.append('Authorization', 'Bearer ' + this.accessToken);
    headers.append('Content-Type', ' ');
    headers.append('Dropbox-API-Arg', '{"path":"'+path+'"}');

    return this.http.post("https://content.dropboxapi.com/2/files/download", "", { headers: headers }).map( res => res.text());
  }
  
  getFolders(path?) {

    let headers = new Headers();

    headers.append('Authorization', 'Bearer ' + this.accessToken);
    headers.append('Content-Type', 'application/json');

    let folderPath;

    if (typeof (path) == "undefined" || !path) {

      folderPath = {
        path: ""
      };

    } else {

      folderPath = {
        path: path
      };

      if (this.folderHistory[this.folderHistory.length - 1] != path) {
        this.folderHistory.push(path);
      }

    }

    return this.http.post('https://api.dropboxapi.com/2/files/list_folder', JSON.stringify(folderPath), { headers: headers })
      .map(res => res.json());

  }

  goBackFolder() {

    if (this.folderHistory.length > 0) {

      this.folderHistory.pop();
      let path = this.folderHistory[this.folderHistory.length - 1];

      return this.getFolders(path);
    }
    else {
      return this.getFolders();

    }
  }


}
