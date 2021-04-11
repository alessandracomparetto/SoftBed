import React, {useEffect, useState} from "react";
import axios from 'axios';
import mostraDialogErrore from "../../../Actions/errore";
import jsPDF from "jspdf";
import {useHistory} from "react-router-dom";
import {convertiData} from "../../../Actions/gestioneDate";

function setFontType(doc, type) {
    doc.setFont(undefined, undefined, type)
}

function Rendiconto(props) {

    const [ospiti,setOspiti] = useState([]);
    const [gestore, setGestore] = useState([]);
    const [datiStruttura, setDatiStruttura] = useState([]);
    const history = useHistory();

    function calcDate(data1,data2) {
        const diff = Math.floor(data1.getTime() - data2.getTime());
        const giorno = 1000 * 60 * 60 * 24;
        return Math.floor(diff / giorno);
    }

    useEffect(() => {
        let indice = props.indice;
        let utente = JSON.parse(window.sessionStorage.getItem("utente"));

        axios.post("/user/fetch", utente)
            .then(res => {
                res.data.datanascita = convertiData(new Date(res.data.datanascita))
                setGestore(res.data);
            })
            .catch(err => {console.error(err)});

        let lista = JSON.parse(window.sessionStorage.getItem("strutture"));
        let dati = lista[indice];

        axios.post("/building/fetchStruttura", {"idstruttura": dati.idstruttura})
            .then(res => {
                setDatiStruttura(res.data[0]);
            })
            .catch(err => console.error(err));

        const tmp = new Date().toISOString().split("T");
        const oggi = tmp[0] + " " + tmp[1].slice(0,8);
        let tmp1 = dati.rendicontoeffettuato.split("T");
        let dataRendiconto = tmp1[0] + " " + tmp1[1].slice(0,8);
        let giorniTrascorsi = calcDate(new Date(), new Date(dati.rendicontoeffettuato));

        if (giorniTrascorsi < 85 || giorniTrascorsi > 95) {
            document.getElementsByClassName("bottone")[indice].setAttribute("disabled", "disabled");
        }

        let info = {
            idstruttura: dati.idstruttura,
            trimestre: oggi,
            rendiconto: dataRendiconto
        }

        axios.post(`/building/rendiconto`, info)
            .then(res => {
                setOspiti(res.data);
            }).catch((err) => {console.error(err)});

    }, []);

    function calcolaTassa(count, prezzo) {
        return count * prezzo;
    }

    const inviaRendiconto = () => {
        let doc = new jsPDF();
        let countOspite = 0; // ogni tre ospiti cambio pagina
        let countAdulti = 0;
        let countBambini = 0;
        let countPage = 2; //tiene il conto delle pagine
        let count = 0; // controlla se per ogni categoria ci sono ospiti

        let y = 2;

        /* TODO: Fixare un po' */
        doc.setFontSize(20);
        setFontType(doc, "bold");
        doc.text('OGGETTO: Tasse di soggiorno - rendiconto trimestrale Ufficio del Turismo', 20, 10 * y++ - 2);

        doc.setFontSize(14);
        setFontType(doc, "normal")
        doc.text(`Il/La sottoscritto/a ${gestore.nome} ${gestore.cognome} (codice fiscale: ${gestore.codicefiscale})`, 25, 10 * y++);
        doc.text(`nato/a a ${gestore.comunenascita} (${gestore.provincianascita}) il ${gestore.datanascita},`, 25, 10 * y++);
        doc.text(`residente a ${gestore.comuneresidenza} (${gestore.provinciaresidenza}), via ${gestore.via}, n. ${gestore.numerocivico}, CAP ${gestore.cap}`, 25, 10 * y++);
        doc.text(`e-mail: ${gestore.email}, telefono: ${gestore.telefono},`, 25, 10 * y++);

        setFontType(doc, "bold")
        doc.text(' in qualità di proprietario/amministratore della seguente struttura: ', 25, 10 * y++);

        setFontType(doc, "normal")
        doc.text(`"${datiStruttura.nomestruttura}", sita a ${datiStruttura.comune} (${datiStruttura.provincia}), via ${datiStruttura.via}, n. ${datiStruttura.numerocivico}, CAP ${datiStruttura.cap}`, 25, 10 * y++);
        doc.text(`dichiara la presenza dei seguenti ospiti:`, 25, 10 * y++);
        doc.text(`SOGGETTI PAGANTI L'IMPOSTA ADULTI:`, 25, 10 * y);

        ospiti.map((ospitiPrenotazione, indice) => {
            for(let i = 0; i < ospitiPrenotazione.ospiti.length; i++) {
                if (ospitiPrenotazione.ospiti[i].tassa === "Adulto") {
                    doc.text('', 80, 10 * y++);
                    count++;
                    countAdulti++;
                    countOspite++;
                    doc.setFontSize(14);

                    setFontType(doc, "bold")
                    doc.text('Nome: ', 25, 10 * y);
                    setFontType(doc, "normal")
                    doc.text(`${ospitiPrenotazione.ospiti[i].nome}`, 80, 10 * y++);

                    setFontType(doc, "bold")
                    doc.text('Cognome: ', 25, 10 * y);
                    setFontType(doc, "normal")
                    doc.text(`${ospitiPrenotazione.ospiti[i].cognome}`, 80, 10 * y++);

                    setFontType(doc, "bold")
                    doc.text('Codice fiscale: ', 25, 10 * y);
                    setFontType(doc, "normal")
                    doc.text(`${ospitiPrenotazione.ospiti[i].codicefiscale}`, 80, 10 * y++);

                    setFontType(doc, "bold")
                    doc.text('Data di nascita: ', 25, 10 * y);
                    setFontType(doc, "normal")
                    doc.text(`${ospitiPrenotazione.ospiti[i].datanascita.split("T")[0]}`, 80, 10 * y++);

                    setFontType(doc, "bold")
                    doc.text(`Nato a: `, 25, 10 * y);
                    setFontType(doc, "normal")
                    doc.text(`${ospitiPrenotazione.ospiti[i].comunenascita} (${ospitiPrenotazione.ospiti[i].provincianascita})`, 80, 10 * y++);

                    setFontType(doc, "bold")
                    doc.text(`Residente a: `, 25, 10 * y);
                    setFontType(doc, "normal")
                    doc.text(`${ospitiPrenotazione.ospiti[i].comuneresidenza} (${ospitiPrenotazione.ospiti[i].provinciaresidenza}), via ${ospitiPrenotazione.ospiti[i].via}, n. ${ospitiPrenotazione.ospiti[i].numerocivico}, CAP ${ospitiPrenotazione.ospiti[i].cap}`, 80, 10 * y++);

                    setFontType(doc, "bold")
                    doc.text('Data di arrivo: ', 25, 10 * y);
                    setFontType(doc, "normal")
                    doc.text(`${ospitiPrenotazione.ospiti[i].dataarrivo.split("T")[0]}`, 80, 10 * y++);

                    setFontType(doc, "bold")
                    doc.text('Permanenza: ', 25, 10 * y);
                    setFontType(doc, "normal")
                    doc.text(`${ospitiPrenotazione.ospiti[i].permanenza} giorni`, 80, 10 * y++);

                    if (countOspite % 2 === 0 && count !== 0) {
                        y = 2;
                        countPage++;
                        doc.addPage();
                    }
                }
            }

        })

        if (count === 0) {
            doc.text('0', 125, 10 * y++);
        }

        count = 0;
        doc.text(`Totale tasse di soggiorno adulti: ${calcolaTassa(countAdulti, datiStruttura.prezzoadulti)} €`, 25, 10 * y++);
        doc.text(`SOGGETTI PAGANTI L'IMPOSTA BAMBINI:`, 25, 10 * y);

        ospiti.map((ospitiPrenotazione, indice) => {
            for (let i = 0; i < ospitiPrenotazione.ospiti.length; i++) {
                if (ospitiPrenotazione.ospiti[i].tassa === "Bambino") {
                    doc.text('', 80, 10 * y++);
                    countBambini++;
                    countOspite++;
                    count++;
                    doc.setFontSize(14);
                    doc.text('Nome: ', 25, 10 * y);
                    doc.text(80, 10 * y++, `${ospitiPrenotazione.ospiti[i].nome}`);
                    doc.text('Cognome: ', 25, 10 * y);
                    doc.text(80, 10 * y++, `${ospitiPrenotazione.ospiti[i].cognome}`);
                    doc.text('Codice fiscale: ', 25, 10 * y);
                    doc.text(80, 10 * y++, `${ospitiPrenotazione.ospiti[i].codicefiscale}`);
                    doc.text('Data di nascita: ', 25, 10 * y);
                    doc.text(80, 10 * y++, `${ospitiPrenotazione.ospiti[i].datanascita.split("T")[0]}`);
                    doc.text(`Nato a: `, 25, 10 * y);
                    doc.text(80, 10 * y++, `${ospitiPrenotazione.ospiti[i].comunenascita} (${ospitiPrenotazione.ospiti[i].provincianascita})`);
                    doc.text(`Residente a: `, 25, 10 * y);
                    doc.text(80, 10 * y++, `${ospitiPrenotazione.ospiti[i].comuneresidenza} (${ospitiPrenotazione.ospiti[i].provinciaresidenza}), via ${ospitiPrenotazione.ospiti[i].via}, n. ${ospitiPrenotazione.ospiti[i].numerocivico}, CAP ${ospitiPrenotazione.ospiti[i].cap}`);
                    doc.text('Data di arrivo: ', 25, 10 * y);
                    doc.text(80, 10 * y++, `${ospitiPrenotazione.ospiti[i].dataarrivo.split("T")[0]}`);
                    doc.text('Permanenza: ', 25, 10 * y);
                    doc.text(80, 10 * y++, `${ospitiPrenotazione.ospiti[i].permanenza} giorni`);

                    if (countOspite % 2 === 0 && count!== 0) {
                        y = 2;
                        doc.addPage();
                    }
                }

            }
        })

        if (count === 0) {
            doc.text('0', 130, 10 * y++);
        }

        count = 0;
        doc.text(`Totale tasse di soggiorno bambini: ${calcolaTassa(countBambini, datiStruttura.prezzobambini)} €`);
        doc.text(`SOGGETTI NON PAGANTI L'IMPOSTA:`);


        ospiti.map((ospitiPrenotazione, indice) => {
            for (let i = 0; i < ospitiPrenotazione.ospiti.length; i++) {
                if (ospitiPrenotazione.ospiti[i].tassa === "Esente") {
                    doc.text('', 80, 10 * y++);
                    count++;
                    countOspite++;
                    doc.setFont(undefined, "bold");
                    doc.setFontSize(14);
                    doc.text('Nome: ', 25, 10 * y);

                    doc.setFont(undefined, "normal");
                    doc.text(`${ospitiPrenotazione.ospiti[i].nome}`, 80, 10 * y++);

                    doc.setFont(undefined, "bold");
                    doc.text('Cognome: ', 25, 10 * y);

                    doc.setFont(undefined, "normal");
                    doc.text(`${ospitiPrenotazione.ospiti[i].cognome}`, 80, 10 * y++);

                    doc.setFont(undefined, "bold");
                    doc.text('Codice fiscale: ', 25, 10 * y);

                    doc.setFont(undefined, "normal");
                    doc.text(`${ospitiPrenotazione.ospiti[i].codicefiscale}`, 80, 10 * y++);

                    doc.setFont(undefined, "bold");
                    doc.text('Data di nascita: ', 25, 10 * y);

                    doc.setFont(undefined, "normal");
                    doc.text(`${ospitiPrenotazione.ospiti[i].datanascita.split("T")[0]}`, 80, 10 * y++);

                    doc.setFont(undefined, "bold");
                    doc.text('Nato a: ', 25, 10 * y);

                    doc.setFont(undefined, "normal");
                    doc.text(`${ospitiPrenotazione.ospiti[i].comunenascita} (${ospitiPrenotazione.ospiti[i].provincianascita})`, 80, 10 * y++);

                    doc.setFont(undefined, "bold");
                    doc.text('Residente a: ', 25, 10 * y);

                    doc.setFont(undefined, "normal");
                    doc.text(`${ospitiPrenotazione.ospiti[i].comuneresidenza} (${ospitiPrenotazione.ospiti[i].provinciaresidenza}), via ${ospitiPrenotazione.ospiti[i].via}, n. ${ospitiPrenotazione.ospiti[i].numerocivico}, CAP ${ospitiPrenotazione.ospiti[i].cap}`, 80, 10 * y++);

                    doc.setFont(undefined, "bold");
                    doc.text('Data di arrivo: ', 25, 10 * y);

                    doc.setFont(undefined, "normal");
                    doc.text(`${ospitiPrenotazione.ospiti[i].dataarrivo.split("T")[0]}`, 80, 10 * y++);

                    doc.setFont(undefined, "bold");
                    doc.text('Permanenza: ', 25, 10 * y);

                    doc.setFont(undefined, "normal");
                    doc.text(`${ospitiPrenotazione.ospiti[i].permanenza} giorni`, 80, 10 * y++);

                    if (countOspite % 2 === 0 && count !== 0) {
                        y = 2;
                        doc.addPage();
                    }
                }
            }
        })

        if (count === 0){
            doc.text('0', 120, 10 * y++);
        }

        let data = {
            allegato: doc.output('datauristring')
        }

        doc.save("Rendiconto");
        axios.post("/mail/invioRendiconto", data).catch((err) => {
            mostraDialogErrore(err.message);
        });

        let info = {"idstruttura": datiStruttura.idstruttura, "rendiconto": new Date().toISOString().slice(0, 10)}
        axios.post("/building/setDataRendiconto", info).catch(err => console.log(err));

        let tmp = JSON.parse(window.sessionStorage.getItem("strutture"));
        let struttura = {
            "idstruttura": datiStruttura.idstruttura,
            "nomestruttura": datiStruttura.nomestruttura,
            "tipologiastruttura": datiStruttura.tipologiastruttura,
            "refgestore": gestore.idutente,
            "refindirizzo": datiStruttura.refindirizzo,
            "rendicontoeffettuato": new Date().toISOString(),
            "idindirizzo": datiStruttura.refindirizzo,
            "via": datiStruttura.via,
            "numerocivico": datiStruttura.numerocivico,
            "cap": datiStruttura.cap,
            "refcomune": datiStruttura.refcomune
        }

        for (let i = 0; i <tmp.length; i++) {
            if (tmp[i].idstruttura === datiStruttura.idstruttura) {
                tmp[i] = struttura;
            }
        }
        window.sessionStorage.setItem("strutture", JSON.stringify(tmp));

        history.push({
            pathname: "/rendiconto-completato",
            state: { provenienza: "Rendiconto" }
        });

    }

    return <button type="button" className=" bottone btn btn-block btn-primary mt-2 mr-2 " onClick={inviaRendiconto}>Rendiconto</button>
}

export default Rendiconto;
