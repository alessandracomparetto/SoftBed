

class Timer{
    constructor() {
        const dueGiorni=48*60*60*1000;
        this.array = [];
    }

    aggiungiTimeout(prenotazione){
        let idTimeout=setTimeout(function(){
            router.post('/scadenza-prenotazione')
        }, 3000); /*TODO Sistemare timer*/
        console.log("id", idTimeout);
        this.array.push({"id":idTimeout, "prenotazione":prenotazione});
        console.log(this.array);
    }

    distruggiTimeout(prenotazione){
        for(let i = 0; i<this.array; i++){
            if(this.array[i].prenotazione===prenotazione){
                this.array.splice(i,1); //rimuove l'elemento di posto i
                break;
                clearTimeout(array[i].id);
            }
        }
        return 1;
    }

}

module.exports = Timer;