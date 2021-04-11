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
                   <strong>Check-in: </strong> <span>{new Date(props.dati.checkin).toLocaleString()}</span>
               </div>
               <div className="col-sm-12 col-md">
                   <strong>Check-out: </strong>
                   <span> {new Date(props.dati.checkout).toLocaleString()}</span>
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
                                       <strong className="text-capitalize">{camera.tipologiacamera}:</strong>
                                       <span> {camera.nlettisingoli}x letti singoli</span>
                                       <span> {camera.nlettimatrimoniali}x letti matrimoniali</span>
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
                   <span> {props.dati.nadulti+props.dati.nbambini} ({props.dati.nadulti}x adulti e {props.dati.nbambini}x bambini) </span>
               </div>
               <div className="col-sm-12 col-md">
                   <strong>Esenti:</strong>
                   <span> Adulti: {props.dati.nesentiadulti}</span>
                   <span> Bambini: {props.dati.nesentibambini}</span>
               </div>
           </div>
           <div className="row  mb-3">
               <div className="col-sm-12 col-md">
                   <strong>Pagamento:</strong>
                   {
                       props.dati.metodopagamento ?
                           <span> online </span>
                           :
                           <span> in loco</span>
                    }
               </div>
               <div className="col-sm-12 col-md">
                   <strong>Prezzo: </strong>
                   <span>{props.dati.costo} € </span>
               </div>
           </div>
           <div>
               <strong>Stato:</strong>
               {
                   props.dati.confermata === true ?
                       <span> confermata il {new Date(props.dati.dataconferma).toLocaleDateString()}</span>
                       :
                       <span> scade il {new Date(props.dati.datascadenza).toLocaleString()}</span>
                }
           </div>
       </div>
    </div>
)
}
export default Prenotazione