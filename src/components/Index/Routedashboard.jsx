import React, { Fragment } from 'react'
import { Card} from "react-bootstrap";
import { Link } from 'react-router-dom';
import Noti from "../../assets/img/more.png"
import { Nav, Dropdown } from "react-bootstrap";
import { routedashboard } from '../../Data/Data'

export default function Routedashboard() {
  return (
    <Fragment>
        <Card className='routedashboard'>
              <Card.Header>
                <Card.Title as="h4">Route Dashboard 
                <Link to="#" className="yellow">View All</Link>
                </Card.Title>
              </Card.Header>
              <Card.Body>
                <div className="ct-chart" id="chartActivity">
                  <table className='routeDashboardTable'>
                    <thead>
                    <tr>
                      <th>Technician</th>
                      <th>Customer</th>
                      <th>Pool</th>
                      <th>Workorders</th>
                      <th>Skipped</th>
                      <th> </th>
                    </tr>
                    </thead>

                    <tbody>
                    {routedashboard.map((data) => {
                     return (

                    <tr key={data.key}>
                      <td><img src={data.image} alt='image'/><b>{data.techname}</b></td>
                      <td>{data.customer}</td>
                      <td>{data.pool}</td>
                      <td>{data.workorder}</td>
                      <td><b>{data.skip}</b></td>
                      <td>
                          <Dropdown as={Nav.Item} className="notidrop" >
                                <Dropdown.Toggle   data-toggle="dropdown"  id="dropdown-67443507"  variant="default"  className="m-0" >
                                <img src={Noti} alt='boximg'/>
                                </Dropdown.Toggle>
                                <Dropdown.Menu>
                                  <Dropdown.Item  href="#pablo"  onClick={(e) => e.preventDefault()} > Edit </Dropdown.Item>
                                  <Dropdown.Item  href="#pablo"  onClick={(e) => e.preventDefault()} > Update</Dropdown.Item>
                                  <Dropdown.Item  href="#pablo"  onClick={(e) => e.preventDefault()} > Delete </Dropdown.Item>
                                </Dropdown.Menu>
                           </Dropdown>
                      </td>
                    </tr>
                    )
                  })}

                    </tbody>
                  </table>
                </div>
              </Card.Body>
            </Card>
    </Fragment>
  )
}
