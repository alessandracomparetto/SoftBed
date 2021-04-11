# SoftBed
## Informazioni sul progetto
Il progetto è stato realizzato per i corsi di studio:
- Ingegneria del Software
- Programmazione web e mobile

nell'Anno Accademico 2019/2020 presso l'*Università degli Studi di Palermo*.

Il progetto *originale* con maggiori informazioni sulla consegna dello stesso
si trova nel branch principale 
([master](https://github.com/alessandracomparetto/SoftBed/tree/master/))
di questa stessa repository.


## Prologo 
A distanza di quasi un anno ho deciso di portare online l'applicazione web realizzata dal 
sottoscritto, 
[Salvatore Lo Coco](https://github.com/salvatorelococo/), e dalle colleghe 
[Alessandra Comparetto](https://github.com/alessandracomparetto/), 
[Mariagrazia Paladino](https://github.com/Mariagrazia98/) e 
[Sofia Catalano](https://github.com/sofiacatalano/).

Apportando le modifiche necessarie ho anche notato qua e là qualcosa che ad oggi avrei fatto diversamente per cui mi 
sono concesso di effettuare alcune modifiche *minori* supplementari.


## Modifiche apportate
### Cambio database
Una delle principali modifiche consiste nel **passaggio da un Database locale MySQL ad un database remoto PostgreSQL** 
fornito da [Heroku](https://www.heroku.com/) (utilizzato per l'hosting dell'applicazione).

A causa delle differente sintassi, ho scelto di effettuare un refactor dei nomi delle colonne da camel-case a 
lower-case; ciò, come effetto collaterale, ha portato anche alla modifica di alcune variabili e di alcuni URL.

Il middleware e le query, invece, sono stati adattati manualmente.


### Modifiche secondarie
Sono state effettuate alcune *piccole* modifiche stilistiche ai seguenti componenti React:
- Accesso
- Footer
- Registrazione

Inoltre sono state fatte modifiche al codice col fine di aumentarne la leggibilità (correzione della spaziatura, 
distribuzione di liste su più righe, rimozione elementi inutilizzati e ridondanze).