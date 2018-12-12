import { Component,OnInit } from '@angular/core';
import { NavController,AlertController,LoadingController,Platform,ToastController,ActionSheetController,Events  } from 'ionic-angular';
import {Http} from '@angular/http';
import { thuvien } from '../thuvien/thuvien';



declare let cordova: any;


@Component({
  selector: 'page-th-cn',
  templateUrl: 'th-cn.html',
  entryComponents:[thuvien]
})
export class ThCNPage {

today:any;
listdrinks:any;
list:any;
URL: string = "http://works.medicafe.vn/bin/";
anh: string = "assets/img/cafe.jpg";
  constructor(public events: Events,public actionSheetCtrl: ActionSheetController, public toastCtrl: ToastController, public platform: Platform, public loadingCtrl: LoadingController,public navCtrl: NavController,public http: Http,private alertCtrl: AlertController) {
   this.hienthidu();
   this.list="thucdon";
   this.events.subscribe("anh:dachon", (url) => {
    this.anh = url;
  });
  
  }
  


    hienthidu()
    {
       this.http.get(this.URL+'getdrinks.php?ID=1').map(res => res.json()).subscribe(data1 => {
       this.listdrinks=data1;
     })
    }
    xoa(tendu)
    {
      let alert = this.alertCtrl.create({
        title: 'Cảnh báo!',
        message: 'Bạn có chắc muốn xóa?',
        buttons: [
          {
            text: 'Hủy',
            role: 'cancel',
            handler: data => { }
          },
          {
            text: 'Chấp nhận',
            handler: data => {
            this.http.get(this.URL+'addtable.php?HD=6&DU='+tendu).map(res => res.json()).subscribe(data => {})
            this.hienthidu(); 
           }
          }
        ]
      });
      alert.present();
    }
    sua(tendu,gianhap,dongia)
    {
let alert = this.alertCtrl.create({
    title: 'Sửa thông tin',
    inputs: [
      {
        name: 'ten',
        placeholder: 'Tên: '+tendu
      },
      {
        name: 'gianhap',
        placeholder: 'Giá nhập: '+gianhap,
      },
      {
        name: 'gia',
        placeholder: 'Giá bán: '+dongia,
      }
    ],
    buttons: [
      {
        text: 'Hủy',
        role: 'cancel',
        handler: data => {}
      },
      {
        text: 'Chấp nhận',
        handler: data => {
          if(data.ten=="") {data.ten=tendu;};
          if(data.gia=="") {data.gia=dongia;};
          if(data.gianhap=="") {data.gianhap=gianhap;};
          
         this.http.get(this.URL+'addtable.php?HD=5&DU='+data.ten+'&DG='+data.gia+'&DU1='+tendu+'&GN='+data.gianhap+'&nguoisua'+sessionStorage.getItem('username')).map(res => res.json()).subscribe(data => {});
         
         this.hienthidu(); 
       }
      }
    ]
  });
  alert.present();
    }
  nhap(tendu,tonkho){
    let alert=this.alertCtrl.create({
      title:'Thêm hàng',
      message:tendu+' còn lại trong kho: '+tonkho,
      inputs:[
        {
          name:'them',
          placeholder:'Số lượng nhập thêm',
        }
      ],
      buttons:[
        {
          text:'Hủy',
          role:'cancel',
          handler: data=>{}
        },{
          text:'Chấp nhận',
          handler:data=>{
            this.http.get(this.URL+'addtable.php?HD=7&ten='+tendu+'&slthem='+data.them).map(res=>res.json()).subscribe(data=>{});
            this.hienthidu();
          }
        }
      ]
    });
    alert.present();
  }
 
/// >>> ///
todo = {
  ten:'',
  gianhap:0,
  dongia:0,
  soluong:0
};
thongbao(tin) {
	if(tin === 1) {
      let alert = this.alertCtrl.create(
        {
          title: 'Thêm thành công',
          buttons: [
            {
              text: 'Giữ nguyên',
              role: 'cancel',
              handler: data => {
              }
            },
            {
              text: 'Nhập lại',
              handler: data => {
                this.todo.ten = '',
                this.todo.gianhap = 0,
                this.todo.dongia = 0,
                this.todo.soluong = 0,
		        this.anh = "assets/img/cafe.jpg";
              }
            }
          ]
        }
      );
	  alert.present();
	}
	else {
      let alert = this.alertCtrl.create(
        {
          title: 'Lỗi: kiểm tra lại',
          buttons: [
            {
              text: 'Xác nhận',
              role: 'cancel',
              handler: data => {
              }
            }
          ]
        }
	  );
	  alert.present();
	}
  }
  // dia chi themthucdon.php
  themthucdon() {
    this.http.get(this.URL+"themthucdon.php?ten="+this.todo.ten+"&gianhap="+this.todo.gianhap+"&dongia="+this.todo.dongia+"&soluong="+this.todo.soluong+"&anh="+this.anh+"&nguoinhap="+sessionStorage.getItem("username")).map(res => res.json()).subscribe(data => {
		this.thongbao(data);
	})
    this.hienthidu();
  }
  chonanh() {
	this.navCtrl.push(thuvien);
  }
  /// <<< ///




}
