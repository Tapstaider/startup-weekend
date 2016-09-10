import {Component} from '@angular/core';
import {Platform, ionicBootstrap} from 'ionic-angular';
import {StatusBar} from 'ionic-native';
import {TabsPage} from './pages/tabs/tabs';
import { BluetoothSerial } from 'ionic-native';
import {CoasterWireless} from './services/coasterwireless';

@Component({
	template: '<ion-nav [root]="rootPage"></ion-nav>'
})
export class MyApp {

	private rootPage: any;

	constructor(private platform: Platform) {
		this.rootPage = TabsPage;

		platform.ready().then(() => {
			// Okay, so the platform is ready and our plugins are available.
			// Here you can do any higher level native things you might need.
			StatusBar.styleDefault();
      let coasterwireless = new CoasterWireless(platform);

		});
	}
}

ionicBootstrap(MyApp);
