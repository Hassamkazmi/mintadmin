import React, { Fragment } from "react";
import { Container } from "react-bootstrap";
import PoolnestRevenuesearch from "../components/PoolnestRevenue/PoolnestRevenuesearch";
import PoolnestRevenuetable from "../components/PoolnestRevenue/PoolnestRevenuetable";
import PoolnestRevenuefilter from "../components/PoolnestRevenue/PoolnestRevenuefilter";

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
            <PoolnestRevenuesearch />
            <PoolnestRevenuefilter />
            <PoolnestRevenuetable />
          </Container>
        </div>
      </div>
    </Fragment>
  );
}
