import {Component, ViewChild} from '@angular/core';
import {Platform, ionicBootstrap, Nav} from 'ionic-angular';
import {StatusBar} from 'ionic-native';
import {TabsPage} from './pages/tabs/tabs';

import { Page1 } from './pages/page1/page1';
import { Page2 } from './pages/page2/page2';

@Component({
    templateUrl: 'build/pages/menu/menu.html'
})
export class MyApp {
	@ViewChild(Nav) nav: Nav;

	rootPage: any;

	pages: Array<{title: string, component: any}>;

    constructor(private platform:Platform) {
        this.rootPage = TabsPage;

        platform.ready().then(() => {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            StatusBar.styleDefault();

        });

    }

	openPage(page) {
	  // Reset the content nav to have just this page
	  // we wouldn't want the back button to show in this scenario
	  this.nav.setRoot(page.component);
	}
}

ionicBootstrap(MyApp);
