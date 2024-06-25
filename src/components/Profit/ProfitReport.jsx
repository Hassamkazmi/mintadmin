import { Fragment } from "react";
import Accordion from "react-bootstrap/Accordion";

export default function ProfitReport(){
    const array=[1,2,3]
    return(
        <Fragment>
            <div className="filteraccordian">
                <div className="main">
                    <div className="row profileReportDescription">
                        <div className="col-sm-8 profitMaker">
                            <p>
                                <b>Morningstar Assisted Living</b>
                            </p>
                        </div>
                        <div className="col-sm-4 totalProfitsssss">
                            <p>
                                <b>Total Profit: $1050</b>
                            </p>
                        </div>
                    </div>
                    {array.map(() => (
                        <div className="row">
                            <div className="col-sm-12">
                                <Accordion defaultActiveKey="0" flush>
                                    <Accordion.Item >
                                        <Accordion.Header>
                                            <div className="row">
                                                {/*  Service Location */}
                                                <div className="col-sm-5 serviceLocation">
                                                    <p>
                                                        <b>Service Location: </b>
                                                        <br />
                                                        6735 W Golden Ln  
                                                    </p>
                                                </div>
                                                {/*  Pool / Water Body */}
                                                <div className="col-sm-4 poolWaterBody">
                                                    <p>
                                                        <b>Pool / Water Body: </b>
                                                        <br />
                                                        Pool 1
                                                    </p>
                                                </div>
                                                {/*  Total Profit Detail */}
                                                <div className="col-sm-3 totalProfitsDetails">
                                                    <p>
                                                        <b>Total Profit: </b>
                                                        <br /> 
                                                        $350.30
                                                    </p>
                                                </div>
                                            </div>
                                        </Accordion.Header>
                                        <Accordion.Body>
                                            <div className="row profitreportTableesssss">
                                                <div className="col-sm-3">
                                                    <p>
                                                        <b>Service Rate </b>
                                                    </p>
                                                </div>
                                                <div className="col-sm-9">
                                                    <p>$410 per month with chemical</p>
                                                </div>
                                                <div className="col-sm-3">
                                                    <p>
                                                        <b>Labor Cost </b>
                                                    </p>
                                                </div>
                                                <div className="col-sm-9">
                                                    <p>$32 per stop</p>
                                                </div>
                                                <div className="col-sm-12 tableee">
                                                    <table>
                                                        <thead>
                                                            <tr>
                                                                <th>Service Date</th>
                                                                <th>Labor Cost</th>
                                                                <th>Rate</th>
                                                                <th>Profit</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            <tr>
                                                                <td>4/6/2023</td>
                                                                <td>$32.00</td>
                                                                <td>$410.00</td>
                                                                <td>$378.00</td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                </div>
                                                {/* <div className="row serviceProfit"> */}
                                                    <div className="col-sm-8 serviceProfit">
                                                        <p><b>Service Profit</b></p>
                                                    </div>
                                                    <div className="col-sm-3 serviceProfit">
                                                        <p>$378.00</p>
                                                    </div>
                                                {/* </div> */}
                                                <div className="col-sm-12 tableee">
                                                    <table>
                                                        <thead>
                                                            <tr>
                                                                <th>Chemicals</th>
                                                                <th>Dosages</th>
                                                                <th>Cost</th>
                                                                <th>Price</th>
                                                                <th>Profit</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            <tr>
                                                                <td>Tabs</td>
                                                                <td>1</td>
                                                                <td>$3.00</td>
                                                                <td>$0.00</td>
                                                                <td>$3.00</td>
                                                            </tr>
                                                            <tr>
                                                                <td>pH</td>
                                                                <td>1/2 gal</td>
                                                                <td>$5.75</td>
                                                                <td>$0.00</td>
                                                                <td>$6.75</td>
                                                            </tr>
                                                        </tbody>
                                                    </table>

                                                </div>
                                                {/* <div className="row serviceProfit"> */}
                                                    <div className="col-sm-8 serviceProfit">
                                                        <p><b>Chemical Profit</b></p>
                                                    </div>
                                                    <div className="col-sm-3 serviceProfit">
                                                        <p>$6.75</  p>
                                                    </div>
                                                </div>

                                                <div className="row serviceProfit totalTotalProfit">
                                                    <div className="col-sm-8 serviceProfit">
                                                        <p><b>Total Profit</b></p>
                                                    </div>
                                                    <div className="col-sm-3 serviceProfit">
                                                        <p>$350.30</p>
                                                    </div>
                                                {/* </div> */}
                                                    
                                            </div>
                                        </Accordion.Body>
                                    </Accordion.Item>
                                </Accordion>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </Fragment>
    )
}