import React, { useState, useEffect } from "react";
import { Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Select } from "antd";
import Cookies from "js-cookie";

export default function Customerfilter() {
  const [name, setname] = useState("");
  const [customer_type_id, setcustomer_type] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [status, setstatus] = useState("");


  const dispatch = useDispatch();



  const handleSearch = (e) => {
    e.preventDefault();
    // Set the forceRefetch flag to true to trigger a refetch
  };

  return (
    <Fragment>
      <form onSubmit={handleSearch} className="myfilters1 custFiltwer">
        <input
          onChange={(e) => setname(e.target.value)}
          type="text"
          placeholder="Search for Name"
        />
        <button type="submit">
          {" "}
          <i className="fa fa-search" aria-hidden="true" />
        </button>
      </form>
    </Fragment>
  );
}
