import React from "react";
import { Fragment } from "react";
import { Link } from "react-router-dom";
export default function Customersearch() {

  return (
    <Fragment>
      <div className="row customers owner">
        <div className="col-sm-5 equipmentssss">
          <h2>
            Packages{" "}
            <span className="counts"></span>
          </h2>
        </div>
        <div className="col-sm-7 right equipmentssss">
          <Link to="/add-package">
            <button className="bluebtn addSubscribrrr">Add Packages</button>
          </Link>
        </div>
      </div>
    </Fragment>
  );
}
