import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  templateUrl: 'build/pages/beerpage/beerpage.html'
})
export class BeerPage {

	capacity = {
		true: '50cl',
		false: '25cl'
	};
	capacityToggle = true;

	Beer = [
		{name:'1664',price_25cl:'2€',price_50cl: '4€',img:'build/img/beer/1664.png'},
		{name:'GRIMBERGEN',price_25cl:'2€',price_50cl: '4€',img:'build/img/beer/GRIMBERGEN.png'},
		{name:'Guiness',price_25cl:'2€',price_50cl: '4€',img:'build/img/beer/guiness.png'},
		{name:'Heineken',price_25cl:'2€',price_50cl: '4€',img:'build/img/beer/heineken.png'},
		{name:'Hoegaarden',price_25cl:'2€',price_50cl: '4€',img:'build/img/beer/hoegaarden.png'},
		{name:'Kwak',price_25cl:'2€',price_50cl: '4€',img:'build/img/beer/kwak.png'},
		{name:'Kasteel Triple',price_25cl:'2€',price_50cl: '4€',img:'build/img/beer/kasteel_triple.png'},
		{name:'Maredsous',price_25cl:'2€',price_50cl: '4€',img:'build/img/beer/maredsous.png'},
		{name:'Rince Cochon',price_25cl:'2€',price_50cl: '4€',img:'build/img/beer/rince_cochon.png'},
		{name:'Triple Karmeliet',price_25cl:'2€',price_50cl: '4€',img:'build/img/beer/triple_karmeliet.png'},
	];
  constructor(public navCtrl: NavController) {
  }
}
