class Token{
    constructor() {
        this.array = [];
    }

    aggiungiSessione(id, cookie){
        let flag = false;
        for(let i = 0; i<this.array.length;i++){
            if(this.array[i].id===id){
                this.array[i].cookie=cookie;
                flag = true;
                break;
            }
        }
        if(!flag){
            this.array.push({"id":id, "cookie":cookie});
        }
        this.stampaToken();
    }

    verificaToken(id, cookie){
        for(let i = 0; i<this.array.length; i++){
            if(this.array[i].id===id && this.array[i].cookie===cookie){
                return true;
            }
        }
        return false;
    }

    distruggiToken(id, cookie){
        for(let i = 0; i<this.array.length; i++){
            if(this.array[i].id===id && this.array[i].cookie===cookie){
                this.array.splice(i,1); //rimuove l'elemento di posto i
                return true;
            }
        }
        return false;
    }

    stampaToken(){
        console.log(this.array);
    }
}

module.exports = Token;