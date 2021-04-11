class QueryStruttura {
    constructor() {}

    // *************************************************************************************** QUERY
    // *************************************************************************************** GENERALI
    static queryStruttura = `
        SELECT struttura.nomestruttura, struttura.tipologiastruttura
        FROM struttura
        WHERE struttura.idstruttura = $1::integer`

    static queryLocalita = `
        SELECT R.nomeregione   as regione,
               P.nomeprovincia as provincia,
               C.nomecomune    as comune,
               I.via,
               I.numerocivico
        FROM regioni as R,
             province as P,
             comuni as C,
             indirizzo as I,
             struttura as S
        WHERE S.idstruttura = $1::integer AND 
              S.refindirizzo = I.idindirizzo AND 
              I.refcomune = C.idcomune AND 
              C.refprovincia = P.idprovincia AND 
              P.refregione = R.idregione`

    static queryFoto = `
        SELECT fotografie.percorso
        FROM fotografie
        WHERE fotografie.refstruttura = $1::integer`

    static queryCondizioni = `
        SELECT C.minsoggiorno,
               C.maxsoggiorno,
               C.orainiziocheckin,
               C.orafinecheckin,
               C.orainiziocheckout,
               C.orafinecheckout,
               C.anticipoprenotazionemin,
               C.anticipoprenotazionemax,
               C.pagamentoloco,
               C.pagamentoonline
        FROM condizioni as C
        WHERE C.refstruttura = $1::integer`

    static queryTasse = `
        SELECT C.prezzoadulti as adulti, C.prezzobambini as bambini
        FROM condizioni as C
        WHERE C.refstruttura = $1::integer`


    // *************************************************************************************** B&B
    static queryDescrizioneBB = `
        SELECT BB.descrizione
        FROM "b&b" as BB
        WHERE BB.refstruttura = $1::integer`

    static queryServiziBB = `
        SELECT BB.bambini,
               BB.ariacondizionata,
               BB.wifi,
               BB.riscaldamento,
               BB.parcheggio,
               BB.strutturadisabili,
               BB.animaliammessi,
               BB.permessofumare,
               BB.TV,
               BB.cucinaceliaci,
               BB.navettaaeroportuale,
               BB.servizioincamera
        FROM "b&b" as BB
        WHERE BB.refstruttura = $1::integer`

    static queryCamereBB = `
        SELECT CBB.tipologiacamera, COUNT(*) as numero, MIN(CBB.prezzobaseanotte) as prezzo
        FROM "camerab&b" as CBB,
             "b&b" as BB
        WHERE BB.refstruttura = $1::integer AND 
              BB.refstruttura = CBB.refstruttura
        GROUP BY CBB.tipologiacamera`

    // *************************************************************************************** CV
    static queryDescrizioneCV = `
        SELECT CV.descrizione
        FROM casavacanze as CV
        WHERE CV.refstruttura = $1::integer`

    static queryPrezzoCV = `
        SELECT CV.prezzonotte
        FROM casavacanze as CV
        WHERE CV.refstruttura = $1::integer`


    static queryServiziCV = `
        SELECT CV.bambini,
               CV.riscaldamento,
               CV.ariacondizionata,
               CV.wifi,
               CV.parcheggio,
               CV.strutturadisabili,
               CV.animaliammessi,
               CV.permessofumare,
               CV.festeammesse,
               CV.TV
        FROM casavacanze as CV
        WHERE CV.refstruttura = $1::integer`

    static queryAmbientiCV = `
        SELECT CV.salotto, CV.giardino, CV.terrazza, CV.piscina
        FROM casavacanze as CV
        WHERE CV.refstruttura = $1::integer`

    static queryBagniCamereLettiCV = `
        SELECT CV.ncamere            as camere,
               CV.nbagni             as bagni,
               CV.nlettisingoli      as singoli,
               CV.nlettimatrimoniali as matrimoniali
        FROM casavacanze as CV
        WHERE CV.refstruttura = $1::integer`
}

module.exports = QueryStruttura;
