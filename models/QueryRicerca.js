class QueryRicerca {

    // *************************************************************************************** QUERY
    // *************************************************************************************** RICERCA
    static queryDurataSoggiorno = `
        SELECT struttura.idstruttura
        FROM struttura, condizioni
        WHERE struttura.idstruttura = condizioni.refstruttura
            AND minsoggiorno <= $5::integer
            AND maxsoggiorno >= $5::integer`

    static queryDestinazione = `
        SELECT struttura.idstruttura 
        FROM struttura, indirizzo 
        WHERE struttura.refindirizzo = indirizzo.idindirizzo AND 
            indirizzo.refcomune IN (
            SELECT comuni.idcomune
            FROM comuni, province, regioni 
            WHERE 
            comuni.refprovincia = province.idprovincia AND 
            province.refregione = regioni.idregione AND ( 
                comuni.nomecomune = $1::text OR 
                province.nomeprovincia = $1::text OR 
                regioni.nomeregione = $1::text 
            )
        )`

    static queryPrenotazioniBB = `
        SELECT DISTINCT CBB1.refstruttura
        FROM "camerab&b" as CBB1
        WHERE (CBB1.nlettisingoli + 2 * CBB1.nlettimatrimoniali) >= $4::integer AND 
            (CBB1.refstruttura, CBB1.idCamera) NOT IN ( 
            SELECT DISTINCT CBB2.refstruttura, CBB2.idCamera 
            FROM "camerab&b" as CBB2, prenotazionecamera as PC, prenotazione 
            WHERE 
            CBB2.idCamera = PC.refcamera AND 
            CBB2.refstruttura = PC.refstruttura AND 
            PC.refprenotazione = prenotazione.idprenotazione AND 
            PC.refstruttura = prenotazione.refstruttura AND ( 
                ($2::date BETWEEN prenotazione.checkin AND prenotazione.checkout) OR 
                ($3::date BETWEEN prenotazione.checkin AND prenotazione.checkout) OR 
                ($2::date < prenotazione.checkin AND $3::date > prenotazione.checkout) 
            )
        )`

    static queryPrenotazioniCV = `
        SELECT CV.refstruttura
        FROM casavacanze as CV 
        WHERE (CV.nlettisingoli + 2 * CV.nlettimatrimoniali) >= $4::integer AND 
            CV.refstruttura NOT IN ( 
            SELECT prenotazione.refstruttura 
            FROM prenotazione 
            WHERE 
            ($2::date BETWEEN prenotazione.checkin AND prenotazione.checkout) OR 
            ($3::date BETWEEN prenotazione.checkin AND prenotazione.checkout) OR 
            ($2::date <= prenotazione.checkin AND $3::date >= prenotazione.checkout)
        )`

    static queryID_BB = `
        SELECT struttura.idstruttura as id
        FROM struttura
        WHERE struttura.idstruttura IN (${this.queryDestinazione}) AND  
            struttura.idstruttura IN (${this.queryPrenotazioniBB}) AND
            struttura.idstruttura IN (${this.queryDurataSoggiorno})`

    static queryID_CV = `
        SELECT struttura.idstruttura as id
        FROM struttura
        WHERE struttura.idstruttura IN (${this.queryDestinazione}) AND 
            struttura.idstruttura IN (${this.queryPrenotazioniCV}) AND
            struttura.idstruttura IN (${this.queryDurataSoggiorno})`

    static queryID_BB_CV = `
        SELECT struttura.idstruttura as id
        FROM struttura
        WHERE struttura.idstruttura IN (${this.queryDestinazione}) AND
            struttura.idstruttura IN (${this.queryDurataSoggiorno}) AND (
                (struttura.idstruttura IN (${this.queryPrenotazioniBB})) OR 
                (struttura.idstruttura IN (${this.queryPrenotazioniCV}))
            )`

}

module.exports = QueryRicerca