import React, { Fragment } from 'react'
import {Card} from "react-bootstrap";
import Noti from "../../assets/img/more.png"
import Noti1 from "../../assets/img/more1.png"
import { Nav, Dropdown } from "react-bootstrap";
import { customers } from '../../Data/Data'
import { Link } from 'react-router-dom';

export default function Customers() {
  return (
    <Fragment>
      <Card className="workorder customer">
        <Card.Header>
          <Card.Title as="h4">Customer</Card.Title>
          <Link to="#" className="yellow">
            View all
          </Link>
        </Card.Header>

        <div className="workorderheight">
          {customers.map((data, i) => {
            return (
              <Card.Body key={i}>
                <div className="row workdetail" key={data.key}>
                  <div className="col-sm-2">
                    <img src={data.image} />
                  </div>
                  <div className="col-sm-10">
                    <h3 className='workdetailNAme'>{data.name}</h3>
                    <p>{data.desc}</p>
                  </div>
                </div>
              </Card.Body>
            );
          })}
        </div>
      </Card>
    </Fragment>
  );
}
