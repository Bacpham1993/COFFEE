import { Component, ViewChild } from '@angular/core';
import { Platform, Nav,MenuController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { ScreenOrientation } from '@ionic-native/screen-orientation';
import { QuNLCOFFEEPage } from '../pages/qu-nlcoffee/qu-nlcoffee';
import { TIKhoNPage } from '../pages/t-ikho-n/t-ikho-n';
import { ThCNPage } from '../pages/th-cn/th-cn';
import { ThNgKPage } from '../pages/th-ng-k/th-ng-k';
import { HelloIonicPage } from '../pages/hello-ionic/hello-ionic';

import { Events } from 'ionic-angular';
import { nhabep } from '../pages/nhabep/nhabep';
import { tknhanvien } from '../pages/tknhanvien/tknhanvien';


import { NgNhPPage } from '../pages/ng-nh-p/ng-nh-p';


import 'rxjs/add/operator/map';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) navCtrl: Nav;
    rootPage:any = NgNhPPage;
    username:any;
	photoS:any;
  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen,public events: Events,public menu: MenuController,private screenOrientation: ScreenOrientation) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
	  //console.log(this.screenOrientation.type);
	// screenOrientation.lock('landscape');
	    this.menu.swipeEnable(false);
      events.subscribe('username', (username,photoURL)=>{
          this.username=username;
		  this.photoS = photoURL;
		   this.menu.swipeEnable(true);
      });
    });
  }
  
  goToQuNLCOFFEE(params){
    if (!params) params = {};
    this.navCtrl.setRoot(QuNLCOFFEEPage);
  }goToTIKhoN(params){
    if (!params) params = {};
    this.navCtrl.setRoot(TIKhoNPage);
  }goToThCN(params){
    if (!params) params = {};
    this.navCtrl.setRoot(ThCNPage);
  }goToThNgK(params){
    if (!params) params = {};
    this.navCtrl.setRoot(ThNgKPage);
  }
  gotoTK(params){
	  if (!params) params = {};
    this.navCtrl.setRoot(HelloIonicPage);
  }
  gotoNB(params){
	  if (!params) params = {};
    this.navCtrl.setRoot(nhabep);
  }
  gotoNV(params){
	  if (!params) params = {};
    this.navCtrl.setRoot(tknhanvien);
  }
  logout(){
    this.menu.close();
	this.navCtrl.setRoot(NgNhPPage); 
	  this.menu.swipeEnable(false); 
    
  }
}
