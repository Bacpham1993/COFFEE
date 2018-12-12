import { Component } from '@angular/core';
import { NavController,ModalController, ViewController,Events,LoadingController,AlertController } from 'ionic-angular';
import {Http} from '@angular/http';
import { bancf } from '../bancf/bancf';
import { chuyenban } from '../chuyenban/chuyenban';
//import {AngularFire, FirebaseListObservable} from 'angularfire2';
import {FirebaseListObservable,AngularFireDatabase} from 'angularfire2/database'

@Component({
  selector: 'page-qu-nlcoffee',
  templateUrl: 'qu-nlcoffee.html'
})
export class QuNLCOFFEEPage {
i:number;
i_b:number;
listtable:any[];
listtableA:any[];
listtableB:any[];

//listkitA:any[];
//listkitB:any[];
//ngoaivong:any[];
list:any;
list1:any;
listfood:any;
listdrink:any;
tenban:any;
tablen:number;
URL: string = "http://works.medicafe.vn/bin/";
banan: FirebaseListObservable<any>;
hienban: FirebaseListObservable<any>;
nhabep: FirebaseListObservable<any>;
//bannhabep: FirebaseListObservable<any>;
hoadonaf: FirebaseListObservable<any>;
nhanvienaf: FirebaseListObservable<any>;
monhoadon:any[];
LuongHD: any[];
relationship:any;
//banchitiet:any[];
keytnow:any = 'hihi';
keynhabep:string;
lanbantt:number=0;
tong:number;
mondagoi:any[];
k:number;
kt:number;
thanhtien:number;
giamgia:number;
pr_bill:number = 0;
tenquan:string = "TÂY NGUYÊN MEDICAFE";
diachi: string = "102 Săm Brăm - Buôn Ma Thuột";
sodt: string = "0164 957 4577";
keynhanvien:string; // khai báo biến
  constructor(public navCtrl: NavController,public http: Http,public modalCtrl: ModalController, public alertCtrl: AlertController,private db: AngularFireDatabase,private ev:Events) {
//console.log(this.list);
//Khoi tao gia tri
		this.tong = 0;
		this.kt=0;
		this.k=0;
		this.giamgia =0;
		this.thanhtien =0;
		this.list="ds-ban";
		this.list1="khu-a";
		this.listfood="douong";
		this.relationship = "friends";
		
		this.LuongHD =[];
		this.listtableA =[];
		this.listtableB =[];
	//	this.listkitA =[];
	//	this.listkitB =[];
		this.keynhabep ="";		
// Xu ly cac event
/*
*/
	// lấy keynhanvien khi bắt đầu
	this.nhanvienaf=this.db.list("/nhanvien", {
		query: {
			orderByChild: "username",
			equalTo: sessionStorage.getItem("username")
		}
	});
	this.nhanvienaf.subscribe(dt1 => {
		/*
		if(dt1.length ==0){
			this.nhanvienaf.push({
				ID:"NV02",
				username: sessionStorage.getItem('username'),
				solanthanhtoan:0
			})
		}
		*/
		//else{
				
		//this.keynhanvien = dt1[0].$key;
		//}
		
	})

this.ev.subscribe('haivcc',data=>{
		  this.keytnow = data;
	//	  console.log(this.keytnow);

	   })
this.ev.subscribe('dengi',data=>{
	  	this.list="ds-thucdon";
		this.tenban = data;
		this.nhabep=this.db.list('/nhabep',{
		   query:{
			     orderByChild: 'ID',
				equalTo: this.tenban
		   }
	   });
	   this.nhabep.subscribe(dt=>{
		   if(dt.length==0){}
		   else{
		   this.keynhabep = dt[0].$key;
		   }
	   })
		
		this.db.list('/bancf/'+this.keytnow+'/banct', { preserveSnapshot: true })
		.subscribe(snapshots => {this.tong = 0; this.thanhtien = 0;
		snapshots.forEach(snapshot => {
			
			if (snapshot.val().thanhtoan == 0){
				//this.tong = snapshot.val().tongtien;
				this.tong = this.tong +  parseInt(snapshot.val().gia)*snapshot.val().sl;
			this.thanhtien = this.tong - (this.giamgia*this.tong/100);
			}
		})
		})
	
 })

this.ev.subscribe('slban',data=>{
	//console.log(this.lanbantt);
		this.lanbantt = data;
	console.log(this.keytnow);	
		this.hienban = this.db.list('/bancf/'+this.keytnow+'/banct',{
		   query:{
			     orderByChild: 'thanhtoan',
				equalTo: 0
		   }
	   });
	   
		this.hienban.subscribe(dt=>{
		this.mondagoi=[];

		this.k=dt.length;
		this.mondagoi=dt;
		console.log(this.mondagoi);
		
	});
	this.hoadonaf = this.db.list('/bancf/'+this.keytnow+'/banct',{
		   query:{
			     orderByChild: 'thanhtoan',
				equalTo: 1
				
		   }
	   });
	   this.hoadonaf.subscribe(dt=>{
		   this.monhoadon =[];
		   this.monhoadon=dt;
		   
	   });
	  
		this.db.list('/bancf/'+this.keytnow+'/banct',{
		   query:{
			     orderByChild: 'thanhtoan',
				equalTo: 1
				
				
		   }
	   }).subscribe(dt=>{
		   if(dt.length==0){this.LuongHD= [];}
		   else{
		   this.LuongHD= [];
		   this.LuongHD.push({lanban: dt[dt.length-1].lanban, ngaytt: dt[dt.length-1].ngaytt} );
		   //console.log(this.LuongHD.length);
		 // var re = false;
		   var x=0;
				for(var i=dt.length-1;i>=0;i--){
					
				     for(var m=this.LuongHD.length-1;m>=x;m--){
						 if(this.LuongHD[m].lanban != dt[i].lanban){
							  this.LuongHD.push({lanban: dt[i].lanban, ngaytt: dt[i].ngaytt});
							  x+=1;
							
						 }
						
					 }
				}
				console.log(this.LuongHD);
		   } 
	   })


})
	  //
	 
   this.db.list('/bancf').subscribe(dt => {
	   
	   	this.listtableA =[];
		this.listtableB =[];
		this.i = dt.length;
		this.listtable = dt
		//console.log(this.listtable);
		for(var j=0;j<dt.length;j++){
		var chuoi = dt[j].ID;
			if(chuoi.substr(0,1) == "B"){
				this.listtableB.push(dt[j]);				
			}
			else{
			this.listtableA.push(dt[j]);
			}
		}
		this.i_b = this.listtableB.length;
	for(var i=0; i< this.i ; i++){
	
	if(sessionStorage.getItem("username") == this.listtable[i].nchuyen && this.listtable[i].checknb == 1) {
		//console.log(this.listtable[i].checknb);
					this.banan.update(this.listtable[i].$key,{checknb:0});
					let alert = this.alertCtrl.create({
			title: 'Hoàn thành',
			message: 'Bàn ' + this.listtable[i].ID+ " đã chế biến xong!",
			buttons: ['Chấp nhận']
			
		});
					alert.present();
					
		
	}
	
}

		
		
		
	});
	/*this.db.list('/nhabep').subscribe(dt => {
	
		this.listkitA =[];
		this.listkitB =[];
		//this.listkit = dt;
		for(var j=0;j<dt.length;j++){
		 var chuoi = dt[j].ID;
			if(chuoi.substr(0,1) == "B"){
				this.listkitB.push(dt[j]);				
			}
			else{
			this.listkitA.push(dt[j]);
			}
		}
	});*/
	this.hienthiban();
	this.hienthidouong();  
//Thong bao che bien xong

	}
///
ChonHD(lb){
			//this.monhoadon=[];
			let hehe=[];
			let tong=0;
		for(var i=0;i<this.monhoadon.length;i++){
			if(this.monhoadon[i].lanban == lb){
				hehe.push(this.monhoadon[i]);
				tong = tong + parseInt(this.monhoadon[i].gia)*this.monhoadon[i].sl;
			}
		}
		//this.k=this.mondagoi.length;

		
		//this.mondagoi=dt;
	
	//console.log(this.monhoadon);
	
	 let alert = this.alertCtrl.create();
    alert.setTitle("HÓA ĐƠN: HD " + this.tenban +"." + lb);
	alert.setSubTitle("(Tổng HD: " + tong + ")");
	for(var i=0;i<hehe.length;i++){
	alert.addInput({
		type:'number',
	    name: hehe[i].nhommon,
        placeholder: hehe[i].tenmon +": "+ hehe[i].sl
		
	})
	}
	alert.addButton("Hủy");
	alert.addButton({
		text: 'Đồng ý',
		handler: data =>{
			
			for(var i=0;i<hehe.length;i++){
				if(data[hehe[i].nhommon] != ""){
				//console.log(data[hehe[i].nhommon]);
				this.db.list('/bancf/'+this.keytnow+'/banct/').update(hehe[i].$key,{sl:data[hehe[i].nhommon]});
				console.log("Cập nhật " + hehe[i].nhommon + ": " + data[hehe[i].nhommon]); 
			}
		}
		}
	})
	alert.present();
}

openmodal(soban,sokey,lanban){
   //let contactModal = this.modalCtrl.create(bancf,{ban: soban, id: sokey });
   //contactModal.present();
      this.ev.publish('haivcc', sokey);
  this.ev.publish('dengi', soban);

   this.ev.publish('slban', lanban);

  }
thanhtoan(){
var	slmon = this.k;
var mon = new Array();
mon = this.mondagoi;
	if(this.pr_bill == 1){
		let alert = this.alertCtrl.create({
      title: 'LỖI 0x01',
      message: 'Vui lòng in hóa đơn trước khi thanh toán!',
      buttons: ['Chấp nhận']
    });
    alert.present();
		
	}
	else{
		this.pr_bill = 0;
		//console.log(this.tenban);
		if(this.tenban == undefined){}
		else{
	  this.http.get(this.URL+'getdetailtable.php?HD=TT&ID='+this.tenban+'&Lan='+this.lanbantt).map(res => res.json()).subscribe(data1 => {
	console.log("Thanh toán: HD" + this.tenban +"." + this.lanbantt);
	  
		
})
	
      this.lanbantt = this.lanbantt + 1;
	 this.tong = 0;
	 this.thanhtien = 0;
	  this.banan.update(this.keytnow,{
		  tongtien: this.thanhtien,
		  solan: this.lanbantt
		  });
	for(var i=0;i<slmon;i++){
		this.hienban.update(mon[i].$key,{thanhtoan:1});
	}
  

   		  
   //  this.mondagoi =[];
	  this.kt=0;
	  this.k=0;
   //this.ev.publish('slban', this.lanbantt);
   		// thêm ngay khi thanh toán
			var d= new Date();
			var s =  d.toLocaleDateString()+ " " +  d.toLocaleTimeString();
			let alert = this.alertCtrl.create(
				{
					title: 'Đánh giá nhân viên',
					inputs: [
						{
							name: 'rate',
							type: 'radio',
							label: 'Hài lòng',
							value: '1'
						},
						{
							name: 'rate',
							type: 'radio',
							label: 'Bình thường',
							value: '0',
							checked: true
						},
						{
							name: 'rate',
							type: 'radio',
							label: 'Chưa hài lòng',
							value: '-1'
						}
					],
					buttons: [
						{
							text: 'Xác nhận',
							handler: dt1 => {
								this.db.list("/nhanvien/" + this.keynhanvien + "/danhgia").push({
									thoigian: s,
									maban: this.tenban,
									diem: parseInt(dt1)
								})
							}
						}
					]
				}
			);
			alert.present();
	}
	}
	
  }

themsl(key,sls,dgia,ten){

	this.http.get(this.URL+'getdrinks.php?ID=3&tk=1&ten='+ten).map(res => res.json()).subscribe(data1 => {
		console.log(data1);

		if(data1.kq=='1'){
			var soluongx = parseInt(sls) +1;
			this.hienban.update(key,{
				sl: soluongx
			})
			this.banan.update(this.keytnow,{tongtien: this.tong});
			this.http.get(this.URL+'getdetailtable.php?HD=Them&ID='+this.tenban+'&Douong='+ten+'&SL='+soluongx+'&Lan='+this.lanbantt+'&Dongia='+dgia).map(res => res.json()).subscribe(data1 => {
				//console.log(data1);
			})

		}

		this.thongbao(data1,ten);
	});	
	this.hienthidouong();

}
botsl(key,sls,dgia,ten){
	var soluongx = parseInt(sls) -1;
	//this.tong = this.tong - parseInt(dgia);
	//this.thanhtien = this.tong - (this.giamgia*this.tong/100);
	
	this.hienban.update(key,{
		sl: soluongx
		
	})
	if((sls-1)==0){this.hienban.remove(key);}
	this.http.get(this.URL+'getdrinks.php?ID=4&tk=1&ten='+ten).map(res => res.json()).subscribe(data1 => {});
	this.hienthidouong();
	this.http.get(this.URL+'getdetailtable.php?HD=Them&ID='+this.tenban+'&Douong='+ten+'&SL='+soluongx+'&Lan='+this.lanbantt+'&Dongia='+dgia).map(res => res.json()).subscribe(data1 => {
	//console.log(data1);
})
this.banan.update(this.keytnow,{tongtien: this.tong});
}
chuyennbctrl(){
	console.log(this.mondagoi);
	//console.log(this.keytnow);
	
	var length = this.mondagoi.length;
	if(length <= 0) {
		console.log("do nothing");
	}
	else {
		for(var i = 0; i < length; i ++) {
			if(this.mondagoi[i].sl > this.mondagoi[i].slmoi + this.mondagoi[i].chebien) {
				this.hienban.update(this.mondagoi[i].$key ,{
					slmoi: this.mondagoi[i].sl - this.mondagoi[i].chebien,
					nhabep: 1
				});
				
				console.log(this.mondagoi[i].tenmon + ", update: chebien = " + (this.mondagoi[i].sl - this.mondagoi[i].slmoi) + ", nhabep = 1");
			}
			else {
				console.log("donothing");
			}
		}
		this.banan.update(this.keytnow,{nchuyen: sessionStorage.getItem('username')});
	}
}
themdoan(ten,dongia,nhom,tonkho){
	if(this.keytnow == 'hihi'){ 
	let alert = this.alertCtrl.create({
      title: 'LỖI 0x02',
      message: 'Vui lòng chọn bàn để tiếp tục!',
      buttons: ['Chấp nhận']
    });
    alert.present();}
else{
	//console.log(this.mondagoi);
	//console.log(this.keytnow);
	if(tonkho==0){
		let alert = this.alertCtrl.create({
			title: 'LỖI 0x02',
			message: ten+' đã hết! Vui lòng chọn món khác!',
			buttons: ['Chấp nhận']
		  });
		  alert.present();
	}
	else{
		var xxx = 0;
		var soluongx = 1;
		var d= new Date();
		var s =  d.toLocaleDateString()+ " " +  d.toLocaleTimeString();
	for(var _i=0;_i<=this.k-1;_i++){
		xxx=0;
		if(this.mondagoi[_i].tenmon == ten){
			xxx=1;
			var slx = parseInt(this.mondagoi[_i].sl) + 1;
			this.hienban.update(this.mondagoi[_i].$key,{sl: slx});
			this.http.get(this.URL+'getdrinks.php?ID=3&tk=1&ten='+ten).map(res => res.json()).subscribe(data1 => {
				console.log(data1);
			});
			this.hienthidouong();
			break;
		}
	}
	if(xxx==0){
	this.hienban.push({
		maban: this.tenban,
		tenmon: ten,
		gia: dongia,
		sl:1,
		ngaynhap: s,
		nguoinhap: sessionStorage.getItem('username'),
		ngaytt: s,
		nhommon: nhom,
		lanban: this.lanbantt,
		thanhtoan:0,
		nhabep:0,
		slmoi:0,
		chebien:0
		});
	
     	this.http.get(this.URL+'getdrinks.php?ID=3&tk=1&ten='+ten).map(res => res.json()).subscribe(data1 => {
			 console.log(data1);
		 });
		this.hienthidouong();
	}
	/*this.nhabep.push({
		ID: this.tenban,
		lanban: this.lanbantt,
		check:0,
		banct:{
		maban: this.tenban,
		tenmon: ten,
		//gia: dongia,
		//sl:1,
		ngaynhap: s,
		nguoinhap: sessionStorage.getItem('username'),
		ngaytt: s,
		nhommon: nhom,
		lanban: this.lanbantt,
		//thanhtoan:0,
		//nhabep:0,
		//chebien:0
		}
		
		
		});
		*/
	
		//console.log(this.tong);			
		  //  this.tong = this.tong + parseInt(dongia);
		//	this.thanhtien = this.tong - (this.giamgia*this.tong/100);	
			this.banan.update(this.keytnow,{tongtien: this.thanhtien});
	
	this.http.get(this.URL+'getdetailtable.php?HD=Them&ID='+this.tenban+'&Douong='+ten+'&SL='+soluongx+'&Lan='+this.lanbantt+'&Dongia='+dongia).map(res => res.json()).subscribe(data1 => {
		console.log(data1);
	})
			
	}
		
	}
	 
}
printToCart(){
	this.pr_bill = 1;
	var chitiet:string;
	let popupWinindow;
	
	chitiet='<h2 align="center">'+ this.tenquan + '</h2><p style="text-align:left;">Đ/c:'+this.diachi+ '</p><p style="text-align:left;">ĐT: '+this.sodt+'</p><div style="text-align:left;"><p style="width:20%;float:left">Bàn: '+ this.tenban  +'</p><p style="width:20%;float:left">Số: HD '+ this.tenban+ '.' + this.lanbantt + '     </p><p style="width:40%;float:left">Ngày: ' + (new Date()).toLocaleDateString() + '     </p><p style="width:20%;float:left;">Nhân viên: '+sessionStorage.getItem('username')+'     </p></div>';
	let innerContents = '<table style="border:solid 1px;width:100%;text-align:center;"><caption>Phiếu thanh toán</caption><tr><th>STT</th><th>Tên món</th><th>Số lượng</th><th>Đơn giá</th></tr>';
	for(var i=0;i<=this.k-1;i++){
chitiet += '<tr><td>'+(i+1) + '</td>' + '<td>'+this.mondagoi[i].tenmon+'</td>'+ '<td>'+this.mondagoi[i].sl+'</td>'+ '<td>'+this.mondagoi[i].gia+'</td></tr>';
}
	chitiet+='</table><div style="text-align:right;margin-right:3%;"><p>Tổng cộng: '+this.tong+'vnd<p><p>Giảm giá: '+ this.giamgia +' %</p><p>Thành tiền: ' +this.thanhtien+'vnd</p></div><h3 align="center">Cảm ơn quý khách!</h3>';
   popupWinindow = window.open('', '_blank', 'width=600,height=700,scrollbars=no,menubar=no,toolbar=no,location=no,status=no,titlebar=no');
	popupWinindow.document.open();
	popupWinindow.document.write('<html><head></head><body onload="window.print()">' + innerContents + chitiet +   '</html>');
	popupWinindow.document.close();
  }

themban(){
 var hehe = 0;
if(this.list1=="khu-a"){
	hehe = (this.i - this.i_b)+1;
 this.banan.push({
	 ID: 'A' + hehe,
	 tongtien: 0,
	 solan: 1,
	 checknb: 0,
	nchuyen: '0'		
 });
 /*this.bannhabep.push({
	 ID: 'A'+hehe,
	 check: 0,
	 solan: 1  
 })
 */
/*// this.http.get(this.URL+'gettable.php?ID=themban'+'&SB=A'+hehe).map(res => res.json()).subscribe(data1 => {
	console.log("Created table: A" + hehe);
})

*/
}
else{
	hehe = this.i_b+1;
 this.banan.push({
	 ID: 'B' + hehe,
	 tongtien: 0,
	 solan: 1  
 });
/* this.bannhabep.push({
	 ID: 'B'+hehe,
	 check: 0,
	 solan: 1  
 })
// this.http.get(this.URL+'gettable.php?ID=themban'+'&SB=B'+hehe).map(res => res.json()).subscribe(data1 => {
	console.log("Created table: B" + hehe);
})*/
}
 
   }
xoaban(){
	if(this.listtable.length == 0 && this.listtableA.length ==0 && this.listtableB.length  ==0){}
	else{
var	hehe = 0;
if(this.list1=="khu-a"){	
hehe = (this.i - this.i_b) - 1;	
this.banan.remove(this.listtableA[hehe].$key);
//this.bannhabep.remove(this.listkitA[hehe].$key);
	
	 this.http.get(this.URL+'gettable.php?ID=xoaban'+'&SB=A'+hehe).map(res => res.json()).subscribe(data1 => {
	console.log("Deleted table: A" + hehe);
})
						}
else{
	hehe = this.i_b -1;
	this.banan.remove(this.listtableB[hehe].$key);
//this.bannhabep.remove(this.listkitB[hehe].$key);
	
	 this.http.get(this.URL+'gettable.php?ID=xoaban'+'&SB=B'+hehe).map(res => res.json()).subscribe(data1 => {
	console.log("Deleted table: B" + hehe);
})

}
		}
   }
   
    hienthidouong(){
		this.http.get(this.URL+'getdrinks.php?ID=1').map(res => res.json()).subscribe(data1 => {
			this.listdrink=data1;
		});
		// this.listdrink.splice(0,1);
    }

hienthiban()
 {
this.banan = this.db.list('/bancf');
//this.bannhabep = this.db.list('/nhabep');


  // console.log(this.lanbantt);
 }

 tanggiamsl(value,key,gia,sl1,ten){
	
   if(value==0){
	   this.hienban.remove(key);
	   //this.tong = this.tong - sl*parseInt(gia);
	   //this.thanhtien = this.tong - (this.giamgia*this.tong/100);
	   this.banan.update(this.keytnow,{tongtien: this.thanhtien});
	   this.http.get(this.URL+'getdrinks.php?ID=4&tk='+sl1+'&ten='+ten).map(res => res.json()).subscribe(data1 => {});
	   this.hienthidouong();
   }else if(value<sl1){
	   this.hienban.update(key,{sl: value});
	   //this.tong = this.tong - (sl-value)*parseInt(gia);
	   //this.thanhtien = this.tong - (this.giamgia*this.tong/100);
	   this.banan.update(this.keytnow,{tongtien: this.thanhtien});
	   var t=sl1-value;
	   this.http.get(this.URL+'getdrinks.php?ID=4&tk='+t+'&ten='+ten).map(res => res.json()).subscribe(data1 => {});
	   this.hienthidouong();
   }else if(value>sl1){
	   
	   //this.tong = this.tong + (value-sl)*parseInt(gia);
	   //this.thanhtien = this.tong - (this.giamgia*this.thanhtien/100);
	   
	   var t=value-sl1;
	   this.http.get(this.URL+'getdrinks.php?ID=3&tk='+t+'&ten='+ten).map(res => res.json()).subscribe(data1 => {
		   console.log(data1); 
		   
		   if(data1.kq=='2'){
			   var t=parseInt(data1.tb);
			   this.hienban.update(key,{sl: value-t});
			   this.banan.update(this.keytnow,{tongtien: this.thanhtien});
			   this.hienthidouong();
			   
		   }else if(data1.kq=='1'){
			   this.hienban.update(key,{sl: value});
			   this.banan.update(this.keytnow,{tongtien: this.thanhtien});
			   this.hienthidouong();
			   
		   
		   }else if(data1.kq=='0'){
			   
			   this.hienban.update(key,{sl: 0});
			   this.hienban.update(key,{sl: sl1});
			   this.banan.update(this.keytnow,{tongtien: this.thanhtien});
			   this.hienthidouong();
			   
		   }

		   this.thongbao(data1,ten);
	   });
	   
	   
   }
 }
 thongbao(tin,ten){
   if(tin.kq=='0'){
	   let alert = this.alertCtrl.create({
		   title: 'Thông báo',
		   message: tin.tb,
		   buttons: ['Chấp nhận']
		 });
		 alert.present();
   }else if (tin.kq=="2"){
	   let alert = this.alertCtrl.create({
		   title: 'Thông báo',
		   message: ten+' còn thiếu: '+tin.tb+'!',
		   buttons: ['Chấp nhận']
		 });
		 alert.present();
   }
 }
giamgias(giam:number){
	  this.giamgia = giam;
	  //this.thanhtien = this.tong - (this.giamgia*this.tong/100);
	  this.banan.update(this.keytnow,{tongtien: this.thanhtien});
  }
chuyenban(key,soban){
var solan=0;
var ngoaivong = [];
let cbs: FirebaseListObservable<any>;
cbs = this.db.list('/bancf/'+key+'/banct',{
		   query:{
			     orderByChild: 'thanhtoan',
				equalTo: 0
				
		   }
	   })
	   
cbs.subscribe(dt=>{
		ngoaivong=[];
		solan=dt.length;
				
		ngoaivong = dt;
		//console.log(solan);
		//console.log(trongvong);
	   })

//

	   
	   let alert = this.alertCtrl.create();
		alert.setTitle('CHUYỂN TỪ BÀN ' + soban);
for(var teo=0;teo<this.listtable.length;teo++){
	var hihi = this.listtable[teo].ID;
	if(hihi == soban){}
	else{
    alert.addInput({
      type: 'radio',
      label: 'Bàn ' + hihi,
      value: hihi,
      //checked: true
    });
	}
}
    

    alert.addButton('Hủy');
    alert.addButton({
      text: 'Đồng ý',
      handler: data => {
		//let ngoaivong = new Array();
	//let keyngoaivong = new Array();
		var lanss = solan;	
		var trongvong = ngoaivong;
			var keymoi = "";
			var tienmoi = 0;
			var solanmoi = 0;
			
	    var mondaco:any;
		  for(var i=0;i<this.listtable.length;i++){
			  if(this.listtable[i].ID == data){
				  
				  keymoi = this.listtable[i].$key;
				  tienmoi = this.listtable[i].tongtien;
				solanmoi = this.listtable[i].solan;
							
		if(tienmoi > 0){
				mondaco = this.listtable[i].banct;
		}
			  }
		  }
		

		  
		  

        console.log('Checkbox data:', data);
  
  for(var i=0;i<lanss;i++){
	  var teox =0;
	  for (var k in mondaco){
		  if(mondaco[k].tenmon == trongvong[i].tenmon){
			  teox=1;
			  var test = parseInt(mondaco[k].sl) + parseInt(trongvong[i].sl);
			  this.db.list('/bancf/'+keymoi+'/banct').update(k,{sl:test })
		  }
		  			
		  
	  }
	  if(teox==0){
	    this.db.list('/bancf/'+keymoi+'/banct').push({
		 maban: data,
		tenmon: trongvong[i].tenmon,
		gia: trongvong[i].gia,
		sl:trongvong[i].sl,
		ngaynhap: trongvong[i].ngaynhap,
		nguoinhap: sessionStorage.getItem('username'),
		ngaytt: trongvong[i].ngaytt,
		nhommon: trongvong[i].nhommon,
		lanban: solanmoi,
		nhabep: trongvong[i].nhabep,
		thanhtoan:trongvong[i].thanhtoan,
		slmoi:trongvong[i].slmoi,
		chebien:trongvong[i].chebien
		  
		  });
	  }
	   
		  	  tienmoi = tienmoi + parseInt(trongvong[i].gia)*trongvong[i].sl;

		 //
this.http.get(this.URL+'getdetailtable.php?HD=chuyenban&ID='+soban+'&Lan='+trongvong[i].lanban+'&ID2='+data+'&Lan2='+solanmoi).map(res => res.json()).subscribe(data1 => {
	console.log("Đổi bàn: " + soban +" -> " + data);
})
  }
  for(var i=0;i<lanss;i++){
	  cbs.remove(trongvong[i].$key); 
  }
  
  this.banan.update(keymoi,{tongtien: tienmoi});
   this.banan.update(key,{tongtien:0});
   keymoi="";
	key="";
	   
	   
	   //*/
      }
    });
    alert.present();
	//cbs_sub.unsubscribe();

	
  }

}
