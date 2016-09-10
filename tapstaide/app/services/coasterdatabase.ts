import { Injectable } from '@angular/core';

import { SQLite } from 'ionic-native';

@Injectable()
export class CoasterDatabase {
	private DBNAME = 'tapstaide.db';

	private db : SQLite;

	constructor() {
		this.db = new SQLite();
		this.db.openDatabase({name: this.DBNAME, location: 'default'})
		.then(() => {
			this.createTables();
		}).catch((error) => console.error(error));
	}

	private createTables() {
		this.db.executeSql(
			'CREATE TABLE table IF NOT EXISTS consommation('
			+ 'id INTEGER PRIMARY KEY,'
			+ 'rfid TEXT not null,'
			+ 'weight INTEGER'
			+ 'created_at DATETIME DEFAULT CURRENT_TIMESTAMP'
			+ ')',
			[]
		).catch((error) => console.error(error));
	}

	public setConsommation(rfid: String,weight?: Number) {
		// this.db.executeSql(
		// 	'INSERT INTO table('
		// 	+ 'rfid,weight'
		// 	+ ''
		// );
	}
}
