#ifndef __nfc__
#define __nfc__

#define SCK 13
#define MOSI 11
#define SS 10
#define MISO 12

/*
on prepare le nfc shield et l'activation des lectures
*/
boolean setup_nfc(PN532 nfc);

/*
lis l'uuid du tag nfc
*/
uint32_t lire_id_tag(PN532 nfc);

#endif
