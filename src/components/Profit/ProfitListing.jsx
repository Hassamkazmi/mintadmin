import React,{ Fragment } from "react";
import Accordion from "react-bootstrap/Accordion";
import { CaretRightOutlined } from "@ant-design/icons";
// import { UnorderedListOutlined } from "@ant-design/icons";
// import { Button, Dropdown, Menu, Space } from "antd";

export default function ProfitListing(){
    const array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    return(
        <Fragment>
            <div className="filteraccordian">
                <div className="main" >
                    {array.map((key) => (
                        <div className="row">
                            <div className="col-sm-11">
                                <Accordion defaultActiveKey="0" flush>
                                    <Accordion.Item >
                                        <Accordion.Header>
                                            <div className="row">
                                                <div className="col-sm-6 profitMaker">
                                                    <p>Morningstar Assisted Living</p>
                                                </div>
                                                <div className="col-sm-6 totalProfits">
                                                    <p>Total Profit: $1050</p>
                                                </div>
                                            </div>
                                        </Accordion.Header>
                                        <Accordion.Body>
                                            <div className="row">
                                                <div className="col-sm-12 profitListingTable">
                                                    <table>
                                                        <thead>
                                                            <tr>
                                                                <th></th>
                                                                <th>Service Location</th>
                                                                <th>Pool / Water Body</th>
                                                                <th>Profit</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            <tr>
                                                                <td>1</td>
                                                                <td>6735 W Golden Ln</td>
                                                                <td>Pool 1</td>
                                                                <td>$350.30</td>
                                                            </tr>
                                                            <tr>
                                                                <td>2</td>
                                                                <td>6735 W Golden Ln</td>
                                                                <td>Pool 2</td>
                                                                <td>$360.30</td>
                                                            </tr>
                                                            <tr>
                                                                <td>3</td>
                                                                <td>6735 W Golden Ln</td>
                                                                <td>Pool 1</td>
                                                                <td>$340.40</td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </div>
                                        </Accordion.Body>
                                    </Accordion.Item>
                                </Accordion>
                            </div>
                        

                            <div className="col-sm-1">
                                < CaretRightOutlined />
                            </div>

                        </div>
                    ))}
                </div>
            </div>
        </Fragment>
    )
}