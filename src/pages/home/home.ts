import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
//import { HTTP } from '@ionic-native/http';
import { Network } from '@ionic-native/network';
import { OpenNativeSettings } from '@ionic-native/open-native-settings';
import { Device } from '@ionic-native/device';
import { AlertController } from 'ionic-angular';
import { NavController } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/timeout';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

id:any;
model:any;
nombre:any;
apellido:any;
no_emp="x";
serie:any;
img:any;
alert:any;
plat:any;
setting:any;
nav:any;
fecha:any;
splach:any;
timeOut:any;

constructor(public device: Device,platform: Platform,http: Http,network: Network,
	openNativeSettings: OpenNativeSettings,alertCtrl: AlertController,navCtrl: NavController, splashScreen:SplashScreen) {
  this.alert=alertCtrl;
	this.plat=platform;
	this.setting=openNativeSettings;
	this.nav = navCtrl;
  this.splach = splashScreen;
  this.fecha = new Date();
  this.fecha = this.fecha.getDate()+"/"+(this.fecha.getMonth()+1)+"/"+
               this.fecha.getFullYear()+"  "+this.fecha.getHours()+":"+
               this.fecha.getMinutes()+":"+this.fecha.getSeconds()+":"+
               this.fecha.getMilliseconds();
	platform.ready().then(() => {
	this.id=device.uuid;
  this.serie=device.serial;
  //this.id="246d567006a8559d";k
	if( this.id != null ){
		

  		if(network.type === 'wifi' ){
  			  http.get('http://10.19.35.89:8087/cgi-bin/applications/testApp/test.pl?id='+this.id)
            .timeout(2000)
            .map(res => res.json()).subscribe(data => {
                this.model=device.model;
                this.nombre = data.nombre;
                this.no_emp = data.no_emp;
            },
            err => {
                 if(err == "TimeoutError: Timeout has occurred"){
                     this.showAlertWifi("ERROR DE RED","Por favor conectese a la Red BYODTest o intentelo mas tarde");  
                 }else{
                  navCtrl.setRoot('SecondPage',{id: this.id,serie: this.serie});
                 }
                  
            });


  		}else{
			this.showAlertWifi("ERROR DE RED","Por favor conectese a la Red BYODTest");	
			
  		}

  	}else{

  		this.showAlert("ERROR DE DISPOSITIVO","No se pudo obtener id favor de contactar a CIM");


  	}
  	});
  	 network.onDisconnect().subscribe(() => {

  			this.showAlert("WARNING","Se desconecto de la red");
	});


 }


showAlert(title,text) {
    let confirm  = this.alert.create({
      title: title,
      subTitle: text,
      buttons: [{
          text: 'OK',  
          handler: () => {
            this.plat.exitApp();
          }
        }]
    });
    confirm.present();
  }

showAlertWifi(title,text) {
    let confirm  = this.alert.create({
      title: title,
      subTitle: text,
      buttons: [{
          text: 'OK',
          handler: () => {
            this.setting.open('wifi');
            this.plat.exitApp();
          }
        }]
    });
    confirm.present();
  }

reload(){
this.splach.show();
window.location.reload();
}




}
