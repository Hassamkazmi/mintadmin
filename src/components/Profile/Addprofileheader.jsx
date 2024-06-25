import React, { useState } from "react";
import { Fragment } from "react";
import { Link } from "react-router-dom";
import Modal from "react-bootstrap/Modal";
import { Button } from "react-bootstrap";
import AddTags from "../AddCustomers/AddTags";
import AddProspects from "../AddProspects/AddProspects";

export default function Addprofileheader() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


  const [showProspects, setShowProspects] = useState(false);
  const handleCloseProspects = () => setShowProspects(false);
  const handleShowProspects = () => setShowProspects(true);


  return (
    <Fragment>
      <div className="row customers">
        <div className="col-sm-5 ">
          <h2>Customers Info</h2>
        </div>
        <div className="col-sm-7 right">
        <button onClick={handleShow} className="bluebtn">
              Add Tags
            </button>
          <button onClick={handleShowProspects} className="bluebtn">Prospects</button>

        </div>
      </div>

      <Modal show={show} onHide={handleClose} animation={false}>
        <Modal.Body>
          Add Tags
          <Button variant="secondary" onClick={handleClose}>
            {" "}
            X{" "}
          </Button>
        </Modal.Body>
        <AddTags data={handleClose} />
      </Modal>

      <Modal show={showProspects} onHide={handleCloseProspects} animation={false}>
        <Modal.Body>
          Prospects
          <Button variant="secondary" onClick={handleCloseProspects}>
            {" "}
            X{" "}
          </Button>
        </Modal.Body>
        <AddProspects data={handleCloseProspects} />
      </Modal>

    </Fragment>
  );
}
