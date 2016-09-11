import {Platform} from 'ionic-angular';
import {BluetoothSerial} from 'ionic-native';
import {Injectable} from "@angular/core";
import {CoasterWebservice} from './coasterWebservice'

@Injectable()
export class CoasterWireless {

  private coasterWebService:CoasterWebservice;

  constructor(private platform:Platform, private cwb:CoasterWebservice) {

    this.coasterWebService = cwb;

    platform.ready().then(() => {
      BluetoothSerial.isEnabled().then(() => {
        this.deviceDiscoveredListener()
          .then(listener => {
            this.deviceDiscoveredObservable(listener);
          }).catch(error => {
          console.error(error);
        });
        this.deviceDiscovery();
      }).catch(() => {
        BluetoothSerial.enable().then(() => {
          this.deviceDiscoveredListener()
            .then(listener => {
              this.deviceDiscoveredObservable(listener);
            }).catch(error => {
            console.error(error);
          });
          this.deviceDiscovery();
        }).catch(error => console.error(error));
      });
    });
  }

  private deviceDiscovery() {
    BluetoothSerial.discoverUnpaired().then(() => {
      setTimeout(this.deviceDiscovery, 2000);
    }).catch(error => {
      console.error(error);
      setTimeout(this.deviceDiscovery, 2000);
    });
  }

  private deviceAppear(dev) {
    if (dev.address === this.BTADDRESS) {
      console.log("FOUND COASTER!!");
      BluetoothSerial.pair(dev.address, this.BLUETOOTHPIN).then(() => {
        BluetoothSerial.connect(dev.address).subscribe(() => {
            setTimeout(() => {
              BluetoothSerial
                .available()
                .then(() => {
                    BluetoothSerial.read()
                      .then(s => this.coasterWebService.send(s))
                      .catch(e => console.error(e))
                  }
                )
                .catch(e => console.error(e));
            }, 2000);
          },
          (error) => console.error(error),
          () => console.log("FINISHED CONNECTING")
        );
      }).catch(error => console.error(error));
    }
    else {
      console.log(dev.address);
    }
  }

  public deviceDiscoveredListener() {
    return new Promise((resolve) => {
      resolve(BluetoothSerial.setDeviceDiscoveredListener());
    });
  }

  public deviceDiscoveredObservable(observable) {
    observable.subscribe(
      device => this.deviceAppear(device),
      error => console.error(error),
      () => console.log("FINISHED")
    );
  }

  private BLUETOOTHPIN = "1234";
  private BTADDRESS = "20:16:05:05:47:87";
}
