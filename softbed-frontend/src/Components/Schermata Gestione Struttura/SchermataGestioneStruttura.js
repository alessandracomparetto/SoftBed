import React from "react"
import InformazioniStruttura from "./InformazioniStruttura";
import Sidebar from "./Sidebar";

function SchermataGestioneStruttura() {

    return (
        <div className="d-flex justify-content-center">
            <div className="row mx-auto maxw-xl">
                <div className="col-12 col-md-3">
                    {/* Navbar */}
                    <Sidebar />
                </div>

                <div className="col-12 col-md-9">
                    {/* Contenitore principale */}
                    <InformazioniStruttura />
                </div>
            </div>
        </div>
    )
}

export default SchermataGestioneStruttura;