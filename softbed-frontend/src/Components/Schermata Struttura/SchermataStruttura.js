import React, {Fragment} from "react";

function Breadcrumb(props) {
    return (
        <nav aria-label="breadcrumb">
            <ol className="d-flex pl-0">
                <i className="fas fa-map mr-2" style={{lineHeight: 24 + "px"}}/>
            {
                props.gerarchia.map((elemento, indice) => {
                    return (
                        <li className="breadcrumb-item"><a href={"/search?destinazione=" + elemento}>{elemento}</a></li>
                    )
                })
            }
            </ol>
        </nav>
    )
}

function SchermataStruttura(props) {
    return (
        <div className="container bg-white p-3 mt-3 rounded">
            {/* Informazioni */}
            <div>
                <h3>{props.struttura.nome}</h3>
                <Breadcrumb gerarchia={[props.struttura.regione, props.struttura.provincia, props.struttura.comune]}/>
            </div>

            {/* Immagini */}
            <div className="row padding-0">
                {/* Immagine principale */}
                <div className="col-12 col-md-6">
                    <figure className="figure overflow-hidden w-100" style={{height: 33 + "vw"}}>
                        <img className="img h-100 m-auto d-block" src={"/uploads/" + props.struttura.id + ".jpg"} />
                    </figure>
                </div>
                {/* Altre immagini */}
                <div className="col-12 col-md-6 row">
                    <figure className="figure overflow-hidden w-100 col-3 col-md-6 px-1" style={{height: 16 + "vw"}}>
                        <img className="img h-100 m-auto d-block" src={"/uploads/" + props.struttura.id + ".jpg"} />
                    </figure>
                    <figure className="figure overflow-hidden w-100 col-3 col-md-6 px-1" style={{height: 16 + "vw"}}>
                        <img className="img h-100 m-auto d-block" src={"/uploads/" + props.struttura.id + ".jpg"} />
                    </figure>
                    <figure className="figure overflow-hidden w-100 col-3 col-md-6 px-1" style={{height: 16 + "vw"}}>
                        <img className="img h-100 m-auto d-block" src={"/uploads/" + props.struttura.id + ".jpg"} />
                    </figure>
                    <figure className="figure overflow-hidden w-100 col-3 col-md-6 px-1" style={{height: 16 + "vw"}}>
                        <img className="img h-100 m-auto d-block" src={"/uploads/" + props.struttura.id + ".jpg"} />
                    </figure>
                </div>
            </div>

            {/* Altro */}
            <div>

            </div>
        </div>
    )
}

export default SchermataStruttura;