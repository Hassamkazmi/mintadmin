import React, { Fragment } from "react";
import { Container } from "react-bootstrap";
import Usersearch from "../components/User/Usersearch";
import Usertable from "../components/User/Usertable";
import Userfilter from "../components/User/Userfilter";

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
            <Usersearch />
            <Userfilter />
            <Usertable />
          </Container>
        </div>
      </div>
    </Fragment>
  );
}
