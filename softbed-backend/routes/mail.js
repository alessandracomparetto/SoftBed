const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const router = express.Router();
router.use(bodyParser.json());

const softbed = {
    email: 'softengineers44@gmail.com',
    pass: 'softAdmin',
    site: 'https://localhost:3000/'
}

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: softbed.email,
        pass: softbed.pass
    }
});


router.post('/invioDichiarazione', (req, res) => {

    let mailOptions = {
        from: req.body.email,
        to: "c.sofy1998@libero.it", //SIMULAZIONE EMAIL DELL'UFFICIO DELLA QUESTURA
        subject: "Dichiarazione ospiti questura",
        text: "Si inoltra in allegato quanto indicato in oggetto.",
        attachments: [
            {
                filename: 'dichiarazioneOspiti.pdf',
                path: req.body.allegato,
                contentType: 'application/pdf',
                encoding: 'base64'
            }
        ]
    };

    transporter.sendMail(mailOptions, (error, response) => {
        if (error) {
            res.send(error);

        }else{
            res.send('Success');
        }
    });
});

router.post('/invioRendiconto', (req, res) => {

    let mailOptions = {
        from: softbed.email,
        to: "c.sofy1998@libero.it", ////SIMULAZIONE EMAIL DELL'UFFICIO DEL TURISMO
        subject: "Dichiarazione rendiconto trimestrale",
        text: "Si inoltra in allegato quanto indicato in oggetto.",
        attachments: [
            {
                filename: 'rendicontoTrimestrale.pdf',
                path: req.body.allegato,
                contentType: 'application/pdf',
                encoding: 'base64'
            }
        ]
    };

    transporter.sendMail(mailOptions, (err, res) => {
    });

    res.send();
});

router.post('/richiesta-prenotazione', (req, res) => {
    const mailOspite = {
        from: softbed.email,
        to: req.body.emailOspite,
        subject: "Riepilogo richiesta di prenotazione",
        html:
            `<p>
                Ti ringraziamo per aver utilizzato <strong><a href="${softbed.site}">softbed</a></strong> per la scelta del tuo alloggio!
                <br />
                Il gestore ha 48 ore per accettare o declinare la tua richiesta.
                <br />
                In allegato trovi il riepilogo della tua richiesta.
                <br/>
                <br/>
                <em>Il Team di SoftBed</em>
            </p>`,
        attachments: [
            {
            filename: `riepilogo-prenotazione-${req.body.id}.pdf`,
            path: req.body.allegato,
            contentType: 'application/pdf',
            encoding: 'base64'
            }
        ]
    };

    const mailGestore = {
        from: softbed.email,
        to: req.body.emailGestore,
        subject: "Ricezione richiesta di prenotazione",
        html:
            `<p>
                Hai appena ricevuto una nuova richiesta di prenotazione su softbed! Accedi alla tua 
                <a href="${softbed.site}struttura/gestioneStrutture/">area personale</a> per accettarla o rifiutarla.
                <br />
                Ti ricordiamo che hai a disposizione 48 ore di tempo per prendere una decisione.
                <br/>
                <br/>
                <em>Il Team di SoftBed</em>
            </p>`
    };

    transporter.sendMail(mailGestore, (err, res) => {
        if (err) {
            res.status(err.status).send(err);
        }
    });

    transporter.sendMail(mailOspite, (err, res) => {
        if (err) {
            res.status(err.status).send(err);
        }
    });

    res.send();
});

router.post('/annullamento-prenotazione', (req, res) => {
    const mailOspite = {
        from: softbed.email,
        to: req.body.emailOspite,
        subject: "Annullamento prenotazione",
        html:
            `<p>
                La tua prenotazione (ID: ${req.body.id}) per la struttura ${req.body.struttura} è stata annullata, come da te richiesto!
                <br/>
                <br/>
                <em>Il Team di SoftBed</em>
            </p>`
    };

    const mailGestore = {
        from: softbed.email,
        to: req.body.emailGestore,
        subject: "Annullamento prenotazione",
        html:
            `<p>
                Purtroppo l'ospite che aveva effettuato la prenotazione (ID: ${req.body.id}) per la struttura 
                ${req.body.struttura} il cui check-in era previsto in data ${req.body.data} ha cambiato idea ed ha 
                annullato la sua prenotazione.
                <br />
                La tua struttura è stata nuovamente resa disponibile nel periodo interessato.
                <br/>
                <br/>
                <em>Il Team di SoftBed</em>
            </p>`
    };

    transporter.sendMail(mailOspite, (err, res) => {
        if (err) {
            res.status(err.status).send(err);
        }
    });

    transporter.sendMail(mailGestore, (err, res) => {
        if (err) {
            res.status(err.status).send(err);
        }
    });

    res.send();
})

router.post('/rifiuta-prenotazione', (req, res) => {
    const mailOspite = {
        from: softbed.email,
        to: req.body.emailOspite,
        subject: "Annullamento prenotazione",
        html:
            `<p>
                Purtroppo il gestore della struttura ${req.body.struttura} per cui avevi fatto richiesta di prenotazione (ID: ${req.body.id})
                il cui check-in era previsto in data ${req.body.data} ha rifutato la prenotazione.
                <br/>
                <br/>
                <em>Il Team di SoftBed</em>
            </p>`
    };

    const mailGestore = {
        from: softbed.email,
        to: req.body.emailGestore,
        subject: "Annullamento prenotazione",
        html:
            `<p>
                La prenotazione (ID: ${req.body.id}) per la struttura ${req.body.struttura} è stata annullata, come da te richiesto!
                <br/>
                <br/>
                <em>Il Team di SoftBed</em>
            </p>`
    };

    transporter.sendMail(mailOspite, (err, res) => {
        if (err) {
            res.status(err.status).send(err);
        }
    });

    transporter.sendMail(mailGestore, (err, res) => {
        if (err) {
            res.status(err.status).send(err);
        }
    });

    res.send();
})

router.post('/conferma-prenotazione', (req, res) => {
    console.log("body===================", req.body);
    const mailOspite = {
        from: softbed.email,
        to: req.body.emailOspite,
        subject: "Conferma prenotazione",
        html:
            `<p>
                Il gestore della struttura ${req.body.struttura} che hai prenotato (ID: ${req.body.id})
                il cui check-in è previsto in data ${req.body.data} ha accettato la prenotazione.
                <br/>
                <br/>
                <em>Il Team di SoftBed</em>
            </p>`
    };

    const mailGestore = {
        from: softbed.email,
        to: req.body.emailGestore,
        subject: "Conferma prenotazione",
        html:
            `<p>
                La prenotazione (ID: ${req.body.id}) per la tua struttura ${req.body.struttura} è stata confermata, come da te richiesto!
                <br/>
                <br/>
                <em>Il Team di SoftBed</em>
            </p>`
    };

    transporter.sendMail(mailOspite, (err, res) => {
        if (err) {
            res.status(err.status).send(err);
        }
    });

    transporter.sendMail(mailGestore, (err, res) => {
        if (err) {
            res.status(err.status).send(err);
        }
    });

    res.send();
})

router.post('/scadenza-prenotazione', (req, res) => {
    const mailOspite = {
        from: softbed.email,
        to: req.body.emailOspite,
        subject: "Annullamento prenotazione",
        html:
            `<p>
                Purtroppo il gestore della struttura ${req.body.struttura} per cui avevi fatto richiesta di prenotazione (ID: ${req.body.id})
                il cui check-in era previsto in data ${req.body.data} non ha confermato la richiesta.
               <br/>
                <br/>
                <em>Il Team di SoftBed</em>
            </p>`
    };

    const mailGestore = {
        from: softbed.email,
        to: req.body.emailGestore,
        subject: "Annullamento prenotazione",
        html:
            `<p>
                La richiesta di prenotazione (ID: ${req.body.id}) per la struttura ${req.body.struttura} non è stata confermata entro 48h.
                <br />
                La tua struttura è stata nuovamente resa disponibile nel periodo interessato.
                <br/>
                <br/>
                <em>Il Team di SoftBed</em>
            </p>`
    };

    transporter.sendMail(mailOspite, (err, res) => {
        if (err) {
            res.status(err.status).send(err);
        }
    });

    transporter.sendMail(mailGestore, (err, res) => {
        if (err) {
            res.status(err.status).send(err);
        }
    });

    res.send();
})

module.exports = router;
