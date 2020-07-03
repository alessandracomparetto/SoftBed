class Token{
    constructor() {
        this.array = [];
    }

    aggiungiSessione(id, sessione){
        console.log("id", id);
        this.array.push({"id":id, "sessione":sessione});
        console.log(this.array);
    }

    verificaToken(id, sessione){
        for(let i = 0; i<this.array; i++){
            if(this.array[i].id===id && this.array[i].sessione===sessione){
                return 0;
                break;
            }
        }
        return 1;
    }

    distruggiToken(id, sessione){
        for(let i = 0; i<this.array; i++){
            if(this.array[i].id===id && this.array[i].sessione===sessione){
                this.array.splice(i,1); //rimuove l'elemento di posto i
                break;
            }
        }
        return 1;
    }
}

module.exports = Token;