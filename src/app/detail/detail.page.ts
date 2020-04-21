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

  @ViewChild('map',{static: true}) mapElement: ElementRef;
  map: any;
  start = 'chicago, il';
  end = 'chicago, il';
  directionsService = new google.maps.DirectionsService;
  directionsDisplay = new google.maps.DirectionsRenderer;
  id_servis : any;
  data : any;
  nativeElement:any
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
    this.initMap();
  }
  

  getDetail(id){
    this.ServiceService.getDetail('detailHistory',id).subscribe(
      (data:any)=>{
        this.data=data.data;
    })
  }

  dismissDetail(){
    this.modalController.dismiss();
  }

  ionViewDidLoad(){
    this.initMap();
  }

  initMap() {
    this.map = new google.maps.Map(this.mapElement.nativeElement, {
      zoom: 7,
      center: {lat: 41.85, lng: -87.65}
    });
    this.directionsDisplay.setMap(this.map);
    console.log(this.directionsDisplay)
    
  }

  calculateAndDisplayRoute() {
    this.directionsService.route({
      origin: this.start,
      destination: this.end,
      travelMode: 'DRIVING'
    }, (response, status) => {
      if (status === 'OK') {
        this.directionsDisplay.setDirections(response);
      } else {
        window.alert('Directions request failed due to ' + status);
      }
    });
  }

}
