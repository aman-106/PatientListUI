import { useState } from "react";
import { useDispatch } from "react-redux";
import {
  addPatient,
  updatePatient,
  deletePatient
} from "./redux/actions";

export const usePatientActions = () => {
  const dispatch = useDispatch();

  const handleAddAndUpdatePatient = async (e, newPatient) => {
    e.preventDefault();
    if (newPatient.id) {
      await dispatch(updatePatient(newPatient));
    } else {
      await dispatch(addPatient(newPatient));
    }
  };

  const handleDeletePatient = (patientId) => {
    dispatch(deletePatient(patientId));
  };

  return { handleAddAndUpdatePatient, handleDeletePatient };
};
export const useModals = () => {
  const [openConfirmDialog, setOpenConfirmDialog] = useState(false);
  const [patientToDelete, setPatientToDelete] = useState(null);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState(null);

  const handleOpenAddModal = () => {
    setShowUpdateModal(true);
    setSelectedPatient(null);
  };

  const handleCloseAddModal = () => {
    setShowUpdateModal(false);
  };

  const handleOpenUpdateModal = (patient) => {
    setSelectedPatient(patient);
    setShowUpdateModal(true);
  };

  const handleOpenConfirmDialog = (patient) => {
    setPatientToDelete(patient);
    setOpenConfirmDialog(true);
  };

  const handleCloseConfirmDialog = () => {
    setOpenConfirmDialog(false);
    setPatientToDelete(null);
  };

  return {
    openConfirmDialog,
    setOpenConfirmDialog,
    patientToDelete,
    handleOpenConfirmDialog,
    handleCloseConfirmDialog,
    showUpdateModal,
    setShowUpdateModal,
    selectedPatient,
    handleOpenAddModal,
    handleCloseAddModal,
    handleOpenUpdateModal,
  };
};
