import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {CoasterNfc} from '../../services/coasternfc';

@Component({
    templateUrl: 'build/pages/home/home.html',
    providers: [CoasterNfc]
})
export class HomePage {

    private coasterNfc:CoasterNfc;
    tag:string;

    constructor(private navCtrl:NavController, private cn:CoasterNfc) {
        this.coasterNfc = cn;
        this.coasterNfc.render(data => {
            console.log('home', data);
            this.tag = data;
        }, error => {
            console.error(error);
        });
    }
}
