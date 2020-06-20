import React from "react";

function Servizio(props) {
    return (
        <div className="col-2 col-sm-6 col-lg-4 p-1 text-center text-sm-left">
            <i className={"mr-2 text-primary fas fa-" + props.icona}/><span className="d-none d-sm-inline">{props.servizio}</span>
        </div>
    )
}

export default Servizio;