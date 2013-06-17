===========
Introducció
===========

Preàmbul
--------

Els Sistemes d'Informació Geogràfica (SIG) havien estat sistemes monolítics, tancats i complexos, altament especialitzats, dedicats a l'anàlisi del territori utilitzant tècniques numèriques.

*Google Maps* i *Google Earth*, junt amb la popularització dels receptors GPS, suposen un canvi paradigmàtic, on la informació geogràfica es popularitza, i ja no es percep com quelcom complex i obscur.

Les ancestrals solucions basades en sistemes propietaris monolítics es demostren poc eficaces per donar resposta a les noves necessitats de compartició d'informació geogràfica al web, entorn obert per definició on l'agilitat és condició necessària.

És en aquest context que emergeix un ecosistema d'eines de codi obert per donar resposta a la necessitat no coberta: posar la informació geogràfica al web. Malauradament aquestes eines continuen fortament condicionades per la concepció clàssica dels SIG, donant lloc a una miríada de "geoportals" i "visors de mapes" que, en el pitjor dels casos, aspiren a emular les eines SIG d'escriptori clàssiques, incomprensibles per a la inmensa majoria dels potencials usuaris, i, per tant, poc visitades.

Els estàndards que han de portar la informació geogràfica al web (OGC), lluny de facilitar-ne l'accés, obliguen a implementacions massa complexes, sovint defectuoses, i d'utilitat pràctica dubtosa. Allò que havia de portar la interoperabilitat es converteix en un llast per l'adopció generalitzada.

En aquests moments l'*spatial* ja no es pot permetre el luxe de continuar considerant-se a sí mateix com a *special*. La informació geogràfica constitueix un element més del web, al costat dels textos, les imatges o els vídeos, que juga en el mateix terreny i ha d'atendre a les mateixes normes.

Tot i això, la informació geogràfica continua sent una eina excel·lent per interpretar i comprendre un territori:

 * La cartografia posseeix un enorme poder comunicatiu,
 * La seva expressió digital permet afegir **interactivitat**, tant en la visualització de la informació com en la seva creació, i
 * Actua com a nexe entre el món digital i el món real.


Destinataris
------------

* Tècnics, del propi Consorci o externs.
* Ciutadans, del propi Besòs o de fora.


Objectius
---------

Aquest projecte assumeix doncs el repte de fugir de l'autisme del SIG i de la seva complexitat inherent, i valorarà el seu **èxit** en funció de la seva **utilitat** real.

No cal oblidar que aquest projecte s'emmarca dins dels objectius més generals del Consorci i també del seu Pla de Comunicació, que pretén canviar el caràcter de l'entorn del Besòs i millorar la percepció que en tenen els seus propis habitants.


Generals
........

Inspirant-nos en els principis de la Web 2.0 [#]_, el *Manifest per al desenvolupament àgil de programari*, els *principis de disseny de gov.uk* (vegeu apartat "Referents" al final d'aquest document), i en les tècniques d'emprenedoria lleugera (*Lean Startup*) [#]_:

.. [#] http://oreilly.com/web2/archive/what-is-web-20.html
.. [#] http://theleanstartup.com/principles

* Constatem que en un entorn complex i canviant no és factible planificar al detall un projecte de llarga durada amb garanties d'èxit, ja que es basa en un conjunt d'hipòtesis no contrastables.
* Cal adoptar una actitud (processos) que proporcioni la millor adaptabilitat possible a casos d'ús no previstos.
* Enlloc d'una única solució monolítica i atemporal, cal segmentar, i utilitzar en cada cas l'eina que millor respongui a cada necessitat en cada moment.
* Cal obtenir el màxim d'informació sobre l'ús que es fa de cada solució, per tal millorar de forma iterativa, i descartar aquelles solucions que no resultin vàlides.

Per altra banda, podriem caure en el parany de fragmentar i dispersar el coneixement entre un conjunt d'aplicacions de caducitat ràpida i incompatibles entre sí. Per tant, s'ha de procurar establir uns fonaments, que seran tant més duradors quant més dúctils siguin.


Específics
..........

Utilitat:

 * Les aplicacions han de respondre a una demanda o necessitat real i concreta.
 * Les aplicacions han de ser senzilles d'utilitzar (ergo optimitzades per al tipus de públic i cas d'ús que pretenen resoldre).

Agilitat:

 * Ha de ser possible adaptar-se a nous usos i demandes fàcil i ràpidament.
 * La operativa diària no pot dependre de la intervenció d'informàtics o programadors, o de limitacions tècniques que interrompin el flux de treball i la creativitat de qui en fa ús.

Col·laboració:

 * Les aplicacions han de facilitar la participació d'altres professionals (treball col·laboratiu) o de la ciutadania.
 * *Spatial is no more special*: Integració òptima amb la resta de la web social.

Dades obertes:

 * Cal procurar que tercers puguin integrar les dades a les seves pròpies aplicacions.
 * En qualsevol cas, s'ha de procurar un accés el més obert i directe possible a les dades crues.
