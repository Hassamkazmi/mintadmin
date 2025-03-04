import React, { Component, useState } from "react";
import { useLocation } from "react-router-dom";
import { Navbar, Container, Nav, Dropdown, Button } from "react-bootstrap";
import routes from "../../routes";
import { useEffect } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import Message from "../../assets/img/message.png"
import Avatar from "../../assets/img/avatar.png"


function Header() {
  const navigate = useNavigate();
  const LogOut = () => {
    navigate("/");
    Cookies.remove("token");
  };
  const location = useLocation();
  const mobileSidebarToggle = (e) => {
    e.preventDefault();
    document.documentElement.classList.toggle("nav-open");
    var node = document.createElement("div");
    node.id = "bodyClick";
    node.onclick = function () {
      this.parentElement.removeChild(this);
      document.documentElement.classList.toggle("nav-open");
    };
    document.body.appendChild(node);
  };

  var getBrandText = () => {
    if (location.pathname === "/") return "DASHBOARD";
    return location.pathname.slice(1).toLocaleUpperCase();

    return "Brand";
  };

  return (
    <Navbar bg="light" expand="lg">
      <Container fluid>
        <div className="d-flex justify-content-center align-items-center ml-2 ml-lg-0">
          <Button
            variant="dark"
            className="d-lg-none btn-fill d-flex justify-content-center align-items-center rounded-circle p-2"
            onClick={mobileSidebarToggle}
          >
            <i className="fas fa-ellipsis-v"></i>
          </Button>
          <Navbar.Brand
            href="#home"
            onClick={(e) => e.preventDefault()}
            className="mr-2"
          >
            {getBrandText()}
          </Navbar.Brand>
        </div>

        <Navbar.Toggle aria-controls="basic-navbar-nav" className="mr-2">
          <span className="navbar-toggler-bar burger-lines"></span>
          <span className="navbar-toggler-bar burger-lines"></span>
          <span className="navbar-toggler-bar burger-lines"></span>
        </Navbar.Toggle>

        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="nav mr-auto name" navbar>
            <Nav.Item>
              <Nav.Link
                data-toggle="dropdown"
                href="#pablo"
                onClick={(e) => e.preventDefault()}
                className="m-0"
              >
                <span className="d-lg-none ml-1"> Dashboard</span>
              </Nav.Link>
            </Nav.Item>

            {/* Search */}
            <Nav.Item className="searchform">
              <form>
                <input type="text" placeholder="Search for your keywords" />
                <button>
                  {" "}
                  <i className="fa fa-search" aria-hidden="true"></i>
                </button>
              </form>
            </Nav.Item>
          </Nav>

          {/* second nav */}
          <Nav className="ml-auto hassan" navbar>
            {/* notifications */}
            <Dropdown as={Nav.Item} className="notidrop notNotidrop">
              <Dropdown.Toggle
                data-toggle="dropdown"
                id="dropdown-67443507"
                variant="default"
                className="m-0"
              >
                <img src={Message} />
                <span className="notification">5</span>
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item
                  href="#pablo"
                  onClick={(e) => e.preventDefault()}
                >
                  {" "}
                  Notification 1{" "}
                </Dropdown.Item>
                <Dropdown.Item
                  href="#pablo"
                  onClick={(e) => e.preventDefault()}
                >
                  {" "}
                  Notification 2{" "}
                </Dropdown.Item>
                <Dropdown.Item
                  href="#pablo"
                  onClick={(e) => e.preventDefault()}
                >
                  {" "}
                  Notification 3{" "}
                </Dropdown.Item>
                <Dropdown.Item
                  href="#pablo"
                  onClick={(e) => e.preventDefault()}
                >
                  {" "}
                  Notification 4{" "}
                </Dropdown.Item>
                <Dropdown.Item
                  href="#pablo"
                  onClick={(e) => e.preventDefault()}
                >
                  {" "}
                  Notification 5{" "}
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>

            <Dropdown as={Nav.Item} className="avatardrop">
              <Dropdown.Toggle
                aria-expanded={false}
                aria-haspopup={true}
                data-toggle="dropdown"
                id="navbarDropdownMenuLink"
                variant="default"
                className="m-0"
              >
                <span className="no-icon">
                  <img src={Avatar} />
                  Alisher Alwani
                </span>
              </Dropdown.Toggle>
              <Dropdown.Menu aria-labelledby="navbarDropdownMenuLink">
                <Dropdown.Item
                  href="#pablo"
                  onClick={(e) => e.preventDefault()}
                >
                  {" "}
                  Password Reset{" "}
                </Dropdown.Item>
                <Dropdown.Item
                  href="#pablo"
                  onClick={(e) => e.preventDefault()}
                >
                  {" "}
                  Profile Setting{" "}
                </Dropdown.Item>
                <Dropdown.Item onClick={(e) => LogOut(e)}>
                  {" "}
                  Logout{" "}
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
