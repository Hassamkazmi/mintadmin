// src/components/PackageList.js
import React from 'react';
import Pagination from "../Pagination/Pagination";
import { Nav, Dropdown, Button } from "react-bootstrap";
import Noti from "../../assets/img/more.png";
import { useDeleteSubscriptionMutation, useGetSubscriptionQuery, useUpdateSubscriptionMutation } from '../../redux/slice/subscriptionApi';
import DeleteModal from '../Modals/DeleteModal';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function PackageList() {
  const { data: subscriber, error, isLoading } = useGetSubscriptionQuery();
  const [deleteSubscription] = useDeleteSubscriptionMutation();
  const [updateSubscription] = useUpdateSubscriptionMutation();
  const [id, setId] = useState();
  const navigate = useNavigate()

  const [modalOpen, setModalOpen] = useState(false);

  const handleModal = (id) => {
    setModalOpen(true);
    setId(id);
  };


  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const handleDelete = async (id) => {
    try {
      await deleteSubscription(id);
    } catch (error) {
      console.error('Error deleting package:', error.message);
    }
  };

  const NavigationToProfileUpdate = async (subscriberId) => {
    navigate(`/edit-subscriber`,{
      state:subscriberId
    })
  };


  return (
    <div className="routedashboard mainpage customertable">
        <div className="ct-chart" id="chartActivity">
          <table>
            <thead>
              <tr>
                <th>Subscriber Name</th>
                <th>Email Name</th>
                <th>Package Name</th>
                <th>Status</th>
                {/* <th>Mobile Number</th>
                <th>Email</th> */}
                <th> </th>
              </tr>
            </thead>

            <tbody>
              {subscriber.result?.items && subscriber.result?.items.length > 0 ? (
                subscriber.result?.items &&
                subscriber.result?.items.map((data , i) => {
                  return (
                    <tr key={data._id}>
                   
                      <td>{data.SubscriptionSuperAdmin?.Name}</td>
                      <td>{data.SubscriptionSuperAdmin?.Email}</td>
                      <td>{data?.PackageDetail?.Name}</td>
                      <td>{data.Status == true ? "active" : "inactive"}</td>
                      <td>
                        <Dropdown as={Nav.Item} className="notidrop">
                          <Dropdown.Toggle
                            data-toggle="dropdown"
                            id="dropdown-67443507"
                            variant="default"
                            className="m-0"
                          >
                            <img src={Noti} alt="boximg" />
                          </Dropdown.Toggle>
                          <Dropdown.Menu>
                            <Dropdown.Item
                              onClick={() =>
                                NavigationToProfileUpdate(data)
                              }
                            >
                              Edit
                            </Dropdown.Item>
                            <Dropdown.Item
                              onClick={() => handleModal(data._id)}
                            >
                              {" "}
                              Delete{" "}
                            </Dropdown.Item>
                          </Dropdown.Menu>
                        </Dropdown>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <></>
              )}
            </tbody>
          </table>
          {/* <Pagination
            postsPerPage={postsPerPage}
            totalPosts={totalPost}
            TotalPages={TotalPages}
            paginate={paginate}
            currentPage={currentPage}
          /> */}
          <DeleteModal
            modalOpen={modalOpen}
            setModalOpen={setModalOpen}
            handleDelete={handleDelete}
            id={id}
          />
        </div>
      </div>
  );
}

export default PackageList;
