class Timer{
    constructor() {
        this.array = [];
    }

    aggiungiTimeout(prenotazione){
        let idTimeout=setTimeout(aggiornaPrenotazione, 3000)
        console.log("id", idTimeout);
        this.array.push({"id":idTimeout, "prenotazione":prenotazione});
        console.log(this.array);
    }

    distruggiTimeout(prenotazione){
        for(let i = 0; i<this.array; i++){
            if(this.array[i].prenotazione===prenotazione){
                this.array.splice(i,1); //rimuove l'elemento di posto i
                break;
            }
        }
        return 1;
    }

    aggiornaPrenotazione(){

    }
}

module.exports = Token;