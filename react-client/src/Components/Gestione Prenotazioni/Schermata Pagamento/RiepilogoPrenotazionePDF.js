import jsPDF from 'jspdf';

function RiepilogoPrenotazionePDF(dati, id) {
    let doc = new jsPDF()
    let y = 2;

    doc.setFontSize(20);
    doc.text('Riepilogo prenotazione',20, 10 * y++ - 2);

    doc.setFontSize(16);

    doc.text('ID prenotazione: ', 25, 10 * y);

    doc.text(`${id}`, 80, 10 * y++);

    doc.text('Struttura: ', 25, 10 * y);

    doc.text(dati.struttura.nome, 80, 10 * y++);

    doc.text('Periodo: ', 25, 10 * y);

    const periodoDa = `dal ${dati.dataCheckIn} (${dati.orarioCheckIn})`
    const periodoA = `al ${dati.dataCheckOut} (${dati.orarioCheckOut})`
    doc.text(periodoDa, 80, 10 * y++);
    doc.text(periodoA, 80, 10 * y++);

    if (dati.camere && dati.camere[0]) {
        doc.text('Camere: ', 25, 10 * y);

        dati.camere.map((camera) => {
            doc.text(`${camera.numero}x ${camera.tipologia}`, 80, 10 * y++);
        })
    }

    doc.text('Persone: ', 25, 10 * y);

    doc.text(
        `${dati.adulti}x adulto ${(parseInt(dati.adultiEsenti) !== 0) ? "(di cui " + dati.adultiEsenti + " esenti)" : ""}`,
        80,
        10 * y++
    );

    if (parseInt(dati.bambini) !== 0) {
        doc.text(
            `${dati.bambini}x bambino ${(parseInt(dati.bambiniEsenti) !== 0) ? "(di cui " + dati.bambiniEsenti + " esenti)" : ""}`,
            80,
            10 * y++,
        );
    }

    doc.line(20, 10 * y - 5, 190, 10 * y - 5);

    doc.text('Prezzo: ', 25, 10 * y + 3)
    doc.text(`${dati.prezzo} €`, 160, 10 * y + 3);

    return doc.output('datauristring');
}

export default RiepilogoPrenotazionePDF;
