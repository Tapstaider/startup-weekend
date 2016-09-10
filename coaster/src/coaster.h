#ifndef __coaster__
#define __coaster__

/*
fonction principale qui initialise l'arduino, execute le setup et lance la boucle d'execution
*/
int main();

/*
setup principal et execute les autres setup
*/
boolean setup_principal();
/*
boucle d'execution principal qui est appelé toutes les 500ms
*/
void loop();

#endif
