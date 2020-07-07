
import React, {useEffect, useState} from "react";
import axios from 'axios';
import mostraDialogErrore from "../../Actions/errore";
import jsPDF from "jspdf";
import reindirizza from "../../Actions/reindirizzamento";
import {useHistory, useLocation} from "react-router-dom";
import {convertiData} from "../../Actions/gestioneDate";
function Rendiconto(props){
    const [ospiti,setOspiti]= useState([]);
    const [gestore, setGestore]=useState([]);
    const [datiStruttura, setDatiStruttura]=useState([]);
    const history = useHistory();
    const location = useLocation();

    useEffect(() => {
        let utente = JSON.parse(window.sessionStorage.getItem("utente"));

        axios
            .post("/utente/fetch", utente)
            .then(res => {
                    console.log(res.data);
                  res.data.dataNascita = res.data.dataNascita.split("T")[0];
                  setGestore(res.data);
            })
            .catch(err => console.log(err));

        axios
            .post("/struttura/fetchStruttura", {"idStruttura": props.struttura.idStruttura})
            .then(res => {
                setDatiStruttura(res.data[0]);
            })
            .catch(err => console.log(err));

        const tmp = new Date().toISOString().split("T");
        const oggi=tmp[0] + " " + tmp[1].slice(0,8);

        let tmp1= props.struttura.rendicontoEffettuato.split("T");
        let dataRendiconto = tmp1[0] + " " + tmp1[1].slice(0,8);

        let info={idStruttura: props.struttura.idStruttura, trimestre: oggi, rendiconto:dataRendiconto}
        console.log(info);

        axios.post(`/struttura/rendiconto`, info)
            .then(res => {
                console.log(res.data);
                if(res.data===[]) {
                    reindirizza(history, {
                        pathname: '/gestioneStruttura',
                        state: {
                            provenienza: 'Rendiconto',
                            urlProvenienza: location.pathname
                        }
                    }, 3000, "Sembra che non ci siano prenotazioni per questo trimestre");
                }
                else{
                    setOspiti(res.data);
                }
            }).catch((err)=>console.log(err));

    }, []);

    function calcolaTassa(count, prezzo) {
        return count*prezzo;
    }

    const inviaRendiconto = () => {
        console.log(ospiti);
        let doc = new jsPDF();
            let countOspite = 0; // ogni due ospiti cambio pagina
            let countAdulti = 0;
            let countBambini = 0;
            let countPage = 2; //tiene il conto delle pagine

            let y = 2;

            doc.text(20, 10 * y++ - 2, 'OGGETTO: Tasse di soggiorno - rendiconto trimestrale Ufficio del Turismo');

            doc.setFontSize(14);
            doc.setFontType("normal");
            doc.text(25, 10 * y, `Il/La sottoscritto/a ${gestore.nome} ${gestore.cognome} (codice fiscale: ${gestore.codiceFiscale})`);
            doc.text(80, 10 * y++, '');
            doc.text(25, 10 * y, `nato/a a ${gestore.comuneNascita} (${gestore.provinciaNascita}) il ${gestore.dataNascita},`);
            doc.text(80, 10 * y++, '');
            doc.text(25, 10 * y, `residente a ${gestore.comuneResidenza} (${gestore.provinciaResidenza}), via ${gestore.via}, n. ${gestore.numeroCivico}, CAP ${gestore.cap}`);
            doc.text(80, 10 * y++, '');
            doc.text(25, 10 * y, `e-mail: ${gestore.email}, telefono: ${gestore.telefono},`);
            doc.text(80, 10 * y++, '');

            doc.setFontType("bold");
            doc.text(25, 10 * y, ' in qualità di proprietario/amministratore della seguente struttura: ');
            doc.text(80, 10 * y++, '');

            doc.setFontType("normal")
            doc.text(25, 10 * y, `"${props.struttura.nomeStruttura}", sita a ${datiStruttura.comune} (${datiStruttura.provincia}), via ${props.struttura.via}, n. ${props.struttura.numeroCivico}, CAP ${props.struttura.cap}`);

            doc.text(80, 10 * y++, '');


            doc.setFontType("bold");
            doc.text(25, 10 * y, `dichiara la presenza dei seguenti ospiti:`);
            doc.text(80, 10 * y++, '');

            doc.setFontType("bold");
            doc.text(25, 10 * y, `SOGGETTI PAGANTI L'IMPOSTA ADULTI`);
            doc.text(80, 10 * y++, '');

            ospiti.map((ospitiPrenotazione, indice) => {
                for(let i = 0; i < ospitiPrenotazione.ospiti.length; i++) {
                    if (ospitiPrenotazione.ospiti[i].tassa === "Adulto") {
                        countAdulti++;
                        countOspite++;
                        doc.setFontType("bold");
                        doc.setFontSize(14);
                        doc.text(25, 10 * y, 'Nome: ');

                        doc.setFontType("normal");
                        doc.text(80, 10 * y++, `${ospitiPrenotazione.ospiti[i].nome}`);

                        doc.setFontType("bold");
                        doc.text(25, 10 * y, 'Cognome: ');

                        doc.setFontType("normal");
                        doc.text(80, 10 * y++, `${ospitiPrenotazione.ospiti[i].cognome}`);

                        doc.setFontType("bold");
                        doc.text(25, 10 * y, 'Codice fiscale: ');

                        doc.setFontType("normal");
                        doc.text(80, 10 * y++, `${ospitiPrenotazione.ospiti[i].codiceFiscale}`);

                        doc.setFontType("bold");
                        doc.text(25, 10 * y, 'Data di nascita: ');

                        doc.setFontType("normal");
                        doc.text(80, 10 * y++, `${ospitiPrenotazione.ospiti[i].dataNascita.split("T")[0]}`);

                        doc.setFontType("bold");
                        doc.text(25, 10 * y, `Nato a: `);

                        doc.setFontType("normal");
                        doc.text(80, 10 * y++, `${ospitiPrenotazione.ospiti[i].comuneNascita} (${ospitiPrenotazione.ospiti[i].provinciaNascita})`);

                        doc.setFontType("bold");
                        doc.text(25, 10 * y, `Residente a: `);

                        doc.setFontType("normal");
                        doc.text(80, 10 * y++, `${ospitiPrenotazione.ospiti[i].comuneResidenza} (${ospitiPrenotazione.ospiti[i].provinciaResidenza}), via ${ospitiPrenotazione.ospiti[i].via}, n. ${ospitiPrenotazione.ospiti[i].numeroCivico}, CAP ${ospitiPrenotazione.ospiti[i].cap}`);

                        doc.setFontType("bold");
                        doc.text(25, 10 * y, 'Data di arrivo: ');

                        doc.setFontType("normal");
                        doc.text(80, 10 * y++, `${ospitiPrenotazione.ospiti[i].dataArrivo.split("T")[0]}`);

                        doc.setFontType("bold");
                        doc.text(25, 10 * y, 'Permanenza: ');

                        doc.setFontType("normal");
                        doc.text(80, 10 * y++, `${ospitiPrenotazione.ospiti[i].permanenza} giorni`);
                        doc.text(80, 10 * y++, '');

                        if (countOspite % 2 === 0) {
                            y = 2;
                            countPage++;
                            doc.addPage();
                        }
                    }
                }
            })

            doc.setFontType("bold");
            doc.text(25, 10 * y, `Totale tasse di soggiorno adulti: ${calcolaTassa(countAdulti, datiStruttura.prezzoAdulti)} €`);
            doc.text(80, 10 * y++, '');

            doc.setFontType("bold");
            doc.text(25, 10 * y, `SOGGETTI PAGANTI L'IMPOSTA BAMBINI`);
            doc.text(80, 10 * y++, '');


        ospiti.map((ospitiPrenotazione, indice) => {
            for(let i = 0; i < ospitiPrenotazione.ospiti.length; i++) {
                if (ospitiPrenotazione.ospiti[i].tassa === "Bambino") {
                        countBambini++;
                        countOspite++;

                        doc.setFontType("bold");
                        doc.setFontSize(14);
                        doc.text(25, 10 * y, 'Nome: ');

                        doc.setFontType("normal");
                        doc.text(80, 10 * y++, `${ospitiPrenotazione.ospiti[i].nome}`);

                        doc.setFontType("bold");
                        doc.text(25, 10 * y, 'Cognome: ');

                        doc.setFontType("normal");
                        doc.text(80, 10 * y++, `${ospitiPrenotazione.ospiti[i].cognome}`);

                        doc.setFontType("bold");
                        doc.text(25, 10 * y, 'Codice fiscale: ');

                        doc.setFontType("normal");
                        doc.text(80, 10 * y++, `${ospitiPrenotazione.ospiti[i].codiceFiscale}`);

                        doc.setFontType("bold");
                        doc.text(25, 10 * y, 'Data di nascita: ');

                        doc.setFontType("normal");
                        doc.text(80, 10 * y++, `${ospitiPrenotazione.ospiti[i].dataNascita.split("T")[0]}`);

                        doc.setFontType("bold");
                        doc.text(25, 10 * y, `Nato a: `);

                        doc.setFontType("normal");
                        doc.text(80, 10 * y++, `${ospitiPrenotazione.ospiti[i].comuneNascita} (${ospitiPrenotazione.ospiti[i].provinciaNascita})`);

                        doc.setFontType("bold");
                        doc.text(25, 10 * y, `Residente a: `);

                        doc.setFontType("normal");
                        doc.text(80, 10 * y++, `${ospitiPrenotazione.ospiti[i].comuneResidenza} (${ospitiPrenotazione.ospiti[i].provinciaResidenza}), via ${ospitiPrenotazione.ospiti[i].via}, n. ${ospitiPrenotazione.ospiti[i].numeroCivico}, CAP ${ospitiPrenotazione.ospiti[i].cap}`);

                        doc.setFontType("bold");
                        doc.text(25, 10 * y, 'Data di arrivo: ');

                        doc.setFontType("normal");
                        doc.text(80, 10 * y++, `${ospitiPrenotazione.ospiti[i].dataArrivo.split("T")[0]}`);

                        doc.setFontType("bold");
                        doc.text(25, 10 * y, 'Permanenza: ');

                        doc.setFontType("normal");
                        doc.text(80, 10 * y++, `${ospitiPrenotazione.ospiti[i].permanenza} giorni`);
                        doc.text(80, 10 * y++, '');

                        if (countOspite % 2 === 0) {
                            y = 2;
                            doc.addPage();
                        }
                    }

                }
            })

            doc.setFontType("bold");
            doc.text(25, 10 * y, `Totale tasse di soggiorno bambini: ${calcolaTassa(countBambini, datiStruttura.prezzoBambini)} €`);
            doc.text(80, 10 * y++, '');

            doc.text(80, 10 * y++, '');

            doc.setFontType("bold");
            doc.text(25, 10 * y, `SOGGETTI NON PAGANTI L'IMPOSTA`);
            doc.text(80, 10 * y++, '');


        ospiti.map((ospitiPrenotazione, indice) => {
            for(let i = 0; i < ospitiPrenotazione.ospiti.length; i++) {
                console.log(ospitiPrenotazione.ospiti[i].tassa)
                if (ospitiPrenotazione.ospiti[i].tassa === "Esente") {
                        countOspite++;
                        console.log("SOGGETTI NON PAGANTI L'IMPOSTA")
                        console.log(ospitiPrenotazione.ospiti[i]);
                        doc.setFontType("bold");
                        doc.setFontSize(14);
                        doc.text(25, 10 * y, 'Nome: ');

                        doc.setFontType("normal");
                        doc.text(80, 10 * y++, `${ospitiPrenotazione.ospiti[i].nome}`);

                        doc.setFontType("bold");
                        doc.text(25, 10 * y, 'Cognome: ');

                        doc.setFontType("normal");
                        doc.text(80, 10 * y++, `${ospitiPrenotazione.ospiti[i].cognome}`);

                        doc.setFontType("bold");
                        doc.text(25, 10 * y, 'Codice fiscale: ');

                        doc.setFontType("normal");
                        doc.text(80, 10 * y++, `${ospitiPrenotazione.ospiti[i].codiceFiscale}`);

                        doc.setFontType("bold");
                        doc.text(25, 10 * y, 'Data di nascita: ');

                        doc.setFontType("normal");
                        doc.text(80, 10 * y++, `${ospitiPrenotazione.ospiti[i].dataNascita.split("T")[0]}`);

                        doc.setFontType("bold");
                        doc.text(25, 10 * y, `Nato a: `);

                        doc.setFontType("normal");
                        doc.text(80, 10 * y++, `${ospitiPrenotazione.ospiti[i].comuneNascita} (${ospitiPrenotazione.ospiti[i].provinciaNascita})`);

                        doc.setFontType("bold");
                        doc.text(25, 10 * y, `Residente a: `);

                        doc.setFontType("normal");
                        doc.text(80, 10 * y++, `${ospitiPrenotazione.ospiti[i].comuneResidenza} (${ospitiPrenotazione.ospiti[i].provinciaResidenza}), via ${ospitiPrenotazione.ospiti[i].via}, n. ${ospitiPrenotazione.ospiti[i].numeroCivico}, CAP ${ospitiPrenotazione.ospiti[i].cap}`);

                        doc.setFontType("bold");
                        doc.text(25, 10 * y, 'Data di arrivo: ');

                        doc.setFontType("normal");
                        doc.text(80, 10 * y++, `${ospitiPrenotazione.ospiti[i].dataArrivo.split("T")[0]}`);

                        doc.setFontType("bold");
                        doc.text(25, 10 * y, 'Permanenza: ');

                        doc.setFontType("normal");
                        doc.text(80, 10 * y++, `${ospitiPrenotazione.ospiti[i].permanenza} giorni`);

                        if (countOspite % 2 === 0) {
                            y = 2;
                            doc.addPage();
                        }

                    }
                }
            })


        let data = {
            allegato: doc.output('datauristring')
        }
        doc.save();
        axios.post("/mail/invioRendiconto", data).catch((err) => {
            mostraDialogErrore(err.message);
        });

        history.push({
            pathname: "/rendiconto-completato",
            state: { provenienza: "Rendiconto" }
        });

        let info={"idStruttura": props.struttura.idStruttura, "rendiconto": new Date().toISOString().slice(0, 10)}

        axios.post("/struttura/setDataRendiconto", info).catch(err => console.log(err));

    }


        return <button id="button" type="button" className="btn btn-block btn-primary mt-2 mr-2 " onClick={inviaRendiconto}>Rendiconto</button>

}

export default Rendiconto;
