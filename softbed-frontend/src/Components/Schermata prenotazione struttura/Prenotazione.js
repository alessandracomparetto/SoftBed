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
       <div className="mr-1">
           <div className="row">
               <p className="col"><strong>Check-in: </strong> {props.dataCheckIn} ore 15:00</p>
               <p className="col"><strong>Check-out: </strong> {props.dataCheckOut} ore 15:00</p>
           </div>
           <div className="row ">
               <p className="col"><strong>Ospiti:</strong> {props.nAdulti+props.nBambini} ({props.nAdulti} adulti e {props.nBambini} bambini)</p>
               <p className="col"><strong>Esenti:</strong> {props.nEsenti}</p>
           </div>
           <div className="row ">
               <p className="col"><strong>Stato:</strong> confermata il {props.dataConferma}</p>
               <p className="col"><strong>Pagamento:</strong> {props.metodoPagamento}</p>
           </div>
           <p className="col-6 ml-n3"><strong>Prezzo: </strong>{props.costo} €</p>
       </div>
        {/*Todo aggiungere informazioni sulla camera prenotata se è un hotel*/}
    </div>
)
}
export default Prenotazione