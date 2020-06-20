import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";

function Paginazione(props) {

    const [paginaAttuale, setPagina] = useState(props.paginaAttuale);

    useEffect(() => {
        setPagina(props.paginaAttuale);
    }, [props.paginaAttuale])

    function aggiornaPagina(incremento) {
        props.setPagina(paginaAttuale + incremento);
    }

    return (
        <nav aria-label="Paginazione">
            <ul className="pagination pagionation-circle justify-content-center">

                {/* Vai alla pagina precedente */}
                { props.paginaAttuale - 1 > 0 && (
                    <li className="page-item">
                        <Link className="page-link" to="#" aria-label="Previous" onClick={() => aggiornaPagina(-1)}>
                            <span aria-hidden="true">&laquo;</span>
                            <span className="sr-only">Previous</span>
                        </Link>
                    </li>
                )}

                { props.paginaAttuale - 2 > 0 && (
                    <li className="page-item">
                        <Link className="page-link" to="#" onClick={() => aggiornaPagina(-2)}>{paginaAttuale - 2}</Link>
                    </li>
                )}

                { props.paginaAttuale - 1 > 0 && (
                    <li className="page-item">
                        <Link className="page-link" to="#" onClick={() => aggiornaPagina(-1)}>{paginaAttuale - 1}</Link>
                    </li>
                )}

                <li className="page-item active">
                    <span className="page-link">{paginaAttuale}</span>
                </li>

                { props.paginaAttuale + 1 <= props.numPagine && (
                    <li className="page-item">
                        <Link className="page-link" to="#" onClick={() => aggiornaPagina(+1)}>{paginaAttuale + 1}</Link>
                    </li>
                )}
                { props.paginaAttuale + 2 <= props.numPagine && (
                    <li className="page-item">
                        <Link className="page-link" to="#" onClick={() => aggiornaPagina(+2)}>{paginaAttuale + 2}</Link>
                    </li>
                )}

                { props.paginaAttuale + 1 <= props.numPagine && (
                    <li className="page-item">
                        <Link className="page-link" to="#" aria-label="Next">
                            <span aria-hidden="true">&raquo;</span>
                            <span className="sr-only">Next</span>
                        </Link>
                    </li>
                )}

            </ul>
        </nav>
    );
}

export default Paginazione;