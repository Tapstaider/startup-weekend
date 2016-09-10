#include <PN532.h>
#include "nfc.h"

boolean setup_nfc(PN532 nfc){
	nfc.begin();

	uint32_t versiondata = nfc.getFirmwareVersion();
	if (! versiondata) {
		Serial.print("Didn't find PN53x board");
		return false;
	}
	Serial.print("Found chip PN5"); Serial.println((versiondata>>24) & 0xFF, HEX);
	Serial.print("Firmware ver. "); Serial.print((versiondata>>16) & 0xFF, DEC);
	Serial.print('.'); Serial.println((versiondata>>8) & 0xFF, DEC);
	Serial.print("Supports "); Serial.println(versiondata & 0xFF, HEX);

	// configure board to read RFID tags and cards
	nfc.SAMConfig();
	return true;
}

uint32_t lire_id_tag(PN532 nfc){
	// look for MiFare type cards
	return nfc.readPassiveTargetID(PN532_MIFARE_ISO14443A);
}
