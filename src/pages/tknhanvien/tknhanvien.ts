import { Component,OnInit,OnDestroy} from '@angular/core';
import {Platform, ActionSheetController,NavParams,NavController,Events,ModalController, AlertController} from 'ionic-angular';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
//import {AngularFire, FirebaseListObservable} from 'angularfire2';
import {FirebaseListObservable,AngularFireDatabase} from 'angularfire2/database'


@Component({
  selector: 'tknhanvien',
  templateUrl: 'tknhanvien.html',
})

export class tknhanvien implements OnInit, OnDestroy {
	role:any;
	nv:any;
	list:any;
	dsban:any[];
	nhabep: FirebaseListObservable<any>;
	bannhabep:any[];
	linhtinh:any[];
	banct: FirebaseListObservable<any>;
	subs:any;
	js:any;

	constructor(public platform:Platform, public actionSheetCtrl: ActionSheetController,
	public param: NavParams, public http: Http, public nav: NavController, public ev:Events,
	public modalCtrl: ModalController, private db: AngularFireDatabase, private alertCtrl: AlertController) {
	
	}
	ngOnInit(){
		this.batdau();	
	}
	ngOnDestroy(){
	}
	batdau(){
		this.role = ['quản lý', 'Nhà bếp', 'Chung', 'Phục vụ bàn'];
		this.list = 'nv';

		this.nhabep = this.db.list('/nhanvien',{ preserveSnapshot: true })
		this.subs = this.nhabep.subscribe(snapshots => {
			this.bannhabep = [];
			this.linhtinh = [];
			this.js = {};
			snapshots.forEach(snapshot => {
				var json = snapshot.val();
				json['key'] = snapshot.key;
				this.bannhabep.push(json);
				if(snapshot.val().username = sessionStorage.getItem("username")) {
					this.nv = snapshot.val()
				}
				if(snapshot.val().danhgia != undefined) {
					var hihi = snapshot.val().ID;
					var hehe = snapshot.child('danhgia');
					var length = Object.keys(hehe.val()).length;
					for(var k = 0; k < length; k++) {
						var loveyou = snapshot.child('danhgia/'+Object.keys(hehe.val())[k]);
						json = {};
						json = loveyou.val();
						json['key'] = snapshot.key;
						json['username'] = snapshot.val().username;
						this.linhtinh.push(json);
					}
				}
			})
			//console.log(this.js);
			//console.log(this.bannhabep);
			//console.log(this.linhtinh);		

		})
	}
	chonnv(nv) {
		for(var i = 0; i < this.bannhabep.length; i++) {
			if(this.bannhabep[i].username == nv) {
				this.nv = this.bannhabep[i];
				break;
			}
		}
		this.list = 'dg';
	}
	xoa(username, keynv) {
		let alert = this.alertCtrl.create({
			title: 'Xác nhận',
			message: 'Nhân viên ' + username  + ' sẽ bị xóa!' ,
			buttons: [{
				text: 'OK!',
				handler: data => {
					this.db.list('/nhanvien').remove(keynv);
				}
			},
			{
				text: 'Hủy',
				handler: data => {}
			}]
		});
		alert.present();
	}
	them() {
		let alert = this.alertCtrl.create({
			title: 'Thêm nhân viên',
			inputs: [
				{
					name: 'username',
					type: 'text',
					label: 'username: ',
				},
				{
					name: 'password',
					type: 'text',
					label: 'password: ',
				}
			],
			buttons: [{
				text: 'Thêm',
				handler: data => {
					if(data.username.length > 4 || data.password.length > 4) {
						var check = 0;
						for(var i = 0; i < this.bannhabep.length; i++) {
							if(this.bannhabep[i].username == data.username) {
								check = 1;
							}
						}
						var lastnv = Number((this.bannhabep[i].ID).slice(2)) + 1;
						if(!check) {
							this.db.list('/nhanvien').push({
								ID: 'NV' + ((lastnv < 100) ? '0' : '') + lastnv,
								solanthanhtoan: 0,
								username:  data.username,
								password: data.password,
								vitri: 2
							})
						}
					}
				}
			},
			{
				text: 'Hủy',
				handler: data => {}
			}]
		});
		alert.present();
	}
	sua(username, keynv) {
		let alert = this.alertCtrl.create({
			title: 'Menu chỉnh sửa',
			message: 'Nhân viên: ' + username,
			inputs: [
				{
					name: 'role',
					type: 'radio',
					label: this.role[1],
					value: '1'
				},
				{
					name: 'role',
					type: 'radio',
					label: this.role[2],
					value: '2',
					checked: true
				},
				{
					name: 'role',
					type: 'radio',
					label: this.role[3],
					value: '3'
				}
			],
			buttons: [{
				text: 'OK',
				handler: data => {
					this.db.list('/nhanvien').update(keynv, {
						vitri: data
					});
				}
			},
			{
				text: 'Hủy',
				handler: data => {}
			}]
		});
		alert.present();
	}
}