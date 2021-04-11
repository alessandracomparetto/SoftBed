import React from "react";

function PaginaNonTrovata() {
    return (
        <div className="text-center p-5">
            <h1>Oops! La pagina non è stata trovata<i aria-hidden="true" className="ml-3 fas fa-sad-tear"/></h1>
            <h4>Sembra che non ci sia nulla qui. Vuoi provare con una ricerca?</h4>
        </div>
    );
}

export default PaginaNonTrovata;