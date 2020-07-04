class QueryStruttura {
    constructor() {}

    // *************************************************************************************** QUERY
    // *************************************************************************************** GENERALI
    static queryStruttura() {
        return `
            SELECT struttura.nomeStruttura, struttura.tipologiaStruttura
            FROM struttura
            WHERE struttura.idStruttura = ?`
    }

    static queryLocalita() {
        return `
            SELECT R.nomeRegione   as regione,
                   P.nomeProvincia as provincia,
                   C.nomeComune    as comune,
                   I.via,
                   I.numeroCivico
            FROM regioni as R,
                 province as P,
                 comuni as C,
                 indirizzo as I,
                 struttura as S
            WHERE S.idStruttura = ?
              AND S.refIndirizzo = I.idIndirizzo
              AND I.refComune = C.idComune
              AND C.refProvincia = P.idProvincia
              AND P.refRegione = R.idRegione`
    }

    static queryFoto() {
        return `
            SELECT fotografie.percorso
            FROM fotografie
            WHERE fotografie.refStruttura = ?`
    }

    static queryCondizioni() {
        return `
            SELECT C.minSoggiorno,
                   C.maxSoggiorno,
                   C.oraInizioCheckIn,
                   C.oraFineCheckIn,
                   C.oraInizioCheckOut,
                   C.oraFineCheckOut
            FROM condizioni as C
            WHERE C.refStruttura = ?`
    }

    static queryTasse() {
        return `
            SELECT C.prezzoAdulti as adulti, C.prezzoBambini as bambini
            FROM condizioni as C
            WHERE C.refStruttura = ?`
    }

    // *************************************************************************************** B&B
    static queryDescrizioneBB() {
        return `
            SELECT BB.descrizione
            FROM \`B&B\` as BB
            WHERE BB.refStruttura = ?`
    }

    static queryServiziBB() {
        return `
            SELECT BB.bambini,
                   BB.ariaCondizionata,
                   BB.wifi,
                   BB.riscaldamento,
                   BB.parcheggio,
                   BB.strutturaDisabili,
                   BB.animaliAmmessi,
                   BB.permessoFumare,
                   BB.TV,
                   BB.cucinaCeliaci,
                   BB.navettaAeroportuale,
                   BB.servizioInCamera
            FROM \`B&B\` as BB
            WHERE BB.refStruttura = ?`
    }

    static queryCamereBB() {
        return `
            SELECT CBB.tipologiaCamera, COUNT(*) as numero, MIN(CBB.prezzoBaseANotte) as prezzo
            FROM \`cameraB&B\` as CBB,
                 \`B&B\` as BB
            WHERE BB.refStruttura = ?
              AND BB.refStruttura = CBB.refStruttura
            GROUP BY CBB.tipologiaCamera`
    }

    // *************************************************************************************** CV
    static queryDescrizioneCV() {
        return `
            SELECT CV.descrizione
            FROM casaVacanze as CV
            WHERE CV.refStruttura = ?`
    }

    static queryPrezzoCV() {
        return `
            SELECT CV.prezzoNotte
            FROM casaVacanze as CV
            WHERE CV.refStruttura = ?`
    }

    static queryServiziCV() {
        return `
            SELECT CV.bambini,
                   CV.riscaldamento,
                   CV.ariaCondizionata,
                   CV.wifi,
                   CV.parcheggio,
                   CV.strutturaDisabili,
                   CV.animaliAmmessi,
                   CV.permessoFumare,
                   CV.festeAmmesse,
                   CV.TV
            FROM casaVacanze as CV
            WHERE CV.refStruttura = ?`
    }

    static queryAmbientiCV() {
        return `
            SELECT CV.salotto, CV.giardino, CV.terrazza, CV.piscina
            FROM casaVacanze as CV
            WHERE CV.refStruttura = ?`
    }

    static queryBagniCamereLettiCV() {
        return `
            SELECT CV.nCamere            as camere,
                   CV.nBagni             as bagni,
                   CV.nLettiSingoli      as singoli,
                   CV.nLettiMatrimoniali as matrimoniali
            FROM casaVacanze as CV
            WHERE CV.refStruttura = ?`
    }

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

    static queryInformazioniBB(destinazione, arrivo, partenza, ospiti) {
        return `
            SELECT struttura.idStruttura as id, struttura.nomeStruttura as nome, fotografie.percorso as foto
            FROM struttura, fotografie
            WHERE struttura.idStruttura IN (${this.queryDestinazione(destinazione)}) AND  
                struttura.idStruttura IN (${this.queryPrenotazioniBB(arrivo, partenza, ospiti)}) AND 
                struttura.idStruttura = fotografie.refStruttura AND
                fotografie.idFoto = ( 
                    SELECT F2.idFoto
                    FROM fotografie as F2
                    WHERE F2.refStruttura = struttura.idStruttura
                    LIMIT 1
                )`
    }

    static queryInformazioniCV(destinazione, arrivo, partenza, ospiti) {
        return `
            SELECT struttura.idStruttura as id, struttura.nomeStruttura as nome, fotografie.percorso as foto
            FROM struttura, fotografie
            WHERE struttura.idStruttura IN (${this.queryDestinazione(destinazione)}) AND 
                struttura.idStruttura IN (${this.queryPrenotazioniCV(arrivo, partenza, ospiti)}) AND 
                struttura.idStruttura = fotografie.refStruttura AND
                fotografie.idFoto = ( 
                    SELECT F2.idFoto
                    FROM fotografie as F2
                    WHERE F2.refStruttura = struttura.idStruttura
                    LIMIT 1
                )`
    }

    static queryInformazioniBBCV(destinazione, arrivo, partenza, ospiti) {
        return `
            SELECT struttura.idStruttura as id, struttura.nomeStruttura as nome, fotografie.percorso as foto
            FROM struttura, fotografie
            WHERE struttura.idStruttura IN (${this.queryDestinazione(destinazione)}) AND (
                    (struttura.idStruttura IN (${this.queryPrenotazioniBB(arrivo, partenza, ospiti)})) OR 
                    (struttura.idStruttura IN (${this.queryPrenotazioniCV(arrivo, partenza, ospiti)}))
                ) AND 
                struttura.idStruttura = fotografie.refStruttura AND
                fotografie.idFoto = ( 
                    SELECT F2.idFoto
                    FROM fotografie as F2
                    WHERE F2.refStruttura = struttura.idStruttura
                    LIMIT 1
                )`
    }
}

module.exports = QueryStruttura;
