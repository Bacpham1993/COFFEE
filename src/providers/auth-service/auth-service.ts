import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
// Do not import from 'firebase' as you'll lose the tree shaking benefits
import * as firebase from 'firebase/app';
import { Platform } from 'ionic-angular';
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook';

@Injectable()
export class AuthService {
  private currentUser: firebase.User;

  constructor(public afAuth: AngularFireAuth, private fb: Facebook,private platform: Platform) {
    afAuth.authState.subscribe((user: firebase.User) => this.currentUser = user);
  }

  get authenticated(): boolean {
    return this.currentUser !== null;
  }

  signInWithFacebook(): firebase.Promise<any> {
	  if (this.platform.is('cordova')) {
      return this.fb.login(['email', 'public_profile']).then(res => {
        const facebookCredential = firebase.auth.FacebookAuthProvider.credential(res.authResponse.accessToken);
		//console.log(res);
        return this.afAuth.auth.signInWithCredential(facebookCredential);
      });
    } else {
      return this.afAuth.auth.signInWithPopup(new firebase.auth.FacebookAuthProvider());
    }
	  /*
	  this.afAuth.auth.signInWithPopup(new firebase.auth.FacebookAuthProvider());
 return this.fb.login(['public_profile', 'user_friends', 'email'])
  .then((res: FacebookLoginResponse) => {
	  console.log('Logged into Facebook!', res);
	   const facebookCredential = firebase.auth.FacebookAuthProvider.credential(res.authResponse.accessToken);
       return this.afAuth.auth.signInWithCredential(facebookCredential);
	  
  
  })
  .catch(e => console.log('Error logging into Facebook', e));
     */ 

  }

  signOut(): void {
    this.afAuth.auth.signOut();
  }

  displayName(){
	  console.log(this.currentUser);
	  
    if (this.currentUser !== null) {
		//return this.currentUser.facebook.displayName;
		return this.currentUser;
    } else {
      return '';
	}
    
  }
  
}