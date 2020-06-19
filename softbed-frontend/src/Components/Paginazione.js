import React from "react";

function Paginazione(props) {

    return (
        <nav aria-label="Paginazione">
            <ul className="pagination pagionation-circle justify-content-center">
                <li className="page-item">
                    <a className="page-link" href="#" aria-label="Previous">
                        <span aria-hidden="true">&laquo;</span>
                        <span className="sr-only">Previous</span>
                    </a>
                </li>
                <li className="page-item"><a className="page-link" href="#">{props.currentPage - 1}</a></li>
                <li className="page-item"><a className="page-link" href="#">{props.currentPage}</a></li>
                <li className="page-item"><a className="page-link" href="#">{props.currentPage + 1}</a></li>
                <li className="page-item">
                    <a className="page-link" href="#" aria-label="Next">
                        <span aria-hidden="true">&raquo;</span>
                        <span className="sr-only">Next</span>
                    </a>
                </li>
            </ul>
        </nav>
    );
}

export default Paginazione;