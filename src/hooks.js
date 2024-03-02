import { useState, useMemo, useCallback } from "react";
import { useDispatch } from "react-redux";
import {
  addPatient,
  updatePatient,
  deletePatient,
  fetchPatients,
} from "./redux/actions";

export const useModals = () => {
  const dispatch = useDispatch();
  const [openConfirmDialog, setOpenConfirmDialog] = useState(false);
  const [patientToDelete, setPatientToDelete] = useState(null);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [updateSuccess, setUpdateSuccess] = useState(false);

  const handleOpenAddModal = useCallback(() => {
    setShowUpdateModal(true);
    setSelectedPatient(null);
  }, []);

  const handleCloseAddModal = useCallback(() => {
    setShowUpdateModal(false);
  }, []);

  const handleOpenUpdateModal = useCallback((patient) => {
    setSelectedPatient(patient);
    setShowUpdateModal(true);
  }, []);

  const handleOpenConfirmDialog = useCallback((patient) => {
    setPatientToDelete(patient);
    setOpenConfirmDialog(true);
  }, []);

  const handleCloseConfirmDialog = useCallback(() => {
    setOpenConfirmDialog(false);
    setPatientToDelete(null);
  }, []);

  const handleAddAndUpdatePatient = useCallback(
    async (newPatient) => {
      try {
        if (newPatient.id) {
          await dispatch(updatePatient(newPatient));
        } else {
          await dispatch(addPatient(newPatient));
        }
        setUpdateSuccess(true);
        setShowUpdateModal(false);
        dispatch(fetchPatients());
      } catch (error) {
        console.error("Error adding/updating patient:", error);
      }
    },
    [dispatch]
  );

  const handleDeletePatient = useCallback(async () => {
    try {
      await dispatch(deletePatient(patientToDelete.id));
      setOpenConfirmDialog(false);
      setUpdateSuccess(true);
    } catch (error) {
      console.error("Error deleting patient:", error);
    }
  }, [dispatch, patientToDelete]);

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
    handleAddAndUpdatePatient,
    handleDeletePatient,
    setUpdateSuccess,
    updateSuccess,
  };
};
