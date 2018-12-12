import { Component,ViewChild} from '@angular/core';
import {Platform, ActionSheetController,NavParams,NavController,Events,ModalController,Slides} from 'ionic-angular';
import { Http } from '@angular/http';
//import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { ThNgKPage } from '../th-ng-k/th-ng-k';





@Component({
  selector: 'page-hello-ionic',
  templateUrl: 'hello-ionic.html',

})


export class HelloIonicPage {
@ViewChild(Slides) slides: Slides;

tongthu:any;
tongchi:any;
hehe:any;
sautru:any;
pushPage:any;
ngaynhap:any;
tongngay:number;
hic:any;
today:any;
emptys:any;
ThangNam:any;
slideMonth:any;
URL: string = "http://works.medicafe.vn/";
listtable:any[];
k:number;



  constructor(public platform:Platform,public actionSheetCtrl: ActionSheetController,public param: NavParams, public http: Http,public nav: NavController,public ev:Events,public modalCtrl: ModalController) {
     //this.URL = "http://works.medicafe.vn/";
	 
	 var todays= new Date();
			this.today = todays.toLocaleDateString();

//get ngaynhap
this.getNgayNhap();
//get dulieu
//this.getDuLieu();
			this.ev.subscribe('UpdateThu', data =>{
				this.emptys=1;
				//this.getToanBo(OPT);
			});
			this.ev.subscribe('UpdateChi', data =>{
				this.emptys=1;
				//this.getToanBo(OPT);
			});
			
			
			this.slideMonth = new String(todays.getMonth());
			console.log(todays.getMonth());
           var thang = ["1","2","3","4","5","6","7","8","9","10","11","12"];
		   // for(var i=0;i<thang.length;i++){
			//	thang[i] = thang[i] + "/" + todays.getFullYear();
//console.log(thang[i]); 				
			//}
		this.ThangNam = thang;
			//console.log(this.slideMonth);
				  //getThu
		this.getThu(this.slideMonth+1);
//get tongchi
		this.getChi(this.slideMonth+1);
//get sautru
		this.getSauTru(this.slideMonth+1);
	
			 
  }

pushThongKe(thang){
	this.nav.push(ThNgKPage,{
	     month: thang
		 
	})
}
 
  // events
  
 
  getThu(OPT){
	  //get tongthu
this.http.get(this.URL+'tongchi.php?id=1&thang='+OPT).map(res => res.json()).subscribe(data => {
			//console.log(data);
		    this.tongthu = data;
});
	  
  }
  getToanBo(OPT){
	   this.getThu(OPT);
//get tongchi
		this.getChi(OPT);
//get sautru
		this.getSauTru(OPT);
		//this.getNgayNhap();
		//get dulieu
//this.getDuLieu();
  }
  getChi(OPT){
	  this.http.get(this.URL+'tongchi.php?id=2&thang='+OPT).map(res => res.json()).subscribe(data => {
				//console.log(data);
				//e = document.getElementById("tongthu");
				//e.textdata = data['_body'];
			this.tongchi = data;
});
  }
  getSauTru(OPT){
	  this.http.get(this.URL+'tongchi.php?id=3&thang='+OPT).map(res => res.json()).subscribe(data => {
				//console.log(data);
				//e = document.getElementById("tongthu");
				//e.textdata = data['_body'];
			this.sautru = data;
			this.sautru = parseInt(this.sautru);
			
});
  }
  
slideChanged(){
	
 //console.log(this.slides.getActiveIndex());		
 this.getToanBo(this.slides.getActiveIndex()+1);
 //this.getChart(this.slides.getActiveIndex()+1,new Date().getFullYear());
}
	
	
				//e = document.getElementById("tongthu");
				//e.textdata = data['_body'];
				
//console.log(this.y.ngaynhap);
	
	  suaItem(ID){
		  //console.log(ID);
		// let profileModal = this.modalCtrl.create(IThuChi, { userId: ID });
 //  profileModal.present();
	  }
	
xoaItem(ID){
		  this.http.get(this.URL+'tutaods.php?id=3&SoTC='+ID).map(res => res.json()).subscribe(data => {
			  console.log(data);
		if(data=1){
			//this.getToanBo();			
		}
		
		
	  });
}	
	  
doRefresh(refresher){
	
	setTimeout(() => {
      console.log('Async operation has ended');
	  this.getNgayNhap();
      refresher.complete();
    }, 1000);
}	
	

  getNgayNhap(){
	  this.http.get(this.URL+'danhsach.php?id=2').map(res => res.json()).subscribe(data => {
//			console.log(data);
			if(data == ""){this.emptys=0;}
			else{
		 	
		this.tongngay=0;
		this.ngaynhap = data;
	   for(var i=0;i<this.ngaynhap.length;i++){
			this.ngaynhap[i].STT = i+1;
			this.tongngay = this.tongngay + parseInt(this.ngaynhap[i].TongGia);
		}

			
		}
		
		
			
			
	  });

  }


}

///
