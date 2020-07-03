import React from "react";

function Prenotazione(props){
return(
    <div className="container">
        <h4>Informazioni prenotazione</h4>
        <h5>Richiesta effettuata da:</h5>
        <div className=" row  mb-3">
            <div className="col-sm-12 col-md">
                <strong>Nome:   </strong>
                <span>{props.dati.nome}</span>
            </div>
            <div className="col-sm-12 col-md">
                <strong>Cognome: </strong>
                <span>{props.dati.cognome}</span>
            </div>
        </div>
        <div className="row">
            <div className="col-sm-12 col-md">
                <strong>Email:    </strong>
                <span>{props.dati.email}</span>
            </div>
            <div className="col-sm-12 col-md">
                <strong>Telefono:</strong>
                <span>{props.dati.telefono}</span>
            </div>
        </div>
        <h5 className="mt-2 ">Riepilogo dati prenotazioni:</h5>
       <div className="mr-1 mt-1">
           <div className="row mb-3">
               <div className="col-sm-12 col-md">
                   <strong>Check-in: </strong> <span>{new Date(props.dati.checkIn).toLocaleString()}</span>
               </div>
               <div className="col-sm-12 col-md">
                   <strong>Check-out: </strong>
                   <span> {new Date(props.dati.checkOut).toLocaleString()}</span>
               </div>
           </div>
               { props.dati.camere && (
                   <div className="mt-1">
                       <h6><strong>Camere:</strong></h6>
                       <div className="row mb-3">
                           { props.dati.camere.map((camera, indice) => {
                           if (camera.numero !== 0) {
                               return (
                                   <div key={indice} className="col-sm-12 col-md">
                                       <strong className="text-capitalize">{camera.tipologiaCamera}:</strong>
                                       <span> {camera.nLettiSingoli} letti singoli</span>
                                       <span> {camera.nLettiMatrimoniali} letti matrimoniali</span>
                                   </div>
                               );
                           }
                       })}
                       </div>
                   </div>
               )
           }
           <div className="row mb-3">
               <div className="col-sm-12 col-md">
                   <h6 ><strong>Ospiti:</strong></h6>
                   <span> {props.dati.nAdulti+props.dati.nBambini} ({props.dati.nAdulti} adulti e {props.dati.nBambini} bambini) </span>
               </div>
               <div className="col-sm-12 col-md">
                   <strong>Esenti:</strong>
                   <span> Adulti: {props.dati.nEsentiAdulti}</span>
                   <span> Bambini: {props.dati.nEsentiBambini}</span>
               </div>
           </div>
           <div className="row  mb-3">
               <div className="col-sm-12 col-md">
                   <strong>Pagamento:</strong>
                   {props.dati.metodoPagamento ?
                       <span> online </span>   :
                       <span> in loco</span>
                    }
               </div>
               <div className="col-sm-12 col-md">
                   <strong>Prezzo: </strong>
                   <span>{props.dati.costo} € </span>
               </div>
           </div>
           <div>
               <strong>Stato:</strong>{
               props.dati.confermata===1 ?
                   <span> confermata il {new Date(props.dati.dataConferma).toLocaleDateString()}</span>
                   :
                   <span> scade il {new Date(props.dati.dataScadenza).toLocaleString()}</span>

                }
           </div>
       </div>
    </div>
)
}
export default Prenotazione