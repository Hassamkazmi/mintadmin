import React, { Fragment } from "react";
import { Container } from "react-bootstrap";
import SimplePagesearch from "../components/SimplePage/SimplePagesearch";
import SimplePagetable from "../components/SimplePage/SimplePagetable";
import SimplePagefilter from "../components/SimplePage/SimplePagefilter";

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
            <SimplePagesearch />
            <SimplePagefilter />
            <SimplePagetable />
          </Container>
        </div>
      </div>
    </Fragment>
  );
}
