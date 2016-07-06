import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {ChatPage} from '../chat/chat';
import {HomePage} from '../home/home';
/*
  Generated class for the TabsPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  templateUrl: 'build/pages/tabs/tabs.html',
})
export class TabsPage {
  homePage: any = HomePage;
  chatPage: any = ChatPage;
  constructor(private nav: NavController) {

  }

}
