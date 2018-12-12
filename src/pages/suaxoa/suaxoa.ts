import { Component} from '@angular/core';
import { NavController,ModalController, ViewController,NavParams,Events,LoadingController,AlertController } from 'ionic-angular';
import {Http} from '@angular/http';
//import {AngularFire, FirebaseListObservable} from 'angularfire2';
import {FirebaseListObservable,AngularFireDatabase} from 'angularfire2/database'



@Component({
  selector: 'page-suaxoa',
  templateUrl: 'suaxoa.html'
})

export class suaxoa {
  listdrinks:any;
  tenban:any;
  lan:any;
  SL:string="0";
  URL: string = "http://works.medicafe.vn/bin/";
  banchitiet: FirebaseListObservable<any>;


  constructor(private alertCtrl: AlertController,public loadingCtrl: LoadingController,public event:Events,public navCtrl: NavController,public http: Http,public modalCtrl: ModalController,public viewCtrl: ViewController,params: NavParams, private db: AngularFireDatabase) {
       this.hienthidu();
       this.tenban=params.get('tenban');
       this.lan=params.get('lan');
       console.log(this.lan);
	   this.banchitiet = this.db.list('/banct');
}

  closemodal(){
   this.viewCtrl.dismiss();
    }
    hienthidu()
    {
       this.http.get(this.URL+'getdrinks.php?ID=1').map(res => res.json()).subscribe(data1 => {
       this.listdrinks=data1;
     })
    }
   them(ten,dongia,nhom){
	   var d= new Date();
	 var s =  d.toLocaleDateString()+ " " +  d.toLocaleTimeString();
	   this.banchitiet.push({
		  maban: this.tenban,
		  tenmon: ten,
		  gia: dongia,
			sl:1,
			ngaynhap: s,
			nguoinhap: 'admin',
			ngaytt: s,
			nhommon: nhom
			
			
	   });
	   
	   
	   
    /*this.http.get(this.URL+'count.php?ID='+this.tenban+'&douong='+ten+'&lan='+this.lan).map(res => res.json()).subscribe(data1 => {
     if(data1.length==0){
       this.SL="1";
     }
     else{
       this.SL=data1[0].SL;
     }
    let alert = this.alertCtrl.create({
    title: ten,
    inputs: [
      {
        name: 'SL',
        placeholder: this.SL
      },
    ],
    buttons: [
      {
        text: 'Thoát',
        role: 'cancel',
        handler: data => {

        }
      },
      {
        text: 'OK',
        handler: data => {
          if(data.SL==""){
            this.http.get(this.URL+'getdetailtable.php?HD=Them&ID='+this.tenban+'&Douong='+ten+'&SL=1'+'&Lan='+this.lan+'&Dongia='+dongia).map(res => res.json()).subscribe(data1 => {});
            this.event.publish('data1','deodc');
        }
          else{
            this.http.get(this.URL+'getdetailtable.php?HD=Them&ID='+this.tenban+'&Douong='+ten+'&SL='+data.SL+'&Lan='+this.lan+'&Dongia='+dongia).map(res => res.json()).subscribe(data1 => {});
            this.event.publish('data1','deodc');
         //   console.log(this.URL+'getdetailtable.php?HD=Them&ID='+this.tenban+'&Douong='+ten+'&SL='+data.SL+'&Lan='+this.lan+'&Dongia='+dongia);
          }

        }
      }
    ]
  });
  alert.present();
    })
	*/
   }
}



