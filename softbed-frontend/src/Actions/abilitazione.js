function abilitazione(){
    let prezzoCancellazione = document.getElementById("penaleCancellazione");
    let preavvisoDisdetta = document.getElementById("preavvisoDisdetta");
    let preavvisoTesto =  document.getElementById("preavvisoTesto");
    if(document.getElementById("pagamento").checked){
        prezzoCancellazione.removeAttribute("disabled");
        prezzoCancellazione.setAttribute("required", "required");
        preavvisoDisdetta.removeAttribute("disabled");
        preavvisoDisdetta.setAttribute("required", "required");
        preavvisoTesto.classList.remove("text-muted");
        return 1;
    }else{
        prezzoCancellazione.setAttribute("disabled", "disabled");
        prezzoCancellazione.classList.remove("required");
        preavvisoDisdetta.setAttribute("disabled", "disabled");
        preavvisoDisdetta.classList.remove("required");
        preavvisoTesto.classList.add("text-muted");
        prezzoCancellazione.value = null;
        preavvisoDisdetta.value = null;
        return 0;
    }
}
export {abilitazione};