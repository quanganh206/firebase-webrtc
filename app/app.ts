import {Component, ViewChild} from '@angular/core';
import {ionicBootstrap, Platform, MenuController, Nav} from 'ionic-angular';
import {StatusBar} from 'ionic-native';
import {HomePage} from './pages/home/home';
import {TabsPage} from './pages/tabs/tabs';
import {FIREBASE_PROVIDERS, defaultFirebase, firebaseAuthConfig, AuthProviders, AuthMethods, FirebaseListObservable} from 'angularfire2';

import {UserService} from './common/user.service';
import {AuthService, User} from './common/auth.service';
import {WebRTCConfig} from './common/webrtc.config';
import {WebRTCService} from './common/webrtc.service';

@Component({
  templateUrl: 'build/app.html',
  providers: [
    FIREBASE_PROVIDERS,
        defaultFirebase('https://ng2-webrtc-demo.firebaseio.com/'),
        // Initialize Firebase app  
        /*defaultFirebase({
            apiKey: 'AIzaSyC8z3wteLPSF9MtSsI_5tWiy-dnaeyR4So',
            authDomain: 'ng2-webrtc-38018.firebaseapp.com',
            databaseURL: 'https://ng2-webrtc-38018.firebaseio.com',
            storageBucket: 'ng2-webrtc-38018.appspot.com',
        }),*/
        firebaseAuthConfig({
            provider: AuthProviders.Google,
            method: AuthMethods.Popup,
            remember: 'default',
            scope: ['email']
        }),
        WebRTCConfig, UserService, AuthService, WebRTCService]
})
class MyApp {
  @ViewChild(Nav) nav: Nav;

  // make HelloIonicPage the root (or first) page
  rootPage: any = HomePage;
  pages: Array<{title: string, component: any}>;

  constructor(
    private platform: Platform, private webRTC: WebRTCService, private authService:AuthService, private userService:UserService,
    private menu: MenuController
  ) {
    this.initializeApp();

    // set our app's pages
    this.pages = [
      { title: 'Home', component: HomePage },
    ];
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
      // Let's sign in first
            authService.login().then((user: User) => {
                // Chec is user exists
                userService.exists(user.id).then((value: boolean) => {
                    if (value) {
                        this._afterLogin(webRTC, user.id);
                    } else {
                        // Add user info
                        userService.create(user.id, user.displayName).then(() => {
                            this._afterLogin(webRTC, user.id);
                        }, (error) => {
                            console.log('Error', error);
                        });
                    }
                });
            });
    });
  }

  initializeApp() {
    
  }

  openPage(page) {
    // close the menu when clicking a link from the menu
    this.menu.close();
    // navigate to the new page if it is not the current page
    this.nav.setRoot(page.component);
  }

  private _afterLogin(webRTC: WebRTCService, userId: string) {
        // Create Peer
        webRTC.createPeer(userId);
        // Now change the rootPage to tabs
        this.rootPage = TabsPage;
    }
}

ionicBootstrap(MyApp);
