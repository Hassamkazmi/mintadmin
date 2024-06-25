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
       
      </div>
    </div>
  );
};

export default PackageList;
