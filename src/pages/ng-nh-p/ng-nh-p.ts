import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {Http} from '@angular/http';
import { QuNLCOFFEEPage } from '../qu-nlcoffee/qu-nlcoffee';
import { AlertController } from 'ionic-angular';
import { Events } from 'ionic-angular';
import { AuthService } from '../../providers/auth-service/auth-service';
@Component({
  selector: 'page-ng-nh-p',
  templateUrl: 'ng-nh-p.html'
})

export class NgNhPPage {
  logindata=[{}];
  URL: string = "http://works.medicafe.vn/bin/";

  constructor(public navCtrl: NavController, public http: Http,private alertCtrl: AlertController,public events: Events, private _auth: AuthService) {

  }
  signInWithFacebook(): void {
    this._auth.signInWithFacebook()
      .then(() => this.onSignInSuccess());
  }
    private onSignInSuccess(): void {
    console.log("Facebook display name " + this._auth.displayName()["displayName"]);
		this.events.publish('username',this._auth.displayName()["displayName"],this._auth.displayName()["photoURL"]);
		sessionStorage.setItem('username',this._auth.displayName()["displayName"]);
        this.navCtrl.setRoot(QuNLCOFFEEPage);

  }
login(logindata){

  if(logindata.us || logindata.pw){
  this.http.get(this.URL+'login.php?username='+logindata.us+'&password='+logindata.pw).map(res => res.json()).subscribe(data => {
      if(data["0"].dem==1){
        this.events.publish('username',logindata.us);
		sessionStorage.setItem('username',logindata.us);
		//sessionStorage.getItem('sss');
        this.navCtrl.setRoot(QuNLCOFFEEPage);
      }
      else{
        let alert = this.alertCtrl.create({
          title: 'Lỗi đăng nhập',
          subTitle: 'Sai thông tin đăng nhập',
          buttons: ['OK']
        });
        alert.present();
      }
})}else{
       let alert = this.alertCtrl.create({
          title: 'Lỗi đăng nhập',
          subTitle: 'Thiếu thông tin đăng nhập',
          buttons: ['OK']
        });
        alert.present();
} }
}




