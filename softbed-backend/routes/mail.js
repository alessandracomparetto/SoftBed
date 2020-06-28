const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const router = express.Router();
router.use(bodyParser.json());

router.post('/', (req, res) => {
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'softengineers44@gmail.com',
            pass: 'softAdmin'
        }
    });


    let mailOptions = {
        from: req.body.email,
        to: "c.sofy1998@libero.it",
        subject: "Dichiarazione ospiti questura",
        text: "Si inoltra in allegato quando indicato in oggetto.",
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



module.exports = router;