import React, { Fragment } from 'react'
import { Card} from "react-bootstrap";
// import ChartistGraph from "react-chartist";
import { Nav, Dropdown } from "react-bootstrap";
import { Line , Bar} from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";

const data = {
  labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
  datasets: [
    {
      label: "First dataset",
      data: [33, 53, 85, 41, 44, 65],
      fill: true,
      backgroundColor: "#1a4a5b",
      borderColor: "rgba(75,192,192,1)"
    },
    {
      label: "Second dataset",
      data: [33, 25, 35, 51, 54, 76],
      fill: false,
      borderColor: "#742774"
    }
  ]
};

export default function Graph() {

 

  return (
    <Fragment>
        <Card>
              <Card.Header className='graph'>
                <Card.Title as="h4">Revenue <span className="revenue">$45,000</span></Card.Title>
              </Card.Header>
              <Card.Footer className='graphfilter'>
                <div className="legend">
                  <span><i className="fas fa-circle text-info"></i> Finished</span> 
                  <span><i className="fas fa-circle text-danger"></i> On Going</span>
                  <span><i className="fas fa-circle text-warning"></i> On Hold</span>
                </div>
                <div className='filters'>
                         <Dropdown as={Nav.Item} className="notidrop " >
                            <Dropdown.Toggle   data-toggle="dropdown"  id="dropdown-67443507"  variant="default"  className="m-0" >
                              <span>Month <i className="fa fa-chevron-down" aria-hidden="true"></i></span>
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                              <Dropdown.Item  href="#pablo"  onClick={(e) => e.preventDefault()} > Edit </Dropdown.Item>
                              <Dropdown.Item  href="#pablo"  onClick={(e) => e.preventDefault()} > Update</Dropdown.Item>
                              <Dropdown.Item  href="#pablo"  onClick={(e) => e.preventDefault()} > Delete </Dropdown.Item>
                            </Dropdown.Menu>
                          </Dropdown>
                </div>
              </Card.Footer>
              <Card.Body>
                <div className="ct-chart" id="chartHours">
                  <Line data={data} />
                  <Bar data={data} />
                </div>
              </Card.Body>

            </Card>
    </Fragment>
  )
}
