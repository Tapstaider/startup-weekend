import {Component} from '@angular/core';
import {SoftPage} from '../softpage/softpage';
import {WinePage} from '../winepage/winepage';
import {BeerPage} from '../beerpage/beerpage';
import {HotPage} from '../hotpage/hotpage';

@Component({
  templateUrl: 'build/pages/tabs/tabs.html'
})
export class TabsPage {

  private tabsoft: any;
  private tabwines: any;
  private tabbeers: any;
  private tabhot: any;

  constructor() {
    // this tells the tabs component which Pages
    // should be each tab's root Page
    this.tabsoft = SoftPage;
    this.tabwines = WinePage;
    this.tabbeers = BeerPage;
	this.tabhot = HotPage;
  }
}
