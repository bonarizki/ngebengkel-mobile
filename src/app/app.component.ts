import { Component, OnInit } from '@angular/core';

import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Platform, NavController } from '@ionic/angular';
import { LoadingController } from '@ionic/angular';
import { ServiceService } from './services/service.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit {
  public selectedIndex = 0;
  public appPages = [
    {
      title: 'About Us',
      url: '/folder/Inbox',
      icon: 'people'
    },
    {
      title: 'Service',
      url: '/form-service',
      icon: 'construct'
    },
    {
      title: 'History',
      url: '/history',
      icon: 'time'
    }
  ];
  Username: any;
  Email: any;
  // public labels = ['Family', 'Friends', 'Notes', 'Work', 'Travel', 'Reminders'];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private serviceService: ServiceService,
    private navCtrl: NavController,
    public loadingController: LoadingController,
  ) {
    this.initializeApp();
  }

   

  initializeApp() {
    this.platform.ready().then(() => {
       // let status bar overlay webview
      this.statusBar.overlaysWebView(true);
    
      // set status bar to white
      this.statusBar.backgroundColorByHexString('#ffffff');
      this.splashScreen.hide();
      this.Auth();
    });
  }

  ngOnInit() {
    const path = window.location.pathname.split('folder/')[1];
    if (path !== undefined) {
      this.selectedIndex = this.appPages.findIndex(page => page.title.toLowerCase() === path.toLowerCase());
    }
  }

  Auth(){
    this.serviceService.authenticationState.subscribe((data) => {
      if (data==true) {
          let dataStorage=JSON.parse(localStorage.getItem('data'));
          this.Username=dataStorage.Username;
          this.Email=dataStorage.Email;
          this.navCtrl.navigateRoot(['dashboard']);
        } else {
          this.navCtrl.navigateRoot(['login']);
        }
    });
  }

  async logout(){
    const loading = await this.loadingController.create({
      message: 'Please wait...'
    });
    await loading.present(); 
    localStorage.clear();
    this.serviceService.logout();
    loading.dismiss();
   }
}
