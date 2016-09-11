import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  templateUrl: 'build/pages/beerpage/beerpage.html'
})
export class BeerPage {

	capacity = {
		true: '50cl',
		false: '30cl'
	};
	capacityToggle = true;
  constructor(public navCtrl: NavController) {
  }
}
