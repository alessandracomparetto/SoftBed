import React from "react";

function ImmagineSecondaria(props) {
    return (
        <a href={`/uploads/foto/${props.nomeImmagine}`} target="_blank" rel="noopener noreferrer">
            <figure className="figure overflow-hidden w-100 col-3 col-md-6 px-2" style={{height: 15 + "vw", maxHeight: 214 + "px"}}>
                <img className="img h-100 w-100 m-auto d-block img-cover img-fluid"
                     src={`/uploads/foto/${props.nomeImmagine}`} alt={props.nomestruttura} />
            </figure>
        </a>
    )

}

function ImmaginiStruttura(props) {

    return (
        <div className="m-3 d-md-flex justify-content-center">
            {/* Immagine principale */}
            <div className="col-12 col-md-7 pr-md-0">
                {props.struttura.foto && props.struttura.foto[0] && (
                    <a href={`/uploads/foto/${props.struttura.foto[0]}`} target="_blank" rel="noopener noreferrer" >
                        <figure className="figure overflow-hidden h-100" style={{height: 30 + "vw", maxHeight: 450 + "px"}}>
                            <img className="img h-100 m-auto img-cover img-fluid"
                                 src={`/uploads/foto/${props.struttura.foto[0]}`} alt={`${props.struttura.nome}`} />
                        </figure>
                    </a>
                )}
            </div>

            {/* Altre immagini */}
            { props.struttura.foto && props.struttura.foto[1] && (
                <div className="col-12 col-md-5 mt-3 mt-md-0">
                    {props.struttura.foto.slice(1, Math.min(5, props.struttura.foto.length)).map((immagine, indice) => {
                        return <ImmagineSecondaria key={indice + 1} id={props.idstruttura} nomestruttura={props.struttura.nome} nomeImmagine={props.struttura.foto[indice + 1]}/>
                    })}
                </div>
            )}
        </div>
    )
}

export default ImmaginiStruttura;