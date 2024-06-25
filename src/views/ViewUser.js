import React, { Fragment } from 'react'
import Addformheader from '../components/AddCustomers/Addformheader'
import AddUser from '../components/AddCustomers/AddUser'

import Sidebar from "../components/Sidebar/Sidebar";
import routes from "../routes";
import AdminNav from "../components/Navbars/AdminNavbar"

export default function Addcustomer() {
  return (
    <Fragment>
      <Sidebar routes={routes}/>
            <div className="main-panel" >
        <AdminNav />
     <div className="content">

      
        <div className='addcustomers'>
        <Addformheader/>
        <AddUser/>
        </div>
        </div>
        </div>
    </Fragment>
  )
}
