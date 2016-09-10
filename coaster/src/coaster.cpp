#include <Arduino.h>
#include <PN532.h>
#include "coaster.h"
#include "nfc.h"
#include "bluetooth.h"

PN532 nfc(SCK, MISO, MOSI, SS);

int main() {
	init();
	if(!setup_principal()){
		// on bloque si probleme nfc shield
		while(1) delay(5000);
	}
	for(;;) loop();
	return 0;
}

boolean setup_principal() {
	
	//Serial.begin(9600);
	//Serial.println("Hello!");
	if(!setup_nfc(nfc)){
		return false;
	}
	setup_bluetooth();
	return true;
}


void loop(void) {
	char data=0;
	uint32_t id=lire_id_tag(nfc);
	if (id != 0) {
		//Serial.print("Read card #"); Serial.println(id);
		//lire_adresse_mac(nfc);
		envoyer_tag_verre(id);
		//Serial.print("toto\n");
	}
	delay(1000);
}

