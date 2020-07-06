import React, {Fragment} from "react";
import PaginaNonTrovata from "./PaginaNonTrovata";
import FormRicerca from "../../Ricerca/FormRicerca";

function SchermataPaginaNonTrovata() {
    return (
        <Fragment>
            <PaginaNonTrovata />
            <FormRicerca />
        </Fragment>
    )
}

export default SchermataPaginaNonTrovata;