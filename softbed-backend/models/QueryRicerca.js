class QueryRicerca {

    // *************************************************************************************** QUERY
    // *************************************************************************************** RICERCA
    static queryDurataSoggiorno(arrivo, partenza) {
        const GIORNO = 86400000;
        const giorni = Math.ceil((new Date(partenza).getTime() - new Date(arrivo).getTime()) / GIORNO);

        return `
            SELECT struttura.idStruttura
            FROM struttura, condizioni
            WHERE struttura.idStruttura = condizioni.refStruttura
              AND minSoggiorno <= "${giorni}"
              AND maxSoggiorno >= "${giorni}"`
    }

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
            FROM \`camerab&b\` as CBB1
            WHERE (CBB1.nLettiSingoli + 2 * CBB1.nLettiMatrimoniali) >= ${ospiti} AND 
                (CBB1.refStruttura, CBB1.idCamera) NOT IN ( 
                SELECT DISTINCT CBB2.refStruttura, CBB2.idCamera 
                FROM \`camerab&b\` as CBB2, prenotazionecamera as PC, prenotazione 
                WHERE 
                CBB2.idCamera = PC.refCamera AND 
                CBB2.refStruttura = PC.refStruttura AND 
                PC.refPrenotazione = prenotazione.idPrenotazione AND 
                PC.refStruttura = prenotazione.refStruttura AND ( 
                    ("${arrivo}" BETWEEN prenotazione.checkIn AND prenotazione.checkOut) OR 
                    ("${partenza}" BETWEEN prenotazione.checkIn AND prenotazione.checkOut) OR 
                    ("${arrivo}" < prenotazione.checkIn AND "${partenza}" > prenotazione.checkOut) 
                )
            )`
    }

    static queryPrenotazioniCV(arrivo, partenza, ospiti) {
        return `
            SELECT CV.refStruttura
            FROM casavacanze as CV 
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
                struttura.idStruttura IN (${this.queryPrenotazioniBB(arrivo, partenza, ospiti)}) AND
                struttura.idStruttura IN (${this.queryDurataSoggiorno(arrivo, partenza)})`
    }

    static queryID_CV(destinazione, arrivo, partenza, ospiti) {
        return `
            SELECT struttura.idStruttura as id
            FROM struttura
            WHERE struttura.idStruttura IN (${this.queryDestinazione(destinazione)}) AND 
                struttura.idStruttura IN (${this.queryPrenotazioniCV(arrivo, partenza, ospiti)}) AND
                struttura.idStruttura IN (${this.queryDurataSoggiorno(arrivo, partenza)})`
    }

    static queryID_BB_CV(destinazione, arrivo, partenza, ospiti) {
        return `
            SELECT struttura.idStruttura as id
            FROM struttura
            WHERE struttura.idStruttura IN (${this.queryDestinazione(destinazione)}) AND
                struttura.idStruttura IN (${this.queryDurataSoggiorno(arrivo, partenza)}) AND (
                    (struttura.idStruttura IN (${this.queryPrenotazioniBB(arrivo, partenza, ospiti)})) OR 
                    (struttura.idStruttura IN (${this.queryPrenotazioniCV(arrivo, partenza, ospiti)}))
                )`
    }
}

module.exports = QueryRicerca;