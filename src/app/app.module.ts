import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import {ChartsModule} from 'ng2-charts';
import 'chart.js';
import { ScreenOrientation } from '@ionic-native/screen-orientation';
import { QuNLCOFFEEPage } from '../pages/qu-nlcoffee/qu-nlcoffee';
import { TIKhoNPage } from '../pages/t-ikho-n/t-ikho-n';
import { bancf } from '../pages/bancf/bancf';
import { suaxoa } from '../pages/suaxoa/suaxoa';
import { ThCNPage } from '../pages/th-cn/th-cn';
import { ThNgKPage } from '../pages/th-ng-k/th-ng-k';
import { NgNhPPage } from '../pages/ng-nh-p/ng-nh-p';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Facebook } from '@ionic-native/facebook';
import { HttpModule } from '@angular/http';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule, AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { AngularFireAuthModule, AngularFireAuth } from 'angularfire2/auth';
import { HelloIonicPage } from '../pages/hello-ionic/hello-ionic';
import { thuvien } from '../pages/thuvien/thuvien';
import { nhabep } from '../pages/nhabep/nhabep';
import { tknhanvien } from '../pages/tknhanvien/tknhanvien';
import { AuthService } from '../providers/auth-service/auth-service';


export const config = {
    apiKey: "AIzaSyDgTfmjtPHSlTH60fTMBRJVosZ_0frCQY0",
    authDomain: "coffee-app-4a3fd.firebaseapp.com",
    databaseURL: "https://coffee-app-4a3fd.firebaseio.com",
    projectId: "coffee-app-4a3fd",
    storageBucket: "coffee-app-4a3fd.appspot.com",
    messagingSenderId: "146151520117"
  };
  
@NgModule({
  declarations: [
    MyApp,
    QuNLCOFFEEPage,
    TIKhoNPage,
    ThCNPage,
    ThNgKPage,
    NgNhPPage,
    bancf,
    suaxoa,
  	HelloIonicPage,
  	thuvien,
    nhabep,
    tknhanvien
  ],
  imports: [
    BrowserModule,
         HttpModule,
		 ChartsModule,
		 AngularFireDatabaseModule,
		 AngularFireAuthModule,
		AngularFireModule.initializeApp(config),
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    QuNLCOFFEEPage,
    TIKhoNPage,
    ThCNPage,
    ThNgKPage,
    NgNhPPage,
    bancf,
    suaxoa,
  	nhabep,
  	thuvien,
    HelloIonicPage,
    tknhanvien
  ],
  providers: [
    StatusBar,
    SplashScreen,
	ScreenOrientation,
	Facebook,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthService
	
	
  ]
})
export class AppModule {}