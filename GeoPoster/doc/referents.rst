=========
Referents
=========

Manifest per al desenvolupament àgil de programari
--------------------------------------------------

Estem posant al descobert millors maneres de desenvolupar programari. Fent-ho i ajudant a altres a fer-ho. Mitjançant aquesta feina hem acabat valorant:

  * **Individus i interaccions** per sobre de *processos i eines*.
  * **Programari que funciona** per sobre de *documentació exhaustiva*.
  * **Col·laboració amb el client** per sobre de la *negociació de contractes*.
  * **Resposta al canvi** per sobre de *cenyir-se a una planificació*.

És a dir, encara que els elements de la dreta tenen valor, nosaltres valorem més els de l’esquerra.


Principis de disseny de gov.uk
------------------------------

.. note: Traducció al català de https://www.gov.uk/designprinciples

Començar per les necessitats(*)
...............................

  (*)les dels usuaris, no les del govern

El procés de disseny ha de començar amb la identificació i pensant en les necessitats reals dels usuaris. Hem de dissenyar al voltant d'aquestes, no al voltant de la forma en què el "procés oficial" funciona en aquest moment. Hem d'entendre aquestes necessitats a fons, contrastant dades, no només fent suposicions, i hem de recordar que el que els usuaris demanen no sempre és el que necessiten.

*Per exemple, cal ser clar, destacant aquella informació que sabem que busca la majoria d'usuaris.*


Fer menys
.........

El Govern hauria de fer només el que el govern pot fer. Si algú altre ja ho està fent, enllacem-ho. Si som capaços de proporcionar els recursos (com APIs) per ajudar altres persones a construir coses, fem-ho. Ens hem de concentrar en el nucli irreductible.

*Proporcionarem millor servei i estalviarem diners concentrant els recursos allà on sigui més profitós.*


Dissenyar en base a dades
.........................

Habitualment no comencem de zero, els usuaris ja estan utilitzant els nostres serveis. Per tant podem aprendre del comportament del món real. Hem de fer-ho inicialment, però també assegurar-nos que continuarem fent-ho en el procés de desenvolupament: creació de prototips i proves, amb usuaris reals, al web i en viu. Hem de descobrir quins són els camins naturals en base a les dades recollides, i aplicar-los als nostres dissenys.

*Aquest és el gran avantatge dels serveis digitals: podem observar i aprendre de la conducta de l'usuari i adaptar els sistemes al comportament natural de la gent, enlloc d'obligar la gent a adaptar-se al sistema que haguem inventat.*


Treballar dur per fer-ho fàcil
..............................

Fer que alguna cosa sembli simple és fàcil; fer alguna cosa fàcil d'usar és molt més difícil, especialment quan els sistemes subjacents són complexes. Però això és el que hauríem d'estar fent.

*Un gran poder comporta una gran responsabilitat. Molt sovint les persones no tenen més remei que utilitzar els nostres serveis. Si no treballem dur perquè siguin senzills i útils, estem abusant d'aquest poder i estem fent perdre el temps a la gent.*

Iterar. I després tornar a iterar
.................................

La millor manera de construir serveis eficaços és començar amb poc i iterar com a bojos. Publicar quan abans el **Mínim Producte Viable**, testejar amb usuaris reals, i passar d'**Alfa** a **Beta** al **Llançament** afegint funcionalitats i millores en base als comentaris dels usuaris reals.

*La iteració minimitza el risc, reduint la probabilitat de cometre grans errors, i convertint els petits errors en lliçons. Així s'eviten els documents d'especificacions de 200 pàgines que poden ser un veritable coll d'ampolla. Novament, aquest és l'avantatge principal de la tecnologia digital: no estem construint ponts, les coses es poden modificar en qualsevol moment.*

Construir per a la inclusió
...........................

El disseny accessible és el bon disseny. Hem de construir un producte que sigui tan inclusiu, llegible i comprensible com sigui possible. Si hem de sacrificar l'elegància, que així sigui. No hem de tenir por del que és obvi, no hem de tractar de reinventar les convencions del disseny web, i hem de satisfer les expectatives amb claredat.

*Estem dissenyant per a tot el país, no només per als que estan acostumats a fer servir la web. De fet, les persones que més necessiten dels nostres serveis sovint són aquelles que els troben més difícils d'utilitzar. Si pensem en aquestes persones en primer lloc, farem un millor web per a tots.*

Comprendre el context
.....................

No estem dissenyant per a una pantalla, estem dissenyant per a la gent. Hem de pensar molt bé el context en el qual la gent està utilitzant els nostres serveis: Estan en una biblioteca? Accedeixen des d'un telèfon? Potser només se senten realment familiaritzats amb el Facebook? Han utilitzat mai la web abans?

*Estem dissenyant per a un grup molt divers d'usuaris amb tecnologies i necessitats molt diferents. Hem d'assegurar-nos que hem entès les circumstàncies tecnològiques i pràctiques en què s'utilitzen els nostres serveis. Altrament, correm el risc de dissenyar serveis maquíssims, però irrellevants per a la vida de les persones.*

Construir serveis digitals, no llocs web
........................................

El nostre servei no comença i acaba al nostre lloc web. Podria començar en un motor de cerca i acabar a una oficina de correus. Hem de dissenyar per a aquest entorn, tot i que no el poguem controlar. I cal assumir que un dia, abans d'adonar-nos-en, la nostra feina consistirà en proporcionar tota una altra mena de serveis digitals.

*No es tracta de fer llocs web, es tracta de proporcionar serveis digitals. En aquest moment, la millor manera d'oferir serveis digitals és a través del web, però això pot canviar, potser abans del que hàgim previst.*

Ser coherents, no uniformes
...........................

Sempre que sigui possible cal utilitzar el mateix llenguatge i els mateixos patrons de disseny, això ajuda a les persones a familiaritzar-se amb els nostres serveis. Ara bé, quan això no sigui possible, hem de garantir que la nostra manera d'adreçar-nos-hi sigui coherent. De tal manera que els nostres usuaris tinguin l'oportunitat d'intuir què és el que cal fer en cada moment.

*Això no és un llibre normatiu. No podrem construir grans serveis aplicant mecànicament una sèrie de receptes. No podem imaginar totes les situacions possibles i escriure'n les regles. Cada circumstància és diferent i ha de ser abordada en els seus propis termes. El que ha de relligar les coses, doncs, és un enfocament consistent, aquell que, amb sort, els usuaris  arribaran a aprendre i en el que confiaran, fins i tot a mesura que avancem cap a nous escenaris digitals.*

Treballar en obert millora les coses
....................................

Sempre que puguem, hem de compartir el que fem. Amb companys de feina, amb els usuaris, amb el món. Compartir codi, compartir dissenys, compartir idees, compartir intencions, compartir fracassos. Com més ulls hi ha posats en un servei, millor es torna: se'n descobreixen les pífies, s'identifiquen millors alternatives, s'apuja el llistó.

*En part perquè molt del que estem fent només ha estat possible gràcies al codi obert i a la generositat de la comunitat de dissenyadors web, i hi estem en deute. Però sobretot perquè a major obertura, millors serveis: millor compresos i més escodrinyats. Si regalem el nostre codi, se'ns retornarà en forma de millor codi. Per això estem compartint tot això...*
