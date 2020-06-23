import React from "react";

function ImmagineSecondaria(props) {
    return (
        <figure className="figure overflow-hidden w-100 col-3 col-md-6 px-2" style={{height: 15 + "vw", maxHeight: 214 + "px"}}>
            <img className="img h-100 w-100 m-auto d-block img-cover img-fluid"
                 src={`/uploads/${props.id}/${props.nomeImmagine}`} alt={props.nomeStruttura} />
        </figure>
    )

}

function ImmaginiStruttura(props) {

    const listaImmagini = [
        "1.jpg",
        "2.jpg",
        "3.jpg",
        "4.jpg",
        "5.jpg"
    ]

    return (
        <div className="m-3 row">
            {/* Immagine principale */}
            <div className="col-12 col-md-7 pr-md-0">
                <figure className="figure overflow-hidden h-100" style={{height: 30 + "vw", maxHeight: 450 + "px"}}>
                    <img className="img h-100 m-auto img-cover img-fluid"
                         src={`/uploads/${props.struttura.id}/1.jpg`} alt={props.struttura.nome} />
                </figure>
            </div>

            {/* Altre immagini */}
            <div className="col-12 col-md-5 mt-3 mt-md-0">
                { listaImmagini.map((immagine, indice) => {
                    if (indice === 0 || indice > 4) {
                        return
                    }
                    return <ImmagineSecondaria key={indice} id={props.struttura.id} nomeStruttura={props.struttura.nome}
                                               nomeImmagine={immagine}/>
                })}
            </div>
        </div>
    )
}

export default ImmaginiStruttura;