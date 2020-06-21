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
            <div className="row margin-0">
                {/* Immagine principale */}
                <div className="col-12 col-md-7 pr-md-0">
                    <figure className="figure overflow-hidden w-100" style={{height: 38 + "vh"}}>
                        <img className="img h-100 m-auto d-block img-cover img-fluid" src={"/uploads/" + props.struttura.id + "/1.jpg"} />
                    </figure>
                </div>
                {/* Altre immagini */}
                <div className="col-12 col-md-5">
                    <figure className="figure overflow-hidden w-100 col-3 col-md-6 px-2" style={{height: 19 + "vh"}}>
                        <img className="img h-100 w-100 m-auto d-block img-cover img-fluid" src={"/uploads/" + props.struttura.id + "/2.jpg"} />
                    </figure>
                    <figure className="figure overflow-hidden w-100 col-3 col-md-6 px-2" style={{height: 19 + "vh"}}>
                        <img className="img h-100 w-100 m-auto d-block img-cover img-fluid" src={"/uploads/" + props.struttura.id + "/3.jpg"} />
                    </figure>
                    <figure className="figure overflow-hidden w-100 col-3 col-md-6 px-2" style={{height: 19 + "vh"}}>
                        <img className="img h-100 w-100 m-auto d-block img-cover img-fluid" src={"/uploads/" + props.struttura.id + "/4.jpg"} />
                    </figure>
                    <figure className="figure overflow-hidden w-100 col-3 col-md-6 px-2" style={{height: 19 + "vh"}}>
                        <img className="img h-100 w-100 m-auto d-block img-cover img-fluid" src={"/uploads/" + props.struttura.id + "/5.jpg"} />
                    </figure>
                </div>
            </div>

            {/* Informazioni sulla struttura */}
            <div>

            </div>
        </div>
    )
}

export default SchermataStruttura;