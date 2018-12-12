import { Component} from '@angular/core';
import { NavController,ModalController, ViewController,NavParams,Events,LoadingController,AlertController } from 'ionic-angular';
import {Http} from '@angular/http';

@Component({
  selector: 'page-chuyenban',
  templateUrl: 'chuyenban.html'
})

export class chuyenban {
soban:any;
tb:string='';
tb2:string='';
lan:number=0;
lan2:number=0;
drunks:any;
x:number=0;
tt:boolean=false;
tt2:boolean=false;
URL: string = "http://works.medicafe.vn/bin/";

constructor(public loadingCtrl: LoadingController,public event:Events,public navCtrl: NavController,public http: Http,public modalCtrl: ModalController,public viewCtrl: ViewController,params: NavParams) {
this.soban=params.get('sl');

}

  closemodal(){
   this.viewCtrl.dismiss();
    }
  chuyenban(tb,tb2){
    if(tb=='' || tb2 ==''){
        alert('Bạn vui lòng chọn bàn cần chuyển!')
    }
    else{
            this.http.get(this.URL+'getdetailtable.php?ID=lan&ID1='+tb).map(res => res.json()).subscribe(data => {
            if(data.length>0){
            this.tt=data[0].thanhtoan;
            }
            if(data.length==0){
               alert('Bàn chưa có thực đơn, chuyển bàn thất bại!');
             }
            else{
            if(this.tt==true){
              alert('Bàn chưa có thực đơn, chuyển bàn thất bại!');
            }
            else{
            this.http.get(this.URL+'getdetailtable.php?ID=lan&ID1='+tb2).map(res => res.json()).subscribe(data1 => {
            if(data1.length>0){
              this.tt2=data1[0].thanhtoan;
            }
            if(this.tt2==true){
              this.lan2=data1[0].lan;
              this.lan2++;
              this.http.get(this.URL+'getdetailtable.php?HD=chuyenban&ID='+tb+'&ID2='+tb2+'&Lan='+data[0].lan+'&Lan2='+this.lan2).map(res => res.json()).subscribe(data1 => {
                alert('Chuyển bàn thành công!')
               // console.log(this.URL+'getdetailtable.php?HD=chuyenban&ID='+tb+'&ID2='+tb2+'&Lan='+data[0].lan+'&Lan2='+this.lan2);
              })
            }
            else{
                this.http.get(this.URL+'getdetailtable.php?HD=chuyenban&ID='+tb+'&ID2='+tb2+'&Lan='+data[0].lan+'&Lan2='+this.lan2).map(res => res.json()).subscribe(data1 => {
                alert('Chuyển bàn thành công!')
               // console.log(this.URL+'getdetailtable.php?HD=chuyenban&ID='+tb+'&ID2='+tb2+'&Lan='+data[0].lan+'&Lan2='+this.lan2);
            })
            }

            })
            }
            }
    })
    }
}
}
