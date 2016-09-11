import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  templateUrl: 'build/pages/winepage/winepage.html'
})
export class WinePage {
	capacity = {
		true: '50cl',
		false: '30cl'
	};
	capacityToggle = true;

	Wine = [
		{name:'Domaine Lécheneaut',price_25cl:'2€',price_50cl: '4€',img:'build/img/wine/Domaine Lécheneaut.png'},
		{name:'Domaine tremblay',price_25cl:'2€',price_50cl: '4€',img:'build/img/wine/Domaine_tremblay.png'},
		{name:'Edmond jacquin & fils',price_25cl:'2€',price_50cl: '4€',img:'build/img/wine/Edmond jacquin & fils.png'},
		{name:'Valentin Zusslin',price_25cl:'2€',price_50cl: '4€',img:'build/img/wine/Valentin Zusslin.png'},
		{name:'Domaine de la Présidente',price_25cl:'2€',price_50cl: '4€',img:'build/img/wine/domaine de la presidente.png'},
		{name:'Domaine d\'hondrat.png',price_25cl:'2€',price_50cl: '4€',img:'build/img/wine/Domaine d\'hondrat.png'},
		{name:'Domaines Latrille',price_25cl:'2€',price_50cl: '4€',img:'build/img/wine/Domaines Latrille.png'},
		{name:'Faugères Amour 2014',price_25cl:'2€',price_50cl: '4€',img:'build/img/wine/Faugères_Amour_2014.png'},
		{name:'Rince Cochon',price_25cl:'2€',price_50cl: '4€',img:'build/img/wine/domaine de la Botte.png'},
		{name:'Logo Domaine Moulinier',price_25cl:'2€',price_50cl: '4€',img:'build/img/wine/logo-domaine-moulinier.png'},
	];
  constructor(public navCtrl: NavController) {
  }
}
