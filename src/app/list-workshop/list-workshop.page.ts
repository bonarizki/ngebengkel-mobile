import { Component, OnInit } from '@angular/core';
import {NavController, NavParams,ModalController} from '@ionic/angular';
import { LocationPage } from '../location/location.page';


@Component({
  selector: 'app-list-workshop',
  templateUrl: './list-workshop.page.html',
  styleUrls: ['./list-workshop.page.scss'],
})
export class ListWorkshopPage implements OnInit {
  public toko = [
    'Riverside Bengkel',
    'Sejahtera Motor',
    'Dua Sekawan'
  ];
  constructor(
    private modalController : ModalController,
  ) {}

  ngOnInit() {
  }

  async DetailLocation(toko) {
    const modal = await this.modalController.create({
      component: LocationPage,
      componentProps: {
        'toko': toko,
      }
    });
    return await modal.present();
  }

  

}
