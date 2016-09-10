import {Component} from '@angular/core';
import {Platform, ionicBootstrap} from 'ionic-angular';
import {StatusBar} from 'ionic-native';
import {TabsPage} from './pages/tabs/tabs';
import {BluetoothSerial} from 'ionic-native';
import {NFC, Ndef} from 'ionic-native';

const BTADDRESS = "20:16:05:05:47:87";

@Component({
    template: '<ion-nav [root]="rootPage"></ion-nav>'
})
export class MyApp {

    private rootPage:any;

    constructor(private platform:Platform) {
        this.rootPage = TabsPage;

        platform.ready().then(() => {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            StatusBar.styleDefault();

            NFC.addNdefListener(nfcEvent => {
                console.log("toto");
                console.log(nfcEvent.tag);

            }, failure => {
                console.log("ttii");
                console.log(failure)
            }).subscribe((data) => console.log(data),(error) => console.error(error),() => console.log('FINISHED'));

            NFC.addNdefFormatableListener(
                onSuccess => {
                    console.log(onSuccess);
                },
                onFailure => {
                    console.log(onFailure);
                }).subscribe((data) => console.log(data),(error) => console.error(error),() => console.log('FINISHED'));


            NFC.addTagDiscoveredListener('text/pg'
                , onSuccess => {
                    console.log(onSuccess);
                }, onFailure => {
                    console.log(onFailure);
                }).subscribe((data) => console.log(data),(error) => console.error(error),() => console.log('FINISHED'));


            NFC.enabled().then(e => {
                console.log(e);
            }).catch(e => console.error(e));

            NFC.showSettings().then(e => {
                console.log(e);
            }).catch(e => console.error(e));

            function deviceAppear(dev) {
                if (dev.address === BTADDRESS) {
                    console.log("FOUND COASTER!!");
                    BluetoothSerial.pair(dev.address, '1234').then(() => {
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

            function deviceDiscovery() {
                BluetoothSerial.discoverUnpaired().then(() => {
                    setTimeout(deviceDiscovery, 2000);
                }).catch(error => {
                    console.error(error);
                    setTimeout(deviceDiscovery, 2000);
                });
            }

            // BluetoothSerial.isEnabled().then(() => {
            // 	BluetoothSerial.setDeviceDiscoveredListener().subscribe(
            // 		device => deviceAppear(device),
            // 		error => console.error(error),
            // 		() => console.log("FINISHED")
            // 	);
            // 	deviceDiscovery();
            // }).catch(() => {
            // 	BluetoothSerial.enable().then(() => {
            // 		BluetoothSerial.setDeviceDiscoveredListener().subscribe(
            // 			device => deviceAppear(device),
            // 			error => console.error(error),
            // 			() => console.log("FINISHED")
            // 		);
            // 		deviceDiscovery();
            // 	}).catch(error => console.error(error));
            // });
        });
    }
}

ionicBootstrap(MyApp);
