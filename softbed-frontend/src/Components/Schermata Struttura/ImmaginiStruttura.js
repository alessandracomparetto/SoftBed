import React from "react";

function ImmagineSecondaria(props) {
    return (
        <a href={`/uploads/foto/${(props.id ? (props.id + "/") : "")}${props.nomeImmagine}`} target="_blank" rel="noopener noreferrer">
            <figure className="figure overflow-hidden w-100 col-3 col-md-6 px-2" style={{height: 15 + "vw", maxHeight: 214 + "px"}}>
                <img className="img h-100 w-100 m-auto d-block img-cover img-fluid"
                     src={`/uploads/foto/${(props.id ? (props.id + "/") : "")}${props.nomeImmagine}`} alt={props.nomeStruttura} />
            </figure>
        </a>
    )

}

function ImmaginiStruttura(props) {
    return (
        <div className="m-3 row">
            {/* Immagine principale */}
            <div className="col-12 col-md-7 pr-md-0">
                <a href={`/uploads/foto/${(props.idStruttura ? (props.idStruttura +"/") : "")}${props.struttura.foto[0]}`} target="_blank" rel="noopener noreferrer" >
                    <figure className="figure overflow-hidden h-100" style={{height: 30 + "vw", maxHeight: 450 + "px"}}>
                        <img className="img h-100 m-auto img-cover img-fluid"
                             src={`/uploads/foto/${(props.idStruttura ? (props.idStruttura +"/") : "")}${props.struttura.foto[0]}`} alt={`${props.struttura.nome}`} />
                    </figure>
                </a>
            </div>

            {/* Altre immagini */}
            <div className="col-12 col-md-5 mt-3 mt-md-0">
                { props.struttura.foto.map((immagine, indice) => {
                    if (indice === 0 || indice > 4) {
                        return null;
                    }
                    return <ImmagineSecondaria key={indice} id={props.idStruttura} nomeStruttura={props.struttura.nome}
                                               nomeImmagine={props.struttura.foto[indice]}/>
                })}
            </div>
        </div>
    )
}

export default ImmaginiStruttura;