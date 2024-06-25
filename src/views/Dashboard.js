import React, { useEffect, useState } from "react";

import {  Container, Row, Col} from "react-bootstrap";
import Boxes from "../components/Index/Boxes";
import Graph from "../components/Index/Graph";
import Workorder from "../components/Index/Workorder";
import Routedashboard from "../components/Index/Routedashboard";
import Customers from "../components/Index/Customers";

import Sidebar from "../components/Sidebar/Sidebar";
import routes from "../../src/routes";
import AdminNav from "../../src/components/Navbars/AdminNavbar"
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const navigate = useNavigate();
  const [UserApproval, SetUserApproval] = useState(false);
  // const VerifyUser = async () => {
  //   const config = {
  //     headers: {
  //       Authorization: Cookies.get("userToken"),
  //     },
  //   };
  //   try {
  //     const { data } = await axios.get(
  //       `${process.env.REACT_APP_API_URL}/auth/me`,
  //       config
  //     );
  //     SetUserApproval(true);
  //   } catch (err) {
  //     SetUserApproval(false);
  //     navigate("/");
  //     Cookies.remove("userToken")
  //   }
  // };
  // useEffect(() => {
  //   VerifyUser();
  // },[]);


  return (
    <>
    <Sidebar routes={routes}/>
            <div className="main-panel" >
        <AdminNav />
     <div className="content dasssssshhhBoarrddd">


      <Container fluid>
        <Boxes/>
        <Row className="sameheight">
          <Col md="8">
            <Graph/>
          </Col>
          <Col md="4">
            <Workorder/>
          </Col>
        </Row>


        <Row className="sameheight">
          <Col md="8">
            <Routedashboard/>
          </Col>
          <Col md="4">
            <Customers/>
          </Col>
        </Row>
      </Container>

      </div>
      </div>
    </>
  );
}

export default Dashboard;
