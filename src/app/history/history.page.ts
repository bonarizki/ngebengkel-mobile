import { Component, OnInit,ViewChild  } from '@angular/core';
import { ServiceService } from '../services/service.service';
import { AlertController } from '@ionic/angular';
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { NavController, ModalController, LoadingController, ToastController,Platform } from '@ionic/angular';
import { DetailPage } from '../detail/detail.page';


@Component({
  selector: 'app-history',
  templateUrl: './history.page.html',
  styleUrls: ['./history.page.scss'],
})
export class HistoryPage implements OnInit {
  public history:string = '';
  public data:any;
  public data_history:any;
  public id_service:any;

  constructor(
    private formBuilder: FormBuilder, 
    public loadingController: LoadingController,
    private serviceService: ServiceService,
    public toastController: ToastController,
    public modalController: ModalController,
    private alertCtrl: AlertController,
    private navCtrl:NavController

  ) { }

  ngOnInit() {
    let dataStorage=JSON.parse(localStorage.getItem('data'));
    let id = dataStorage.id;
    this.serviceService.historyUser('history',id).subscribe(
      (data:any) => {
        this.history=data.data_history
      }
    );
    this.cekDone(id);
    // this.presentAlert();
  }

  async presentAlert() {
    const alert =await this.alertCtrl.create({
      // header: 'Give Rating Of Our Mechanic',
      subHeader: 'Give Rating Of Our Mechanic',
      cssClass: 'alertstar',
      buttons: [
          { text: '1 = Tidak Memuaskan',cssClass: 'alertstar', handler: data => {this.rating(2);}},
          { text: '2 = Sedikit Memuaskan', handler: data => { this.rating(2);}},
          { text: '3 = Biasa - Biasa Saja', handler: data => { this.rating(3);}},
          { text: '4 = Agak Memuaskan', handler: data => { this.rating(4);}},
          { text: '5 = Sangant Memuaskna', handler: data => { this.rating(5);}}
      ]
    });
    alert.present();
  }

  cekDone(id){
    this.serviceService.checkService('cek',id).subscribe(
      (data:any) => {
        var newData = data.data;
        this.showRate(newData);
      }
    )
  }

  rating(rate){
    this.serviceService.rating('insrate',this.id_service,rate).subscribe(
      (data:any) => {
        if(data.status=='success'){
          this.presentAlert2(data.message);
        }
      }
    )
  }

  showRate(data)
  {
    if(data.length>0){
      this.id_service = data[0].id_service;
      this.presentAlert();
    }
  }

  async presentAlert2(message) {
    const alert = await this.alertCtrl.create({
      header: 'Alert',
      // subHeader: 'Subtitle',
      message: message,
      buttons: ['OK']
    });

    await alert.present();
  }
  
  async DetailModal(id_service) {
    const modal = await this.modalController.create({
      component: DetailPage,
      componentProps: {
        'id': id_service,
      }
    });
    return await modal.present();
  }

}
