import {NFC} from 'ionic-native';
import {Injectable} from "@angular/core";
import {Platform} from 'ionic-angular';

@Injectable()
export class CoasterNfc {
	private platform : Platform;
	constructor(private pf:Platform) {
		this.platform = pf;
	}
    public render(successCallback, errorCallback) {
		this.platform.ready().then(() => {
			NFC.addNdefFormatableListener(
				(data) => console.log(data),
				(error) => console.error(error)
			).subscribe(successCallback,errorCallback,() => console.log('FINISHED'));
		});
    }
}
