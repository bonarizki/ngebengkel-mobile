import { Component, OnInit,Input, ViewChild, ElementRef } from '@angular/core';
import {NavController, NavParams,ModalController} from '@ionic/angular';
import { ServiceService } from '../services/service.service';
import { Platform } from "@ionic/angular";

// import {NavParams} from '@angular/core';
declare var google;

@Component({
  selector: 'app-detail',
  templateUrl: './detail.page.html',
  styleUrls: ['./detail.page.scss'],
})
export class DetailPage implements OnInit {

  id_servis : any;
  data : any;
  constructor(
    public navParams: NavParams,
    private ServiceService : ServiceService,
    private modalController : ModalController,
    public platform: Platform,
    public navCtrl: NavController
    ) 
  { }

  ngOnInit() {
    this.id_servis = this.navParams.get('id');
    this.getDetail(this.id_servis);
  }
  

  getDetail(id){
    this.ServiceService.getDetail('detailHistory',id).subscribe(
      (data:any)=>{
        this.data=data.data;
        console.log(data)
    })
  }

  dismissDetail(){
    this.modalController.dismiss();
  }

  

}
