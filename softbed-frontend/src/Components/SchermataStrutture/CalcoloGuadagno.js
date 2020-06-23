
import React, {useState} from "react";

function CalcoloGuadagno(props){
    return(
        <div className="d-block mt-2 border-top border-warning">
           <div className="form-group row my-auto mt-2">
              <label htmlFor="example-date-input" className="col-4 col-md-2 col-form-label">Date</label>
              <div className="col-8 col-md-4">
                <input className="form-control" type="date" value="2011-08-19" id="example-date-input"/>
              </div>
               <label htmlFor="example-date-input" className="col-4 col-md-2 col-form-label">Date</label>
               <div className="col-8 col-md-4">
                   <input className="form-control" type="date" value="2011-08-19" id="example-date-input"/>
               </div>
            </div>
        </div>
    )
}


export default CalcoloGuadagno;
