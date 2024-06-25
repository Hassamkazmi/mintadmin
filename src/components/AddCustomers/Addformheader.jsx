import React from 'react'
import { Fragment } from 'react'
import { useNavigate } from 'react-router-dom'
import Modal from "react-bootstrap/Modal";
import { useState } from 'react';
import { Button } from 'react-bootstrap';

export default function Addformheader() {
  const navigate = useNavigate();

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


  const handleNavigate = () => {
    navigate('/addcustomer')
  }
  return (
    <Fragment>
             <div className='row customers'>
        <div className='col-sm-5 '>
            <h2>Subscriber</h2>
        </div>
        <div className='col-sm-7 right addCustomersButtonnnn'>
        </div>
        </div>

       


    </Fragment>
  )
}
