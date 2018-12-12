import { Component} from '@angular/core';
import { NavController,ModalController, ViewController,NavParams,Events,LoadingController,AlertController } from 'ionic-angular';
import {Http} from '@angular/http';
import { suaxoa } from '../suaxoa/suaxoa';
//import {AngularFireModule} from 'angularfire2';
import {FirebaseListObservable,AngularFireDatabase} from 'angularfire2/database'
@Component({
  selector: 'page-bancf',
  templateUrl: 'bancf.html'
})
export class bancf {

list: string = "drinks";
listdrinks:any[];
tenban:any;
i:number=0;
x:number=0;
sl:number=0;
tt:boolean;
tong:number=0;
soluong:number=0;
listdrunks:any[];
solieu:any;
vcl:any;
URL: string = "http://works.medicafe.vn/bin/";
hienban: FirebaseListObservable<any>;

  constructor(private alertCtrl: AlertController,public loadingCtrl: LoadingController,public event:Events,public navCtrl: NavController,public http: Http,public modalCtrl: ModalController,public viewCtrl: ViewController,params: NavParams, private db : AngularFireDatabase ) {
    this.tenban=params.get('ban');
	this.tong=0;
	
			//this.tong = this.tong +  parseInt(this.listdrinks[i].sl)*parseInt(this.listdrinks[i].gia); 
			
			
		
	//	console.log(this.tong);
	//this.hienban = this.db.list('/banct');
	   this.hienban = this.db.list('/banct',{
		   query:{
			     orderByChild: 'maban',
				equalTo: this.tenban 
		   }
	   });
this.displaydu();
	 

	/*
    this.http.get(this.URL+'getdetailtable.php?ID=lan&ID1='+this.tenban).map(res => res.json()).subscribe(data => {
     if(data.length==0){
        this.x=0;
        this.tt=false;
      }
      else{
        this.x=data[0].lan;
        this.tt=data[0].thanhtoan;

        if(this.tt==true){
         this.x++;
         }
      }
          console.log(this.x);
      this.displaydu(this.tenban,this.x);
    });
    this.event.subscribe('data1',data=>{
      
      this.displaydu(this.tenban,this.x);
    })
	*/

}

  displaydu(){
	  	   this.db.list('/banct',{
		   query:{
			     orderByChild: 'maban',
				equalTo: this.tenban 
		   }
	   }).subscribe(dt => {
		this.vcl = dt.length;
		  if(dt.length == 0){ this.tong = 0;}
		  
		  for(var i=0; i<dt.length; i++){
			  this.tong =this.tong +  dt[i].sl*dt[i].gia;
		  }
			  
		  })
	   
	   
	   }
	  
/*
    this.tong=0;
    if(this.tt==false){
      console.log(this.x);
      this.http.get(this.URL+'getdetailtable.php?HD=HD&ID='+tenban+'&Lan='+lan).map(res => res.json()).subscribe(data => {
           // for(this.i=0;this.i<data.length;this.i++){
           // this.listdrunks.push({'ten':data[this.i].douong,'SL':data[this.i].SL});
            //this.tong+=data[this.i].SL*data[this.i].dongia;
          // this.soluong=this.soluong+parseInt(data[this.i].SL);
          //  }
         // console.log(data);
            this.listdrunks=data;
            for(this.sl=0;this.sl<data.length;this.sl++)
            {
                this.tong+=data[this.sl].SL*data[this.sl].dongia;
                        } 
          // console.log(data);
            //console.log(this.URL+'getdetailtable.php?HD=HD&ID='+tenban+'&Lan='+lan);
        });
  }
  else{
   
  }
}
 
  loading() {
  let loading = this.loadingCtrl.create({
    content: 'Please wait...'
  });

  loading.present();

  setTimeout(() => {
    loading.dismiss();
  }, 500);
  */

them(key,sls){
	this.tong = 0;
	console.log(key);
	this.hienban.update(key,{
		sl: sls +1
	})
//this.tong = this.tong + (sls+1)*dgia;
	/*
var z=parseInt(SL);
z++;
  this.http.get(this.URL+'addtable.php?HD=2&ID='+tenban+'&Lan='+this.x+'&SL='+z+'&Douong='+tendu).map(res => res.json()).subscribe(data1 => {
    this.event.publish('data1','deodc'); 
  })
  */
}
bot(key,sls){
	//this.hienban.update(key,{
		//sl: sls-1
	//});
//this.tong = this.tong - sls*dgia;
	this.tong = 0;

	this.hienban.remove(key);
	


	
/* 
 var z=parseInt(SL);
  z--;
  if(z==0){
  this.http.get(this.URL+'addtable.php?HD=3&ID='+tenban+'&Lan='+this.x+'&Douong='+tendu).map(res => res.json()).subscribe(data => {})
this.event.publish('data1','deodc'); 
}
else{
  this.http.get(this.URL+'addtable.php?HD=2&ID='+tenban+'&Lan='+this.x+'&SL='+z+'&Douong='+tendu).map(res => res.json()).subscribe(data1 => {})
this.event.publish('data1','deodc'); 
}
*/
}/*
  thanhtoan(tenban){
   
    let alert = this.alertCtrl.create({
    title: 'Thanh toán',
    message: 'Bạn muốn thanh toán ?',
    buttons: [
      {
        text: 'Không',
        role: 'cancel',
        handler: () => {

        }
      },
      {
        text: 'OK',
        handler: () => {
            this.http.get(this.URL+'getdetailtable.php?HD=TT&ID='+tenban+'&Lan='+this.x).map(res => res.json()).subscribe(data => {})
             this.listdrunks=null;
            this.x++; 
            this.tong=0; 

            }
      }
    ]
  });
  alert.present();
  }
  */

   
  openmodal(tenban){
   let contactModal = this.modalCtrl.create(suaxoa,{tenban:tenban,lan:this.x});
   contactModal.present();
  
   }

  closemodal(){
   this.viewCtrl.dismiss();
    }
}
