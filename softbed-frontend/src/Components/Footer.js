import React from "react";
function Footer(){
    return(
        <footer className="bg-footer font-small py-4 mt-3">
            <div className="container text-center">
                <span>
                    &copy; {new Date().getFullYear()}&nbsp;<strong>SoftEngineers</strong>
                </span>
            </div>
        </footer>
)}
    export default Footer