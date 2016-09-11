import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {CoasterNfc} from '../../services/coasternfc';
import {CoasterWireless} from '../../services/coasterwireless';

@Component({
  templateUrl: 'build/pages/home/home.html',
  providers: [CoasterNfc, CoasterWireless]
})
export class HomePage {

  private coasterNfc:CoasterNfc;
  private coasterWireless:CoasterWireless;
  tag:string;

  constructor(private navCtrl:NavController, private cn:CoasterNfc, private cw:CoasterWireless) {
    this.coasterNfc = cn;
    this.coasterWireless = cw;
    this.coasterNfc.render(data => {
      console.log('home', data);
      this.tag = data;

      // this is a fake :)
      this.coasterWireless.deviceDiscoveredListener()
        .then(listener => {
          this.coasterWireless.deviceDiscoveredObservable(listener);
        }).catch(error => {
        console.error(error);
      });

    }, error => {
      console.error(error);
    });
  }
}
