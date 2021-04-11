function abilitazione(){
    let prezzoCancellazione = document.getElementById("penalecancellazione");
    let preavvisodisdetta = document.getElementById("preavvisodisdetta");
    let preavvisoTesto =  document.getElementById("preavvisoTesto");
    if(document.getElementById("pagamento").checked){
        prezzoCancellazione.removeAttribute("disabled");
        prezzoCancellazione.setAttribute("required", "required");
        preavvisodisdetta.removeAttribute("disabled");
        preavvisodisdetta.setAttribute("required", "required");
        preavvisoTesto.classList.remove("text-muted");
        return 1;
    }else{
        prezzoCancellazione.setAttribute("disabled", "disabled");
        prezzoCancellazione.classList.remove("required");
        preavvisodisdetta.setAttribute("disabled", "disabled");
        preavvisodisdetta.classList.remove("required");
        preavvisoTesto.classList.add("text-muted");
        prezzoCancellazione.value = null;
        preavvisodisdetta.value = null;
        return 0;
    }
}
export {abilitazione};