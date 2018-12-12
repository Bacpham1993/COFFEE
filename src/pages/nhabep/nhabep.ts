import { Component,OnInit,OnDestroy} from '@angular/core';
import {Platform, ActionSheetController,NavParams,NavController,Events,ModalController} from 'ionic-angular';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import {FirebaseListObservable,AngularFireDatabase} from 'angularfire2/database'

@Component({
  selector: 'nhabep',
  templateUrl: 'nhabep.html',

})

export class nhabep implements OnInit, OnDestroy {
	ban:string;
	dsban:any[];
	nhabep: FirebaseListObservable<any>;
	bannhabep:any[];
	linhtinh:any[];
	banct: FirebaseListObservable<any>;
	subs:any;
	js:any;
	constructor(public platform:Platform, public actionSheetCtrl: ActionSheetController, public param: NavParams, public http: Http, public nav: NavController, public ev:Events, public modalCtrl: ModalController, private db: AngularFireDatabase) {
	}
	ngOnInit(){
		this.batdau();	
	}
	ngOnDestroy(){
		this.subs.unsubscribe();
	}
	batdau(){
		this.ban = "";
		this.nhabep = this.db.list('/bancf',{ preserveSnapshot: true })
		this.subs = this.nhabep.subscribe(snapshots => {
			this.bannhabep = [];
			this.linhtinh = [];
			this.js = {};
			snapshots.forEach(snapshot => {
				if(snapshot.val().tongtien > 0){
					
					this.bannhabep.push(snapshot.val());
					var hihi = snapshot.val().ID;
					this.js[hihi] = 0;
					//this.linhtinh.push(hihi);
					var hehe = snapshot.child("banct");
					//console.log(Object.keys(hehe.val()).length);
					var length = Object.keys(hehe.val()).length;
					for(var k = 0; k < length; k++) {
						var loveyou = snapshot.child("banct/"+Object.keys(hehe.val())[k]);
						if(loveyou.val().slmoi !=0 && loveyou.val().sl - loveyou.val().slmoi >= loveyou.val().chebien) {
							var json = {};
							json = loveyou.val();
							json["keys"] = Object.keys(hehe.val())[k];
							json["keysban"] = snapshot.key;
							this.linhtinh.push(json);
							if(loveyou.val().maban == hihi){
								this.js[hihi] = this.js[hihi]+1;
							}
							
						}
					}
				}
			})
			//console.log(this.js);
			console.log(this.bannhabep);
			console.log(this.linhtinh);
			
			this.dsban = [];
			var l = this.bannhabep.length;
			for(var i = 0; i < l; i++) {
				if(this.js[this.bannhabep[i].ID] > 0) {
					this.dsban.push(this.bannhabep[i].ID);
				}
			}
			console.log(this.dsban);
		})
	}
	chebien(key, keyban, sl, maban) {
		//console.log(this.js[maban]);
	
		this.db.list('/bancf/' + keyban + "/banct").update(key, {
			chebien: sl,
			nhabep: 0,
			slmoi: 0
		});
			if(this.js[maban] == 0) {
			this.db.list('/bancf/').update(keyban, {
				checknb: 1
			});
		}
	}
	chonban(maban) {
		this.ban = maban;
	}
}