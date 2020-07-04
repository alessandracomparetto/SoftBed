class Token{
    constructor() {
        this.array = [];
    }

    aggiungiSessione(id, cookie){
        console.log("id", id);
        this.array.push({"id":id, "cookie":cookie});
        this.stampaToken();
    }

    verificaToken(id, cookie){
        for(let i = 0; i<this.array; i++){
            if(this.array[i].id===id && this.array[i].cookie===cookie){
                return 0;
                break;
            }
        }
        return 1;
    }

    distruggiToken(id, cookie){
        this.stampaToken()
        for(let i = 0; i<this.array.length; i++){
            console.log("dentro il for");
            if(this.array[i].id===id && this.array[i].cookie===cookie){
                this.array.splice(i,1); //rimuove l'elemento di posto i
                return 0
            }
        }
        return 1;
    }

    stampaToken(){
        console.log(this.array);
    }
}

module.exports = Token;