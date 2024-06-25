// src/components/PackageList.js
import React, { useState, useCallback } from 'react';
import { useGetPackagesQuery, useDeletePackageMutation } from '../../redux/slice/packageApi';
import Pagination from "../Pagination/Pagination";
import { Nav, Dropdown } from "react-bootstrap";
import Noti from "../../assets/img/more.png";
import DeleteModal from "../Modals/DeleteModal";
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const PackageList = () => {
  const { data: packages, error, isLoading } = useGetPackagesQuery();
  const [deletePackage] = useDeletePackageMutation();
  const [id, setId] = useState();
  const [modalOpen, setModalOpen] = useState(false);
  const navigate = useNavigate();

  // Memoize the delete function
  const handleDelete = useCallback(async () => {
    try {
      await deletePackage(id);
      toast.success("Customer Delete SuccessFully");
    } catch (error) {
      console.error("Error deleting package:", error);
      toast.error("Failed to delete package");
    }
  }, [id, deletePackage]);

  const handleModal = (id) => {
    setModalOpen(true);
    setId(id);
  };

  const NavigationToProfileUpdate = (id) => {
    navigate(`/edit-package`, {
      state: id
    });
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  return (
    <div className="routedashboard mainpage customertable">
      <div className="ct-chart" id="chartActivity">
        <table>
        <thead>
              <tr>
                <th>Package Name</th>
                <th>Title</th>
                <th>Description</th>
                <th>Price</th>
                <th> </th>
              </tr>
            </thead>

          <tbody>
            {packages?.result?.items && packages.result?.items.length > 0 ? (
              packages.result?.items.map((data, i) => (
                <tr key={data._id}>
                  {/* ... Your table row data ... */}
                    <td>{data?.Name}</td>
                      <td>{data?.Title}</td>
                      <td>{data?.Description}</td>
                      <td>{data?.Price}</td>
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
                        <Dropdown.Item onClick={() => NavigationToProfileUpdate(data)}>
                          Edit
                        </Dropdown.Item>
                        <Dropdown.Item onClick={() => handleModal(data._id)}>
                          Delete
                        </Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                  </td>
                </tr>
              ))
            ) : (
              <></>
            )}
          </tbody>
        </table>
        <DeleteModal
                   modalOpen={modalOpen}
                   setModalOpen={setModalOpen}
                   handleDelete={handleDelete}
                   id={id}
        />
      </div>
    </div>
  );
};

export default PackageList;
