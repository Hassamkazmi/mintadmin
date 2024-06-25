import React, { Fragment } from "react";
import { Container } from "react-bootstrap";
import EditPackage from "../components/Packages/EditPackage";

import Sidebar from "../components/Sidebar/Sidebar";
import routes from "../routes";
import AdminNav from "../components/Navbars/AdminNavbar";

export default function Customers() {
  return (
    <Fragment>
      <Sidebar routes={routes} />
      <div className="main-panel">
        <AdminNav />
        <div className="content">
          <Container fluid>
          <div className="row customers">
        <div className="col-sm-5 equipmentssss">
          <h2>
            Packages{" "}
            <span className="counts"></span>
          </h2>
        </div>
        <div className="col-sm-7 right equipmentssss">
         
          
        </div>
      </div>
            <EditPackage />
          </Container>
        </div>
      </div>
    </Fragment>
  );
}
