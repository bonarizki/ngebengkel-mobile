import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { tap, timeout } from 'rxjs/operators';
import { ReplaySubject } from 'rxjs';
import { Platform, ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  DataLogin:any;
  DataCheckLogin:any;
  authenticationState = new ReplaySubject();
  token:any;

  API_URL = 'http://localhost/ngebengkel/api/'; 
  
  TOKEN_KEY = 'token';

  constructor(
    private http: HttpClient, 
    private platform: Platform,
    public toastController: ToastController
  ) {
    this.platform.ready().then(() => {
      this.checkToken();
    });
   }

  //ika token tidak ada maka authenticationState=false
  //jika token ada maka akan memanggil fungsi cekUser 
  checkToken() {
    if(localStorage.getItem(this.TOKEN_KEY)==null || localStorage.getItem(this.TOKEN_KEY)=='') {
      this.authenticationState.next(false);     
    }else{
      this.CekUser().subscribe(data => {
        this.DataCheckLogin=data;
        if(this.DataCheckLogin.status=="success"){
          this.authenticationState.next(true);          
        }else{
          this.authenticationState.next(false);
        }
     },
     err => {
        this.authenticationState.next(false);
      });
    }                                                                                                      
  }

  //cek user di sisi server dengan headers authorize bearer
  //teman-teman dapat membuat fungsi baru untuk request data lainnya dengan header authorize bearer
  CekUser(){
    //ambil data dari localstorage
    let dataStorage=JSON.parse(localStorage.getItem(this.TOKEN_KEY));
    let dataStorage2=JSON.parse(localStorage.data);
     this.token=dataStorage.token;    
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': "Bearer "+this.token
      });   
      return this.http.get(this.API_URL + 'validate/'+dataStorage2.id, { headers: headers }).pipe(
        timeout(8000),
        tap(Data => {
          return Data;
        })
      );
  }

  //login
  loginApi(credentials, type){  
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    return this.http.post(this.API_URL + type, credentials, { headers: headers }).pipe(
      tap(Data => {
        this.DataLogin=Data;
        if(this.DataLogin[0].status=="success"){
          localStorage.setItem(this.TOKEN_KEY, JSON.stringify(this.DataLogin[0].token));
          localStorage.setItem('data', JSON.stringify(this.DataLogin[0].data));
          this.authenticationState.next(true);
        }else{
          this.authenticationState.next(false);
        }
        return Data;
      })
    );
  }

  //register
  RegisterApi(credentials, type){    
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    return this.http.post(this.API_URL + type , credentials, { headers: headers }).pipe(
      tap(Data => {
        this.DataLogin=Data;
        if(this.DataLogin.status=="success"){
          localStorage.setItem(this.TOKEN_KEY, JSON.stringify(Data));
          this.authenticationState.next(true);
        }else{
          this.authenticationState.next(false);
        }
        return Data;
      })
    );
  }

  addBookService(credentials,type,id){
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin':'*',
      'Access-Control-Allow-Methods': 'POST',
      'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    });
    var dateFormat = credentials.date.split('T')[0];
    const newcredentials = {
      'date_book':dateFormat,
      'complaint':credentials.complaint,
      'id_mecanic':credentials.id_mecanic,
      'id_user':id
    }
    return this.http.post(this.API_URL + type , newcredentials, { headers: headers }).pipe(
      tap(Data => {
        return Data;
      })
    );
  }

  historyUser(type,id){
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin':'*',
      'Access-Control-Allow-Methods': 'POST',
      'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    });

    return this.http.get(this.API_URL + type + '/' +id , { headers: headers }).pipe(
      tap(Data => {
        return Data;
      })
    );
  }

  getMecanic(type){
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin':'*',
      'Access-Control-Allow-Methods': 'POST',
      'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    });

    return this.http.get(this.API_URL + type, { headers: headers }).pipe(
      tap(Data => {
        return Data;
      })
    );
  }

  checkService(type,id){
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin':'*',
      'Access-Control-Allow-Methods': 'POST',
      'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    });

    return this.http.get(this.API_URL + type +'/'+id, { headers: headers }).pipe(
      tap(Data => {
        return Data;
      })
    );
  }

  rating(type,id_service,rate){
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin':'*',
      'Access-Control-Allow-Methods': 'POST',
      'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    });

    return this.http.get(this.API_URL + type +'/'+id_service+'/'+rate, { headers: headers }).pipe(
      tap(Data => {
        return Data;
      })
    );
  }

  getDetail(type,id){
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin':'*',
      'Access-Control-Allow-Methods': 'POST',
      'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    });

    return this.http.get(this.API_URL + type +'/'+id, { headers: headers }).pipe(
      tap(Data => {
        return Data;
      })
    );
  }

  //logout
  logout() {
    this.authenticationState.next(false);
  }
}