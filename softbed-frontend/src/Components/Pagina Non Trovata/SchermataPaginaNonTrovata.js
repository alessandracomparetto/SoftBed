import React, {Fragment} from "react";
import PaginaNonTrovata from "./PaginaNonTrovata";
import FormRicerca from "../FormRicerca";

function SchermataPaginaNonTrovata() {
    return (
        <Fragment>
            <PaginaNonTrovata />
            <FormRicerca />
        </Fragment>
    )
}

export default SchermataPaginaNonTrovata;