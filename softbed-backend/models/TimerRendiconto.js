const nodemailer = require('nodemailer');

const GIORNI75=75*24*60*60*1000;
//ricordiamo al gestore che ha ancora 15 giorni per effettuare il rendiconto trimestrale alla questura

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

class TimerRendiconto{

    constructor() {
        this.array = [];
    }

    aggiungiTimeout(dati){
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

        let idTimeout=setTimeout(function(){
            console.log("E' scaduto il timer");
            //mando email
            transporter.sendMail(mailGestore, (err, res) => {
                if (err) {console.log(err);}
            });
        }, GIORNI75);
        this.array.push({"struttura":dati.idStruttura, "timeout":idTimeout});
    }

    aggiornaTimeout(idStruttura){
        for(let i = 0; i<this.array.length; i++){
            if(this.array[i].struttura===idStruttura){
                clearTimeout(this.array[i].timeout); //stop al timer
                this.array.splice(i,1); //rimuove l'elemento di posto i
                this.aggiungiTimeout(idStruttura); //avvio il timeout
            }
        }
    }
}

module.exports = TimerRendiconto;