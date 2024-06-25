import React, { Fragment } from "react";
import { Container } from "react-bootstrap";
import Packagesearch from "../components/Packages/Packagesearch";
import Packagetable from "../components/Packages/Packagetable";
import Packagefilter from "../components/Packages/Packagefilter";

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
            <Packagesearch />
            <Packagefilter />
            <Packagetable />
          </Container>
        </div>
      </div>
    </Fragment>
  );
}
