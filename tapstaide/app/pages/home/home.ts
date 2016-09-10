import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {CoasterNfc} from '../../services/coasternfc';

@Component({
    templateUrl: 'build/pages/home/home.html',
    providers: [CoasterNfc]
})
export class HomePage {

    private _coasterNfc:CoasterNfc;
    public _tag:string;

    constructor(private navCtrl:NavController, private coasterNfc:CoasterNfc) {
        this._coasterNfc = coasterNfc;
        this._coasterNfc.render(data => {
            console.log('home', data);
            this._tag = data;
        }, error => {
            console.error(error);
        });
    }
}
