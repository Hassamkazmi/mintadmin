import React from "react";
import { Fragment } from "react";

export default function Customerfilter() {
  const handleSearch = (e) => {
    e.preventDefault();
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
