/*
Johann Lecocq(johann-lecocq.fr)
GNU GENERAL PUBLIC LICENSE version 2
version 1.0
*/

#ifndef __beeper__
#define __beeper__

struct Commande {
	byte note:4;
	byte octave:4;
	byte lenH;
	byte lenL;
};

void setup();

#endif
