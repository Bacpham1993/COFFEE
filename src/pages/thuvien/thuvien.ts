import { Component } from '@angular/core';
import { NavController, Events } from 'ionic-angular';
import {Http} from '@angular/http';
import { ThCNPage } from '../th-cn/th-cn';
@Component({
  selector: 'thuvien',
  templateUrl: 'thuvien.html'
})
export class thuvien {
  imagelist: any;
  URL: string = "http://works.medicafe.vn/bin/";
  callback: string = "";
  // file thuvien.php allow = gia cung duoc
  constructor(public navCtrl: NavController, public http: Http, public events: Events) {
    this.taianh();
  }
  taianh() {
      this.http.get(this.URL+"thuvien.php?allow=1").map(res => res.json()).subscribe(data3 => {
      this.imagelist=data3;
    })
  }
  chonanh(url) {
    this.events.publish("anh:dachon", url);
	this.navCtrl.pop();
  }
}
