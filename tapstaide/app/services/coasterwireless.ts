import {Component} from '@angular/core';
import {Platform} from 'ionic-angular';
import {BluetoothSerial} from 'ionic-native';
import {Injectable} from "@angular/core";
import {CoasterWebservice} from './coasterwebservice'
import {Observable} from "rxjs/Rx";
import {observableToBeFn} from "rxjs/testing/TestScheduler";

@Injectable()
@Component({
  providers: [CoasterWebservice]
})

export class CoasterWireless {

  private platform:Platform;
  private coasterWebService:CoasterWebservice;
  public BLUETOOTHPIN = "1234";
  public BTADDRESS = "20:16:05:05:47:87";

  constructor(private pf:Platform, private cwb:CoasterWebservice) {
    this.platform = pf;
    this.coasterWebService = cwb;
  }

  public listen() {
    this.platform.ready().then(() => {
      BluetoothSerial.isEnabled()
        .then(()=> {
          console.log('ici3');
          this.deviceDiscovery();
        }).catch(() => {
        BluetoothSerial.enable()
          .then(()=> {
            console.log('ici4');
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

  public connect(device) {

    return new Promise((resolve, reject) => {
      BluetoothSerial.pair(device.address, this.BLUETOOTHPIN).then(() => {
        console.log('pairing');
        BluetoothSerial.connect(device.address).subscribe(() => {
            console.log('connect');

            setTimeout(() => {
              BluetoothSerial
                .available()
                .then(() => {
                    BluetoothSerial.read()
                      .then(s => resolve(s))
                      .catch(e => reject(e))
                  }
                )
                .catch(e => reject(e));
            }, 2000);
          },
          (error) => reject(error),
          () => console.log("FINISHED CONNECTING")
        );
      }).catch(error => reject(error));
    });
  }

  public deviceDiscoveredListener() {
    return BluetoothSerial.setDeviceDiscoveredListener();
  }
}
