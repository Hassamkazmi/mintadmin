import React from "react";
import { Fragment } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
export default function Customersearch() {

  return (
    <Fragment>
      <div className="row customers owner">
        <div className="col-sm-5 equipmentssss">
          <h2>
            Subscription{" "}
            {/* <span className="counts">{postDataResult?.data.totalCount}</span> */}
          </h2>
        </div>
        <div className="col-sm-7 right equipmentssss">
          <Link to="/add-subscriber">
            <button className="bluebtn addSubscribrrr">Add Subscriber</button>
          </Link>
        </div>
      </div>
    </Fragment>
  );
}
