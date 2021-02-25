# SoftBed
Progetto per Programmazione web e mobile e Ingegneria del software (a.a. 2019/2020)
## Tema di Progetto 
Si richiede la progettazione di un sistema per il supporto alle attività di gestione e ricezione nel settore turistico delle case vacanza e B&B. 

### Descrizione generale del sistema
Si richiede di progettare e sviluppare un software di gestione di una struttura turistica tipo casa vacanza o B&B. Il software deve permettere di gestire le due fasi principali della prenotazione di una casa vacanza o un B&B, quella relativa al cliente e quella relativa al proprietario.
All’atto della prenotazione il sistema invia una mail di riepilogo al cliente ed al proprietario che può accettare o rifiutare la prenotazione.

Il proprietario di una casa vacanza o di un B&B deve poter inserire il suo appartamento con tutte le informazioni che possono essere necessarie per una buona pubblicizzazione dello stesso, comprese eventualmente delle fotografie. Tra le info che possono essere utili: descrizione delle forniture e descrizione del luogo con attenzione ai monumenti o ai luoghi di interesse turistico più vicini.

Il cliente deve poter effettuare la scelta utilizzando dei filtri

Il sistema deve offrire supporto per la parte economica e legale relativa all’affitto della casa o della stanza in B&B, ovvero è richiesto il pagamento di una tassa di soggiorno che può essere pagata all’atto della prenotazione oppure in loco. Il proprietario ha l’obbligo di comunicare alla Questura la presenza degli ospiti inviando i dati anagrafici e le foto dei documenti di riconoscimento, per questa parte si richiede che il software fornisca al proprietario la funzionalità adeguata per inserire i dati e inviarli al sistema della Questura. 
Il proprietario ha poi l’obbligo, ogni tre mesi, di rendicontare all’ufficio del turismo della città in cui fornisce il servizio l’ammontare delle tasse di soggiorno, le generalità degli ospiti ed il periodo.
Inoltre, si preveda che in ogni momento il proprietario possa verificare i guadagni ottenuti. 

Infine, per legge non può essere affittato un appartamento alla stessa persona per un ammontare cumulativo annuo di 28 giorni, si richiede quindi che il sistema effettui questo controllo.

Nota: il pagamento non va implementato ma solo progettato e per la parte riguardante le comunicazioni alla Questura ed al Settore Turismo del Comune si può simulare l’invio di una mail con i dati richiesti.

## Cosa è stato realizzato
- Servizi offerti sia al gestore che all’ospite 
  - Autenticazione e Registrazione: Funzionalità che permette agli utenti di creare il proprio account e autenticarsi. Ciò è necessario per accedere alle funzionalità principali del sistema (effettuare una richiesta di prenotazione, registrare e gestire una struttura). Durante la fase di registrazione l’utente seleziona la tipologia del proprio account: ospite o gestore.
  - Modifica dei dati personali: Attività di aggiornamento e/o inserimento delle informazioni relative all’utente che ha effettuato l’accesso.
  - Inserimento e rimozione dei metodi di pagamento: Il sistema permette all’utente che ha effettuato l’accesso di memorizzare uno o più metodi di pagamenti per poterli poi utilizzare rapidamente quando necessario. L'utente può rimuovere il metodo di pagamento precedentemente inserito.
- Servizi offerti al gestore 
  - Registrazione della propria struttura: Il gestore ha la possibilità di registrare la propria struttura, che sia B&B o casa vacanze, indicando tutte le informazioni richieste.
  - Modifica dei dati relativi alla struttura: Il gestore può, dalla propria area personale, accedere ad una struttura e modificarne alcune delle informazioni precedentemente inserite.
  - Calcolo dei guadagni: In ogni momento, il gestore può verificare quanto guadagnato in un determinato periodo accedendo all’apposita sezione dell’area personale.
  - Compilazione e invio del documento di dichiarazione degli ospiti: Il sistema offre un supporto per la compilazione del documento “Modulo Ospiti” che deve essere consegnato alla Questura del comune di appartenenza.
  - Compilazione e invio del rendiconto: Il sistema offre un supporto per la compilazione del documento “Rendiconto” che deve essere consegnato all’Ufficio del Turismo del comune di appartenenza.
  - Gestione delle prenotazioni: Il sistema permette al gestore di avere una vista d’insieme delle prenotazioni ricevute. Da questa può accedere a informazioni aggiuntive sulle singole prenotazioni, accettarle oppure rifiutarle.
- Servizi offerti all’ospite 
  - Ricerca delle strutture: L’ospite ha la possibilità di eseguire una ricerca tra tutte le strutture registrate, visualizzando solo quelle che rispondono alle sue esigenze. L’ospite può avere una vista generale sulle strutture adeguate.
  - Richiesta di prenotazione: Una volta trovata la struttura desiderata, l’ospite deve inviare una richiesta per informare il gestore della sua volontà di volervi alloggiare.
  - Annullamento prenotazione: Nel caso in cui l’ospite dovesse pentirsi della prenotazione effettuata può annullarla. Il sistema si occuperà della disdetta e della comunicazione al gestore.

## Strumenti utilizzati
Per la realizzazione di questa applicazione web è stato scelto di utilizzare come gestore di pacchetti JavaScript NPM (v6.14.5). Si è deciso di utilizzare il framework ExpressJS (v12.16.1) e la libreria di JavaScript ReactJS (v16.11.0) poiché entrambi semplificano lo sviluppo di applicazioni web e mobile.
Per la realizzazione delle interfacce grafiche, si è scelto di utilizzare il framework CSS Bootstrap (v4.5.0). 
Per gestire le richieste HTTP POST e GET tra client e server, si è utilizzata la libreria “axios” (v0.19.2).
MySQL, Express, React, NodeJS
Generazione di un certificato SSL è self-signed. 

## Più informazioni dai documenti
- RAD (Requirements Analysis Document) 
- ODD (Object Design Document)
- SDD (System Design Document)

## Come avviare SoftBed
Ecco la lista dei passi da seguire per avviare correttamente SoftBed
1. Importare il progetto dalla cartella Softbed su un IDE (opzionale).
2. Posizionarsi tramite terminale nella cartella <tt>/SoftBed/softbed-backend</tt>
3. Eseguire il comando <tt>npm install</tt>
4. Attendere il completamento dell’installazione.
5. Dopo aver aperto un’altra finestra del terminale, spostarsi nella cartella <tt>/SoftBed/softbed-frontend</tt>
6. Eseguire il comando <tt>npm install</tt>
7. Attendere il completamento dell’installazione.
8. Nella prima finestra di terminale, digitare <tt>npm start</tt>
9. Nella seconda finestra di terminale digitare <tt>HTTPS=true npm start</tt>
10. Tutto pronto! L'applicazione web sarà raggiungibile di default all’indirizzo <tt>https://localhost:3000</tt>.
