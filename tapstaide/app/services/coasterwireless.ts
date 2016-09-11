import {Platform} from 'ionic-angular';
import { BluetoothSerial } from 'ionic-native';

export class CoasterWireless {
  constructor(private platform: Platform) {
    platform.ready().then(() => {
      BluetoothSerial.isEnabled().then(() => {
        BluetoothSerial.setDeviceDiscoveredListener().subscribe(
          device => this.deviceAppear(device),
          error => console.error(error),
          () => console.log("FINISHED")
        );
        this.deviceDiscovery();
      }).catch(() => {
        BluetoothSerial.enable().then(() => {
          BluetoothSerial.setDeviceDiscoveredListener().subscribe(
            device => this.deviceAppear(device),
            error => console.error(error),
            () => console.log("FINISHED")
          );
          this.deviceDiscovery();
        }).catch(error => console.error(error));
      });
    });
  }

  private deviceDiscovery() {
    BluetoothSerial.discoverUnpaired().then(() => {
      setTimeout(this.deviceDiscovery,2000);
    }).catch(error => {
      console.error(error);
      setTimeout(this.deviceDiscovery,2000);
    });
  }

  private deviceAppear(dev) {
    if (dev.address === this.BTADDRESS) {
      console.log("FOUND COASTER!!");
      BluetoothSerial.pair(dev.address, this.BLUETOOTHPIN).then(() => {
        BluetoothSerial.connect(dev.address).subscribe(
          (res) => console.log(res),
          (error) => console.error(error),
          () => console.log("FINISHED CONNECTING")
        );
      }).catch(error => console.error(error));
    }
    else {
      console.log(dev.address);
    }
  }

private BLUETOOTHPIN = "1234";
private BTADDRESS= "20:16:05:05:47:87";
}
