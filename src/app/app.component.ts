import { Component, OnInit } from '@angular/core';

import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Platform, NavController } from '@ionic/angular';
import { LoadingController } from '@ionic/angular';
import { ServiceService } from './services/service.service';
import { AlertController } from '@ionic/angular';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit {
  public selectedIndex = 0;
  public appPages = [
    {
      title: 'Home',
      url: '/dashboard',
      icon: 'home'
    },
    {
      title: 'About Us',
      url: '/aboutus',
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
    },
    // {
    //   title: 'Contact Us',
    //   url: '/history',
    //   icon: 'call'
    // }
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
    private alertCtrl:AlertController
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

  async alertlogout() {
    let alert = await this.alertCtrl.create({
      message: 'Terimakasih Sudah Menggunakan Aplikasi Ngebengkel',
      buttons: [{text: 'OK',
                  handler: () => {
                  this.logout();
                }}],
      cssClass: 'my-class'
    });
    alert.present();
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
