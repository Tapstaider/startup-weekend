import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {CoasterNfc} from '../../services/coasternfc';
import {CoasterWireless} from '../../services/coasterwireless';
import {CoasterWebservice} from '../../services/coasterwebservice';

@Component({
  templateUrl: 'build/pages/scan/scan.html',
  providers: [CoasterNfc, CoasterWireless, CoasterWebservice]
})
export class ScanPage {

  private coasterNfc:CoasterNfc;
  private coasterWireless:CoasterWireless;
  tag:string;
  private loading:boolean = true;

  constructor(private navCtrl:NavController, private cn:CoasterNfc, private cw:CoasterWireless) {
    this.coasterNfc = cn;
    this.coasterWireless = cw;

    console.log('ici2');
    this.searchCoaster();
  }

  public searchCoaster() {

    let p = new Promise((resolve, reject) => {
      this.coasterNfc.render(data => {
        console.log('home', data);
        this.tag = data;
        this.coasterWireless.listen();

        resolve();
      }, error => {
        reject(error);
      });
    });

    this.coasterWireless.deviceDiscoveredListener()
      .subscribe(
        device => {
          p.then(() => {
            if (device.address === this.coasterWireless.BTADDRESS) {
              console.log('ici');
              this.coasterWireless.connect(device)
                .then(data => {
                  this.loading = false;

                  let s = String(data).split(/\r?\n/);
                  s = s[0].split(':');
                  
                  //todo : data to send
                  console.log(s[1]);
                  console.log(data);
                })
                .catch(e => {
                  console.error(e);
                });
            }
          });
        },
        error => console.error(error),
        () => console.log("FINISHED")
      );

  }
}
