import React, {Fragment} from "react";
import Carousel from "./Carousel";
import FormRicerca from "./FormRicerca";
import StruttureRecenti from "./StruttureRecenti";

function SchermataPrincipale() {
    return (
        <Fragment>
            <Carousel />
            <FormRicerca />
            <StruttureRecenti />
        </Fragment>
    )
}

export default SchermataPrincipale;