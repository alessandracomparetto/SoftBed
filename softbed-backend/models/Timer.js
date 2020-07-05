let prenotazioneModel = require('../models/Prenotazione');
const nodemailer = require('nodemailer');

const DUEGIORNI=48*60*60*1000;

const softbed = {
    email: 'softengineers44@gmail.com',
    pass: 'softAdmin',
    site: 'http://localhost:3000/'
};

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: softbed.email,
        pass: softbed.pass
    }
});

class Timer{

    constructor() {
        this.array = [];
    }

    aggiungiTimeout(dati){

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
            </p>`
        };

        const mailGestore = {
            from: softbed.email,
            to: dati.emailGestore,
            subject: "Scadenza prenotazione",
            html:
                `<p>
                La richiesta di prenotazione (ID: ${dati.idPrenotazione}) per la struttura ${dati.nomeStruttura} non è stata confermata entro 48h.
                <br />
                <br />
                La tua struttura è stata nuovamente resa disponibile nel periodo interessato.
            </p>`
        };

        let idTimeout=setTimeout(function(){
            console.log("E' scaduto il timer");
            prenotazioneModel.rifiutaPrenotazione({"idPrenotazione" : dati.idPrenotazione}); //cancello la prenotazione
            //mando le email
            transporter.sendMail(mailOspite, (err, res) => {
                if (err) {console.log(err);}
            });

            transporter.sendMail(mailGestore, (err, res) => {
                if (err) {console.log(err);}
            });
        }, DUEGIORNI);
        this.array.push({"prenotazione":dati.idPrenotazione, "timeout":idTimeout});
    }

    distruggiTimeout(prenotazione){
        for(let i = 0; i<this.array; i++){
            if(this.array[i].prenotazione===prenotazione){
                clearTimeout(array[i].timeout); //stop al timer
                this.array.splice(i,1); //rimuove l'elemento di posto i
                return true;
            }
        }
        return false;
    }
}

module.exports = Timer;