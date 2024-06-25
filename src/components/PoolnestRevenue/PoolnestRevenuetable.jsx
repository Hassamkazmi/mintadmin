// src/components/PackageList.js
import React, { useState, useCallback, useEffect } from 'react';
import { usePoolnestRevenueQuery , usePoolnestRevenuePostMutation } from '../../redux/slice/PoolnestRevenueApi';
import Pagination from "../Pagination/Pagination";
import { Nav, Dropdown } from "react-bootstrap";
import Noti from "../../assets/img/more.png";
import DeleteModal from "../Modals/DeleteModal";
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const PackageList = () => {
  const { data: PoolnestRevenue, error, isLoading } = usePoolnestRevenueQuery();

  console.log(PoolnestRevenue,"<<<<<<<<<<>>>>>>>>>>>>")



  return (
    <div className="routedashboard mainpage customertable">
      <div className="ct-chart" id="chartActivity">
        <table>
        <thead>
              <tr>
                <th>Name </th>
                <th>Email</th>
                <th>Mobile</th>
                <th>Price</th>
                <th>Company Name</th>
                <th>Details</th>
               
              </tr>
            </thead>

            <tbody>
            {PoolnestRevenue?.data && PoolnestRevenue?.data?.data?.length > 0 ? (
              PoolnestRevenue?.data?.data?.map((data, i) => {
                return(
                  <>
                     {
                      data?.status == "succeeded" ?  <tr key={data._id}>
                      <td>{data?.metadata?.Name}</td>
                      <td>{data?.metadata?.Email}</td>
                      <td>{data?.metadata?.Mobile}</td>

                      <td>{data?.amount_received / 100}</td>
                      <td>{data?.metadata?.Company}</td>
                      <td>
                        <button className='Click_class-detail'>Click</button>
                      </td>
                  
                </tr> : <></>
                     }
                  </>
                )
              })
            ) : (
              <></>
            )}
          </tbody>
        </table>
       
      </div>
    </div>
  );
};

export default PackageList;
