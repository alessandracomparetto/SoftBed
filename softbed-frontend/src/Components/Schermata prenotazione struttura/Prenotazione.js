import React, {useEffect, useState} from "react";
import axios from "axios";
function Prenotazione(props){
return(
    <div className="container">
        <h4>Informazioni prenotazione</h4>
        <h5>Richiesta effettuata da:</h5>
        <div className=" row">
            <div className="col">
                <strong>Nome:   </strong>
                <span>{props.dati.nome}</span>
            </div>
            <div className="col">
                <strong>Cognome: </strong>
                <span>{props.dati.cognome}</span>
            </div>
        </div>
        <div className="row">
            <div className="col">
                <strong>Email:    </strong>
                <span>{props.dati.email}</span>
            </div>
            <div className="col">
                <strong>Telefono:</strong>
                <span>{props.dati.telefono}</span>
            </div>
        </div>
        <h5 className="mt-2 ">Riepilogo dati prenotazioni:</h5>
       <div className="mr-1 mt-1">
           <div className="row">
               <div className="col">
                   <strong>Check-in: </strong> <span>{new Date(props.dati.checkIn).toLocaleString()}</span>
               </div>
               <div className="col">
                   <strong>Check-out: </strong>
                   <span> {new Date(props.dati.checkOut).toLocaleString()}</span>
               </div>
           </div>
               { props.dati.tipologia=="B&B" && (
                   <div className="mt-1">
                       <h8 className="border-bottom">Camere</h8>
                       <div className="row">
                           { props.dati.camere.map((camera, indice) => {
                               console.log("Camera"+indice+" "+camera);
                           if (camera.numero !== 0) {
                               return (
                                   <div key={indice} className="col-6">
                                       <strong className="text-capitalize">{camera.tipologia}:</strong>
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
           <div className="row mt-1">
               <div className="col">
                   <strong>Ospiti:</strong>
                   <span> {props.dati.nAdulti+props.dati.nBambini} ({props.dati.nAdulti} adulti e {props.dati.nBambini} bambini) </span>
               </div>
               <div className="col">
                   <strong>Esenti:</strong>
                   <span> {props.dati.nEsenti}</span>
               </div>
           </div>
           <div className="row ">
               <div className="col">
                   <strong>Pagamento:</strong>
                   {props.dati.metodoPagamento ?
                       <span> online </span>   :
                       <span> in loco</span>
                    }
               </div>
               <div className="col">
                   <strong>Prezzo: </strong>
                   <span>{props.dati.costo} € </span>
               </div>
           </div>
           <div>
               <strong>Stato:</strong>{
               props.dati.confermata==1 ?
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