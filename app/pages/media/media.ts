import { Component } from '@angular/core';
import { NavController, Platform } from 'ionic-angular';
import {AngularFire, FirebaseListObservable} from 'angularfire2';
import {Observable} from 'rxjs/Observable';

import {WebRTCService} from '../../common/webrtc.service';


/*
  Generated class for the MediaPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  templateUrl: 'build/pages/media/media.html',
})
export class MediaPage {
  users: FirebaseListObservable<any[]>;
  constructor(private nav: NavController, private platform: Platform, private af: AngularFire, private rtc:WebRTCService) {
    this.users = this.af.list('/users');
  }

  join(task : HTMLInputElement): void {

        console.log(`Adding user to users in chat room: ${task.value} `);
        this.users.add(task.value);
    }

    leave(id){
        this.users.remove(id);
    }
}
