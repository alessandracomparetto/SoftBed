import React, {useState} from "react";
function Prenotazione(props){
return(
    <div className="container">
        <h4>Informazioni prenotazione</h4>
        <h5>Richiesta effettuata da:</h5>
        <div className="mr-1">
            <div className="row">
                <p className="col"><strong>Nome:   </strong> Mario</p>
                <p className="col"><strong>Cognome: </strong> Rossi</p>
            </div>
            <div className="row">
                <p className="col"><strong>Email:    </strong> example@email.com</p>
                <p className="col"><strong>Telefono: </strong> +(00)123456789</p>
            </div>
        </div>
        <h5>Riepilogo:</h5>
       <div className="mr-1 mt-1">
           <h8 className="border-bottom">Ospiti</h8>
           <div className="row">
               <div className="col">
                   <strong>Check-in: </strong> <span>{props.dataCheckIn} ore 15:00</span>
               </div>
               <div className="col">
                   <strong>Check-out: </strong>
                   <span> {props.dataCheckOut} ore 15:00</span>
               </div>
           </div>
               { props.tipologia=="B&B" && (
                   <div className="mt-1">
                       <h8 className="border-bottom">Camere</h8>
                       <div className="row">
                           { props.camere.map((camera, indice) => {
                           if (camera.numero !== 0) {
                               return (
                                   <div key={indice} className="col-6">
                                       <strong className="text-capitalize">{camera.tipologia}:</strong>
                                       <span>{camera.nCamerePerTipologia}</span>
                                   </div>
                               );
                           }

                       })}
                       </div>
                   </div>
               )
           }
           <h8 className="border-bottom">Altre informazioni</h8>
           <div className="row mt-1">
               <div className="col">
                   <strong>Ospiti:</strong>
                   <span> {props.nAdulti+props.nBambini} ({props.nAdulti} adulti e {props.nBambini} bambini) </span>
               </div>
               <div className="col">
                   <strong>Esenti:</strong>
                   <span> {props.nEsenti}</span>
               </div>
           </div>
           <div className="row ">
               <div className="col">
                   <strong>Pagamento:</strong>
                   <span> {props.metodoPagamento}</span>
               </div>
               <div className="col">
                   <strong>Prezzo: </strong>
                   <span>{props.costo} € </span>
               </div>
           </div>
           <div >
               <strong>Stato:</strong>
               <span> confermata il {props.dataConferma}</span>
           </div>
       </div>
    </div>
)
}
export default Prenotazione