import React, { Component } from "react";
import { useLocation, NavLink } from "react-router-dom";
import "../../maincss/responsive.css";
import { Accordion, Nav } from "react-bootstrap";
import Logo from "../../assets/img/logo.png";
import Avatar from "../../assets/img/avatar.png";

function Sidebar({ routes }) {
  const location = useLocation();
  const activeRoute = (routeName) => {
    return location.pathname.indexOf(routeName) > -1 ? "active" : "";
  };

  // const storeTheme  = localStorage.getItem("primary")
  //   document.documentElement.style.setProperty(
  //     "--primary-color",
  //     storeTheme || "#1a4a5b"
  //   );

  // document.documentElement.style.setProperty(
  //   "--font-color",
  //   "#fff"
  // );

  
  return (
    <div className="sidebar">
      <div className="sidebar-background" />
      <div className="sidebar-wrapper sideBarComp">
        <div className="logo d-flex align-items-center justify-content-start">
          <div className="logo-img">
            <img src={Logo} alt="..." className="logo" />
          </div>
        </div>
        <Nav>
          {routes.map((prop, key) => {
            if (prop.name === "Revenue") {
              return (
                <li
                  className={
                    prop.upgrade
                      ? "active active-pro"
                      : activeRoute(prop.layout + prop.path)
                  }
                  key={key}
                >
                  <Accordion>
                    <Accordion.Item eventKey="0">
                      <Accordion.Header>
                        <NavLink className="nav-link nav-link1">
                          <p className="setings">
                            {prop.name}
                            <i
                              className="fa fa-chevron-down"
                              aria-hidden="true"
                            ></i>
                          </p>
                        </NavLink>
                      </Accordion.Header>
                      <Accordion.Body>
                        <NavLink to={"/PoolNestRevenue"} className="nav-link">
                          <i className={prop.icon} />
                          <p>PoolNest Revenue</p>
                        </NavLink>
                        <li
                          className={
                            prop.upgrade
                              ? "active active-pro"
                              : activeRoute(prop.layout + prop.path)
                          }
                          key={key}
                        >
                          <NavLink to={"/FinancialMetrics"} className="nav-link">
                            <i className={prop.icon} />
                            <p>Financial Metrics</p>
                          </NavLink>
                        </li>
                        <li
                          className={
                            prop.upgrade
                              ? "active active-pro"
                              : activeRoute(prop.layout + prop.path)
                          }
                          key={key}
                        >
                          <NavLink to={"/UserRevenue"} className="nav-link">
                            <i className={prop.icon} />
                            <p>User Revenue</p>
                          </NavLink>
                        </li>
                       
                      </Accordion.Body>
                    </Accordion.Item>
                  </Accordion>
                </li>
              );
            }

           

            if (!prop.redirect) {
              return (
                <li
                  className={
                    prop.upgrade
                      ? "active active-pro"
                      : activeRoute(prop.layout + prop.path)
                  }
                  key={key}
                >
                  <NavLink to={prop.path} className="nav-link">
                    <i className={prop.icon} />
                    <p>{prop.name}</p>
                  </NavLink>
                </li>
              );
            }

            return null;
          })}
        </Nav>
      </div>
    </div>
  );
}

export default Sidebar;
