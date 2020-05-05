import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { NavController, ModalController, LoadingController, ToastController,Platform } from '@ionic/angular';
import { ServiceService } from '../services/service.service';
import { AlertController } from '@ionic/angular';


@Component({
  selector: 'app-form-service',
  templateUrl: './form-service.page.html',
  styleUrls: ['./form-service.page.scss'],
})
export class FormServicePage implements OnInit {

  FormService:FormGroup;
  dataBook:any;
  id:string;
  data_mecanic:any;
  mecanic:any;

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
    let date: string = new Date().toTimeString();
    this.FormService=this.formBuilder.group({
        date:['',Validators.required],
        complaint:['',Validators.required],
        id_mecanic:['',Validators.required],
        address:['',Validators.required],
        city:['',Validators.required],
        jenis_kendaraan:['',Validators.required],
        plat:['',Validators.required],
    });
    this.driver();
  }

  async driver(){
    this.serviceService.getMecanic('mecanic').subscribe(
      (data:any)=>{
        this.mecanic = data.data_mecanic;
      }
    )
  }

  async booking(){
    let dataStorage=JSON.parse(localStorage.getItem('data'));
    let id = dataStorage.id;
    const loading = await this.loadingController.create({
      message: 'Please wait...'
    });
    await loading.present();
    this.serviceService.addBookService(this.FormService.value,'book',id).subscribe(
      data => {
        this.dataBook=data;
        if(this.dataBook.status=="error"){
          let message=this.dataBook.message;
          this.presentToast(message);
        }else{
          let message='your booking has been added';
          loading.dismiss();
          this.presentAlert(message);
          // this.navCtrl.navigateRoot('dashboard');
        }
      },
      error => {
        let message=this.dataBook.message;
        this.presentToast(message);
        loading.dismiss();
      }
    );
  }

  async presentToast(Message) {
    const toast = await this.toastController.create({
      message: Message,
      duration: 2500,
      position: "middle"
    });
    toast.present();
  }

  async presentAlert(Message) {
    let alert = await this.alertCtrl.create({
      message: Message,
      buttons: [{text: 'OK',
                  handler: () => {
                  this.navCtrl.navigateRoot('history');
                }}],
      cssClass: 'my-class'
    });
    alert.present();
  }

}
