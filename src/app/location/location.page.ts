import { Component, OnInit } from '@angular/core';
import {NavController, NavParams,ModalController} from '@ionic/angular';
import { DomSanitizer } from '@angular/platform-browser';


@Component({
  selector: 'app-location',
  templateUrl: './location.page.html',
  styleUrls: ['./location.page.scss'],
})
export class LocationPage implements OnInit {

  toko : any;
  constructor(
    public navParams: NavParams,
    private modalController : ModalController,
  ) {}

  ngOnInit() {
    this.toko = this.navParams.get('toko');
  }

  dismissDetail(){
    this.modalController.dismiss();
  }

}
