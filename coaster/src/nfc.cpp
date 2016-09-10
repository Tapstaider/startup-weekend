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

void ecrire_adresse_mac(PN532 nfc){
	uint32_t id = nfc.readPassiveTargetID(PN532_MIFARE_ISO14443A);
	uint8_t keys[]= {0xFF,0xFF,0xFF,0xFF,0xFF,0xFF};
	uint8_t writeBuffer[]={0x20,0x16,0x05,0x05,0x47,0x87};
	if(nfc.authenticateBlock(1, id ,0x08,KEY_A,keys)){
		uint8_t written = nfc.writeMemoryBlock(1,0x08,writeBuffer); // Write writeBuffer[] to block 0x08
		if(written){
			Serial.println("Write Successful");   
		}
	}
}

uint8_t* lire_adresse_mac(PN532 nfc){
	uint8_t block[6];
	uint8_t keys[]= {0xFF,0xFF,0xFF,0xFF,0xFF,0xFF};
	if(nfc.authenticateBlock(1, lire_id_tag(nfc) ,0x08,KEY_A,keys)){
		if(nfc.readMemoryBlock(1,0x08,block)){
			Serial.println("Read block 0x08:");   
			//if read operation is successful
			for(uint8_t i=0;i<6;i++){
				//print memory block
				Serial.print(block[i],HEX);
				Serial.print(" ");
			}
			Serial.println();
		}
	}
	return block;
}
