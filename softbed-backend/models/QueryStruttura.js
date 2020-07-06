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
                   C.oraFineCheckOut,
                   C.anticipoPrenotazioneMin,
                   C.anticipoPrenotazioneMax,
                   C.pagamentoLoco,
                   C.pagamentoOnline
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
            FROM \`b&b\` as BB
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
            FROM \`b&b\` as BB
            WHERE BB.refStruttura = ?`
    }

    static queryCamereBB() {
        return `
            SELECT CBB.tipologiaCamera, COUNT(*) as numero, MIN(CBB.prezzoBaseANotte) as prezzo
            FROM \`camerab&b\` as CBB,
                 \`b&b\` as BB
            WHERE BB.refStruttura = ?
              AND BB.refStruttura = CBB.refStruttura
            GROUP BY CBB.tipologiaCamera`
    }

    // *************************************************************************************** CV
    static queryDescrizioneCV() {
        return `
            SELECT CV.descrizione
            FROM casavacanze as CV
            WHERE CV.refStruttura = ?`
    }

    static queryPrezzoCV() {
        return `
            SELECT CV.prezzoNotte
            FROM casavacanze as CV
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
            FROM casavacanze as CV
            WHERE CV.refStruttura = ?`
    }

    static queryAmbientiCV() {
        return `
            SELECT CV.salotto, CV.giardino, CV.terrazza, CV.piscina
            FROM casavacanze as CV
            WHERE CV.refStruttura = ?`
    }

    static queryBagniCamereLettiCV() {
        return `
            SELECT CV.nCamere            as camere,
                   CV.nBagni             as bagni,
                   CV.nLettiSingoli      as singoli,
                   CV.nLettiMatrimoniali as matrimoniali
            FROM casavacanze as CV
            WHERE CV.refStruttura = ?`
    }
}

module.exports = QueryStruttura;
