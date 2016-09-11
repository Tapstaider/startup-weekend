import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  templateUrl: 'build/pages/softpage/softpage.html'
})
export class SoftPage {
	capacity = {
		true: '50cl',
		false: '30cl'
	};
	capacityToggle = true;
  constructor(public navCtrl: NavController) {
  }
}
