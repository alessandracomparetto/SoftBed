import React from "react";

function Servizio(props) {
    return (
        <div className="col-2 col-sm-6 p-1 text-90 text-center text-sm-left">
            <span className={"mr-sm-2 w-20px text-center text-primary fas fa-" + props.icona}/><span className="d-none d-sm-inline">{props.servizio}</span>
        </div>
    )
}

export default Servizio;