import {NFC} from 'ionic-native';
import {Injectable} from "@angular/core";

@Injectable()
export class CoasterNfc {

    static readNfc() {

        NFC.addNdefFormatableListener()
            .subscribe((data) => {
                console.log(data);
                var int32View = new Int32Array(data.tag.id, 8);
                console.log('2', int32View)
            }, (error) => console.error(error), () => console.log('FINISHED'));

        NFC.addTagDiscoveredListener('ndef-formatable')
            .subscribe((data) => console.log('1', data), (error) => console.error(error), () => console.log('FINISHED'));
    }

    public render(successCallback, errorCallback) {
        NFC.addNdefFormatableListener()
            .subscribe(successCallback, errorCallback, () => console.log('FINISHED'));

        NFC.addTagDiscoveredListener('ndef-formatable')
            .subscribe(successCallback, errorCallback, () => console.log('FINISHED'));
    }
}

