import React from "react";

function Breadcrumb(props) {
    return (
        <nav aria-label="breadcrumb">
            <ol className="d-flex pl-0 mb-0">
                <i className={"fas mr-2 fa-" + props.icona} style={{lineHeight: 24 + "px"}}/>
                {
                    props.gerarchia.map((elemento, indice) => {
                        return (
                            <li key={indice} className={"breadcrumb-item " + elemento.stato }>
                                { elemento.stato === "active" ? (
                                    <span>{elemento.testo}</span>
                                    ) : (
                                        <a href={elemento.url}>{elemento.testo}</a>
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