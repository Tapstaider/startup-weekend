#include <Arduino.h>
#include "bluetooth.h"


void setup_bluetooth(){
	Serial.begin(9600);
}

void envoyer_tag_verre(uint32_t id_tag_verre){
	//Serial.print("tagv:");
	Serial.print(String(id_tag_verre));
	//Serial.print("\n");
	Serial.flush();
}
