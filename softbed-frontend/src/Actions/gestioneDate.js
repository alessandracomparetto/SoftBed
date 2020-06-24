const GIORNO = 86400000;

// Converte la data da oggetto Date a stringa in formato "AAAA-MM-GG"
function convertiData (data, giorni, mesi, anni) {

    // Incremento del numero di giorni
    if (giorni)
        data = new Date(data.getTime() + giorni * GIORNO);

    let giorno = data.getDate();
    let mese = data.getMonth();
    let anno = data.getFullYear();

    // Incremento del numero di mesi
    if (mesi) {
        mese = mese + mesi;

        if (mese > 12) {
            anno = anno + Math.floor(mese / 12);
            mese = mese % 12;
        }
    }

    // Incremento del numero di anni
    if (anni)
        anno = anno + anni;

    giorno = giorno.toString().padStart(2, "0");
    mese = (mese + 1).toString().padStart(2, "0");

    return anno + "-" + mese + "-" + giorno;
}

export { GIORNO, convertiData };