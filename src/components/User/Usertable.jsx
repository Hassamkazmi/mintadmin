// src/components/PackageList.js
import React from 'react';
import Pagination from "../Pagination/Pagination";
import { Nav, Dropdown, Button } from "react-bootstrap";
import Noti from "../../assets/img/more.png";
import { useDeleteUserMutation, useGetUserQuery, useUpdateUserMutation } from '../../redux/slice/userApi';

function PackageList() {
  const { data: getUser, error, isLoading } = useGetUserQuery();
  const [deleteUser] = useDeleteUserMutation();
  const [updateUser] = useUpdateUserMutation();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const handleDeletePackage = async (packageId) => {
    try {
      await deletePackage(packageId);
    } catch (error) {
      console.error('Error deleting package:', error.message);
    }
  };

  const handleUpdatePackage = async (packageId, updatedData) => {
    try {
      await updatePackage({ packageId, updatedPackage: updatedData });
    } catch (error) {
      console.error('Error updating package:', error.message);
    }
  };


  return (
    <div className="routedashboard mainpage customertable">
        <div className="ct-chart" id="chartActivity">
          <table>
            <thead>
              <tr>
                <th>User Name</th>
                <th>Email Name</th>
                <th>Package Name</th>
                <th>Status</th>
                {/* <th>Mobile Number</th>
                <th>Email</th> */}
                <th> </th>
              </tr>
            </thead>

            <tbody>
              {getUser.result?.items && getUser.result?.items.length > 0 ? (
                getUser.result?.items &&
                getUser.result?.items.map((data , i) => {
                  return (
                    <tr key={data._id}>
                   
                      <td>{data.PackageDetail?.Name}</td>
                      <td>{data.SubscriptionSuperAdmin?.Email}</td>
                      <td>{data?.PackageDetail?.Name}</td>
                      <td>{data.Status == "true" ? "active" : "inactive"}</td>
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
                                NavigationToProfileUpdate(data._id)
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
          {/* <DeleteModal
            modalOpen={modalOpen}
            setModalOpen={setModalOpen}
            handleDelete={handleDelete}
            id={id}
          /> */}
        </div>
      </div>
  );
}

export default PackageList;
