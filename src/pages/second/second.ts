import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the SecondPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-second',
  templateUrl: 'second.html',
})

export class SecondPage {
id:any;
serie:any;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  	this.id = navParams.get('id');
    this.serie = navParams.get('serie');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SecondPage');
  }


}
