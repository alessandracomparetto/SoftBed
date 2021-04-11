const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const path = require('path');
const router = express.Router();
router.use(bodyParser.json());
let ospiteModel = require('../models/Ospite');

const softbed = {
    email: process.env.SOFTBED_EMAIL,
    pass: process.env.SOFTBED_PASSWORD,
    site: 'https://softbed.herokuapp.com/'
}

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: softbed.email,
        pass: softbed.pass
    }
})

router.post('/invioDichiarazione', function (req, res) {
    ospiteModel.invioDichiarazione(req.body, function (data) {
        let documenti = [];
        for (let i = 0; i < data.length; i++) {
            documenti.push({
                filename: `${data[i].percorso}`,
                path: path.join(`${__dirname}`, `../public/uploads/documenti/${data[i].percorso}`),
                cid: `${data[i].iddocumento}`
            });
        }

        documenti.push({
            filename: 'DichiarazioneQuestura.pdf',
            path: req.body.allegato,
            contentType: 'application/pdf',
            encoding: 'base64'
        });


        let mailOptions = {
            from: softbed.email,
            to: softbed.email, // Dovrebbe esserci l'email della questura
            subject: "Dichiarazione ospiti Questura",
            text: "Si inoltra in allegato quanto indicato in oggetto.",
            attachments: documenti
        };


        transporter.sendMail(mailOptions, (error, response) => {
            if (error) {
                res.send(error);

            } else {
                res.send('Success');
            }
        });


    }).catch((err) => {
        console.error(err)
        res.send()
    });
});


router.post('/invioRendiconto', (req, res) => {

    let mailOptions = {
        from: softbed.email,
        to: "ufficioturismo@ufficioturismo.ufficioturismo", ////SIMULAZIONE EMAIL DELL'UFFICIO DEL TURISMO
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
        console.error(err)
    });

    res.send();
});

router.post('/richiesta-prenotazione', (req, res) => {
    const mailOspite = {
        from: softbed.email,
        to: req.body.emailospite,
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
        to: req.body.emailgestore,
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
            console.error(err)
        }
    });

    transporter.sendMail(mailOspite, (err, res) => {
        if (err) {
            console.error(err)
        }
    });

    res.send();
});

router.post('/annullamento-prenotazione', (req, res) => {
    const mailOspite = {
        from: softbed.email,
        to: req.body.emailospite,
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
        to: req.body.emailgestore,
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
            console.error(err)
        }
    });

    transporter.sendMail(mailGestore, (err, res) => {
        if (err) {
            console.error(err)
        }
    });

    res.send();
})

router.post('/rifiuta-prenotazione', (req, res) => {
    const mailOspite = {
        from: softbed.email,
        to: req.body.emailospite,
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
        to: req.body.emailgestore,
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
            console.error(err)
        }
    });

    transporter.sendMail(mailGestore, (err, res) => {
        if (err) {
            console.error(err)
        }
    });

    res.send();
})

router.post('/conferma-prenotazione', (req, res) => {
    const mailOspite = {
        from: softbed.email,
        to: req.body.emailospite,
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
        to: req.body.emailgestore,
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
            console.error(err)
        }
    });

    transporter.sendMail(mailGestore, (err, res) => {
        if (err) {
            console.error(err)
        }
    });

    res.send();
})

router.post('/scadenza-prenotazione', (req, res) => {
    const mailOspite = {
        from: softbed.email,
        to: req.body.emailospite,
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
        to: req.body.emailgestore,
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
            console.error(err)
        }
    });

    transporter.sendMail(mailGestore, (err, res) => {
        if (err) {
            console.error(err)
        }
    });

    res.send();
});

module.exports = router;
