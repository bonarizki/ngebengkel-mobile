import { Component, OnInit } from '@angular/core';

import { LoadingController,NavController } from '@ionic/angular';
import { ServiceService } from '../services/service.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {

  Username:any;
  constructor(
    public loadingController: LoadingController,
    private serviceService: ServiceService,
    private navCtrl: NavController
  ) {}

  ngOnInit() {
    //ambil data dari localstorage
    let dataStorage=JSON.parse(localStorage.getItem('data'));
    this.Username=dataStorage.Username;
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

  serviceroute(){
    this.navCtrl.navigateRoot('form-service');
  }

  historyroute(){
    this.navCtrl.navigateRoot('history');
  }

  aboutusroute(){
    this.navCtrl.navigateRoot('aboutus');
  }

  workshoproute(){
    this.navCtrl.navigateRoot('list-workshop');
  }

}
