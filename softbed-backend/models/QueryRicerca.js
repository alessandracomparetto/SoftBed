class QueryRicerca {

    // *************************************************************************************** QUERY
    // *************************************************************************************** RICERCA

    static queryDestinazione(destinazione) {
        return `
            SELECT struttura.idStruttura 
            FROM struttura, indirizzo 
            WHERE struttura.refIndirizzo = indirizzo.idIndirizzo AND 
                indirizzo.refComune IN (
                SELECT comuni.idComune
                FROM comuni, province, regioni 
                WHERE 
                comuni.refProvincia = province.idProvincia AND 
                province.refRegione = regioni.idRegione AND ( 
                    comuni.nomeComune = "${destinazione}" OR 
                    province.nomeProvincia = "${destinazione}" OR 
                    regioni.nomeRegione = "${destinazione}" 
                )
            )`;
    }

    static queryPrenotazioniBB(arrivo, partenza, ospiti) {
        return `
            SELECT DISTINCT CBB1.refStruttura
            FROM \`cameraB&B\` as CBB1
            WHERE (CBB1.nLettiSingoli + 2 * CBB1.nLettiMatrimoniali) >= ${ospiti} AND 
                (CBB1.refStruttura, CBB1.idCamera) NOT IN ( 
                SELECT DISTINCT CBB2.refStruttura, CBB2.idCamera 
                FROM \`cameraB&B\` as CBB2, prenotazioneCamera, prenotazione 
                WHERE 
                CBB2.idCamera = prenotazioneCamera.refCamera AND 
                CBB2.refStruttura = prenotazioneCamera.refStruttura AND 
                prenotazioneCamera.refPrenotazione = prenotazione.idPrenotazione AND 
                prenotazioneCamera.refStruttura = prenotazione.refStruttura AND ( 
                    ("${arrivo}" BETWEEN prenotazione.checkIn AND prenotazione.checkOut) OR 
                    ("${partenza}" BETWEEN prenotazione.checkIn AND prenotazione.checkOut) OR 
                    ("${arrivo}" < prenotazione.checkIn AND "${partenza}" > prenotazione.checkOut) 
                )
            )`
    }

    static queryPrenotazioniCV(arrivo, partenza, ospiti) {
        return `
            SELECT CV.refStruttura
            FROM casaVacanze as CV 
            WHERE (CV.nLettiSingoli + 2 * CV.nLettiMatrimoniali) >= ${ospiti} AND 
                CV.refStruttura NOT IN ( 
                SELECT prenotazione.refStruttura 
                FROM prenotazione 
                WHERE 
                ("${arrivo}" BETWEEN prenotazione.checkIn AND prenotazione.checkOut) OR 
                ("${partenza}" BETWEEN prenotazione.checkIn AND prenotazione.checkOut) OR 
                ("${arrivo}" <= prenotazione.checkIn AND "${partenza}" >= prenotazione.checkOut)
            )`
    }

    static queryID_BB(destinazione, arrivo, partenza, ospiti) {
        return `
            SELECT struttura.idStruttura as id
            FROM struttura
            WHERE struttura.idStruttura IN (${this.queryDestinazione(destinazione)}) AND  
                struttura.idStruttura IN (${this.queryPrenotazioniBB(arrivo, partenza, ospiti)})`
    }

    static queryID_CV(destinazione, arrivo, partenza, ospiti) {
        return `
            SELECT struttura.idStruttura as id
            FROM struttura
            WHERE struttura.idStruttura IN (${this.queryDestinazione(destinazione)}) AND 
                struttura.idStruttura IN (${this.queryPrenotazioniCV(arrivo, partenza, ospiti)})`
    }

    static queryID_BB_CV(destinazione, arrivo, partenza, ospiti) {
        return `
            SELECT struttura.idStruttura as id
            FROM struttura
            WHERE struttura.idStruttura IN (${this.queryDestinazione(destinazione)}) AND (
                    (struttura.idStruttura IN (${this.queryPrenotazioniBB(arrivo, partenza, ospiti)})) OR 
                    (struttura.idStruttura IN (${this.queryPrenotazioniCV(arrivo, partenza, ospiti)}))
                )`
    }
}

module.exports = QueryRicerca;