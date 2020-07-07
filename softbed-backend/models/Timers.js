const nodemailer = require('nodemailer');
let prenotazioneModel = require('../models/Prenotazione');

const softbed = {
    email: 'softengineers44@gmail.com',
    pass: 'softAdmin',
    site: 'https://localhost:3000/'
};

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: softbed.email,
        pass: softbed.pass
    }
});

class Timers{

    constructor() {
        this.rendiconto = [];
        this.prenotazione = [];
    }

    aggiungiTimeoutRendiconto(dati){
        console.log("avvio il timer RENDICONTO")
        const mailGestore = {
            from: softbed.email,
            to: dati.emailGestore,
            subject: "Scadenza del rendiconto trimestrale",
            html:
                `<p>
                Ti ricordiamo che tra 15 giorni scadrà il termine ultimo per effettuare il rendiconto trimestrale alla Questura per la tua struttura ${dati.nomeStruttura}.
                Non dimenticarlo!
                <br />
                <br />
                <em>Il Team di SoftBed</em>
            </p>`
        };

        let idTimeout = this.setDaysTimeout(function() {
            console.log("E' scaduto il timer RENDICONTO");
            transporter.sendMail(mailGestore, (err, res) => {
                if (err) {console.log(err);}
            });
        }, 75);
        //ricordiamo al gestore 15 giorni prima della scadenza che deve effettuare il rendiconto trimestrale
        this.rendiconto.push({"struttura":dati.idStruttura, "timeout":idTimeout});
    }

    aggiungiTimeoutPrenotazione(dati){
        console.log("avvio il timer PRENOTAZIONE")
        const mailOspite = {
            from: softbed.email,
            to: dati.emailOspite,
            subject: "Scadenza prenotazione",
            html:
                `<p>
                Purtroppo il gestore della struttura ${dati.nomeStruttura} per cui avevi fatto richiesta di prenotazione (ID: ${dati.idPrenotazione})
                il cui check-in era previsto in data ${new Date(dati.checkIn).toLocaleDateString()} non ha confermato la richiesta.
                <br />
                <br />
                 <em>Il Team di SoftBed</em>
            </p>`
        };

        const mailGestore = {
            from: softbed.email,
            to: dati.emailGestore,
            subject: "Scadenza prenotazione",
            html:
                `<p>
                La richiesta di prenotazione (ID: ${dati.idPrenotazione}) per la struttura ${dati.nomeStruttura} non è stata confermata entro 48h.
                <br/>
                La tua struttura è stata nuovamente resa disponibile nel periodo interessato.
                <br />
                <br />
                <em>Il Team di SoftBed</em>
            </p>`
        };

        let idTimeout = this.setDaysTimeout(function() {
            console.log("E' scaduto il timer PRENOTAZIONE");
            prenotazioneModel.rifiutaPrenotazione({"idPrenotazione" : dati.idPrenotazione}); //cancello la prenotazione
            //mando le email
            transporter.sendMail(mailOspite, (err, res) => {
                if (err) {console.log(err);}
            });

            transporter.sendMail(mailGestore, (err, res) => {
                if (err) {console.log(err);}
            });
        }, 2);

        this.prenotazione.push({"prenotazione":dati.idPrenotazione, "timeout":idTimeout});
    }

    aggiornaTimeoutRendiconto(idStruttura){
        for(let i = 0; i<this.rendiconto.length; i++){
            if(this.rendiconto[i].struttura===idStruttura){
                clearTimeout(this.array[i].timeout); //stop al timer
                this.rendiconto.splice(i,1); //rimuove l'elemento di posto i
                this.aggiungiTimeoutRendiconto(idStruttura); //avvio il timeout
            }
        }
    }

    distruggiTimeoutPrenotazione(prenotazione){
        for(let i = 0; i<this.prenotazione.length; i++){
            if(this.prenotazione[i].prenotazione===prenotazione){
                clearTimeout(this.prenotazione[i].timeout); //stop al timer
                this.prenotazione.splice(i,1); //rimuove l'elemento di posto i
            }
        }
    }

    setDaysTimeout(callback,days) {
        // 86400 secondi in un giorno
        let msInDay = 86400*1000;
        let dayCount = 0;
        let timer = setInterval(function () {
            dayCount++;  // a day has passed

            if (dayCount === days) {
                clearInterval(timer);
                callback.apply(this, []);
            }
        }, msInDay);
    }

}

module.exports = Timers;
