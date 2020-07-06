import React from "react";
import {Link} from "react-router-dom";

function Breadcrumb(props) {
    return (
        <nav aria-label="breadcrumb">
            <ol className="d-flex pl-0 mb-0">
                <i className={"fas mr-2 fa-" + props.icona} style={{lineHeight: 24 + "px"}}/>
                {
                    props.gerarchia.map((elemento, indice) => {
                        return (
                            <li key={indice} className={`${indice > 2 ? "d-none d-sm-block " : ""}breadcrumb-item ${elemento.stato}`}>
                                { elemento.stato === "active" ? (
                                    <span>{elemento.testo}</span>
                                    ) : (
                                        <Link to={elemento.url}>{elemento.testo}</Link>
                                    )
                                }
                            </li>
                        )
                    })
                }
            </ol>
        </nav>
    )
}

export default Breadcrumb;