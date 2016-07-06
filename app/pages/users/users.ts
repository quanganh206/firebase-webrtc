import { Component } from '@angular/core';
import {COMMON_DIRECTIVES} from '@angular/common';
import { Page, ViewController, NavController } from 'ionic-angular';

import {AngularFire, FirebaseRef, FirebaseListObservable, FirebaseObjectObservable} from 'angularfire2';

import {UserService} from '../../common/user.service';
import {User, OtherUser, AuthService} from '../../common/auth.service';


/*
  Generated class for the UsersPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  templateUrl: 'build/pages/users/users.html',
  directives: [COMMON_DIRECTIVES]
})
export class UsersPage {
  me: User;
  users: FirebaseListObservable<any>;

  constructor(private nav: NavController, private userService: UserService, private authService: AuthService,
    private viewCtrl: ViewController) {
      this.me = authService.user;
      this.users = userService.asList();
  }
  chooseUser(user: any) {
      console.log('Choose user', user);
      this.viewCtrl.dismiss(new OtherUser(user.$value, user.$key));
  }
}
