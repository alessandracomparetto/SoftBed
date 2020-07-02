import React from "react";

function Caratteristica(props) {
    return (
        <div className={`${props.esteso ? "" : "col-2 text-center text-sm-left "}col-sm-6 p-1 text-90`}>
            <span title={props.caratteristica} className={`${props.esteso ? "mr-2" : "mr-sm-2"} w-20px text-center text-primary fas fa-${props.icona}`}/><span className={props.esteso ? "" : "d-none d-sm-inline"}>{props.caratteristica}</span>
        </div>
    )
}

export default Caratteristica;