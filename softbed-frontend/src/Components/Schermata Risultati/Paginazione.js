import React, {useEffect, useState} from "react";

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
                        <a className="page-link" href="#" aria-label="Previous" onClick={() => aggiornaPagina(-1)}>
                            <span aria-hidden="true">&laquo;</span>
                            <span className="sr-only">Previous</span>
                        </a>
                    </li>
                )}

                { props.paginaAttuale - 2 > 0 && (
                    <li className="page-item">
                        <a className="page-link" href="#" onClick={() => aggiornaPagina(-2)}>{paginaAttuale - 2}</a>
                    </li>
                )}

                { props.paginaAttuale - 1 > 0 && (
                    <li className="page-item">
                        <a className="page-link" href="#" onClick={() => aggiornaPagina(-1)}>{paginaAttuale - 1}</a>
                    </li>
                )}

                <li className="page-item active">
                    <span className="page-link">{paginaAttuale}</span>
                </li>

                { props.paginaAttuale + 1 <= props.numPagine && (
                    <li className="page-item">
                        <a className="page-link" href="#" onClick={() => aggiornaPagina(+1)}>{paginaAttuale + 1}</a>
                    </li>
                )}
                { props.paginaAttuale + 2 <= props.numPagine && (
                    <li className="page-item">
                        <a className="page-link" href="#" onClick={() => aggiornaPagina(+2)}>{paginaAttuale + 2}</a>
                    </li>
                )}

                { props.paginaAttuale + 1 <= props.numPagine && (
                    <li className="page-item">
                        <a className="page-link" href="#" aria-label="Next">
                            <span aria-hidden="true">&raquo;</span>
                            <span className="sr-only">Next</span>
                        </a>
                    </li>
                )}

            </ul>
        </nav>
    );
}

export default Paginazione;