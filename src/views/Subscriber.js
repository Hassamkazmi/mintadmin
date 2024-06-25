import React, { Fragment } from "react";
import { Container } from "react-bootstrap";
import Subscribersearch from "../components/Subscriber/Subscribersearch";
import Subscribertable from "../components/Subscriber//Subscribertable";
import Subscriberfilter from "../components/Subscriber/Subscriberfilter";

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
            <Subscribersearch />
            <Subscriberfilter />
            <Subscribertable />
          </Container>
        </div>
      </div>
    </Fragment>
  );
}
