import jsPDF from 'jspdf';

function RiepilogoPrenotazionePDF(dati, id) {
    let doc = new jsPDF();
    let y = 2;

    doc.setFontSize(20);
    doc.setFontType("bold");
    doc.text(20, 10 * y++ - 2, 'Riepilogo prenotazione');

    doc.setFontSize(16);

    doc.setFontType("bold");
    doc.text(25, 10 * y, 'ID prenotazione: ');

    doc.setFontType("normal");
    doc.text(80, 10 * y++, `${id}`);

    doc.setFontType("bold");
    doc.text(25, 10 * y, 'Struttura: ');

    doc.setFontType("normal");
    doc.text(80, 10 * y++, dati.struttura);

    doc.setFontType("bold");
    doc.text(25, 10 * y, 'Periodo: ');

    const periodoDa = `dal ${dati.dataCheckIn} (${dati.orarioCheckIn})`
    const periodoA = `al ${dati.dataCheckOut} (${dati.orarioCheckOut})`
    doc.setFontType("normal");
    doc.text(80, 10 * y++, periodoDa);
    doc.text(80, 10 * y++, periodoA);

    if (dati.camere && dati.camere[0]) {
        doc.setFontType("bold");
        doc.text(25, 10 * y, 'Camere: ');

        doc.setFontType("normal")
        dati.camere.map((camera) => {
            doc.text(80, 10 * y++, `${camera.numero}x ${camera.tipologia}`);
        })
    }

    doc.setFontType("bold");
    doc.text(25, 10 * y, 'Persone: ');

    doc.setFontType("normal");
    doc.text(80, 10 * y++, `${dati.adulti}x adulto ${(parseInt(dati.adultiEsenti) !== 0) ? "(di cui " + dati.adultiEsenti + " esenti)" : ""}`);

    if (parseInt(dati.bambini) !== 0) {
        doc.text(80, 10 * y++, `${dati.bambini}x bambino ${(parseInt(dati.bambiniEsenti) !== 0) ? "(di cui " + dati.bambiniEsenti + " esenti)" : ""}`);
    }

    doc.line(20, 10 * y - 5, 190, 10 * y - 5);

    doc.setFontType("bold");
    doc.text(170, 10 * y + 3, `${dati.prezzo} €`);

    return doc.output('datauristring');
}

export default RiepilogoPrenotazionePDF;
