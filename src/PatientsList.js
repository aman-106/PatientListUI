import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Grid } from "@mui/material";
import { fetchPatients } from "./redux/actions";
import { useModals } from "./hooks";
import ConfirmationDialog from "./ConfirmationDialog";
import PatientModal from "./PatientModal";
import PatientsTable from "./PatientsTable";
import PatientTableRow from "./PatientTableRow";
import { SucessBanner,Loader, ErrorState, Title } from "./CoomonComponents";

const PatientsList = () => {
  const dispatch = useDispatch();
  const patients = useSelector((state) => state.patients.patients);
  const loading = useSelector((state) => state.patients.loading);
  const error = useSelector((state) => state.patients.error);

  const {
    openConfirmDialog,
    setOpenConfirmDialog,
    patientToDelete,
    handleOpenConfirmDialog,
    handleCloseConfirmDialog,
    showUpdateModal,
    selectedPatient,
    handleOpenAddModal,
    handleCloseAddModal,
    handleOpenUpdateModal,
    handleAddAndUpdatePatient,
    handleDeletePatient,
    setUpdateSuccess,
    updateSuccess
  } = useModals();

  useEffect(() => {
    dispatch(fetchPatients());
  }, [dispatch]);

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Loader loading={loading} />
        <ErrorState error={error} />
        <SucessBanner updateSuccess={updateSuccess} setUpdateSuccess={setUpdateSuccess}/>
        <Title />
        <Button variant="contained" onClick={handleOpenAddModal}>
          Add Patient
        </Button>
      </Grid>

      <Grid item xs={12}>
        <PatientsTable>
          {patients.map((patient) => (
            <PatientTableRow
              key={patient.id}
              patient={patient}
              handleOpenUpdateModal={handleOpenUpdateModal}
              handleOpenConfirmDialog={handleOpenConfirmDialog}
            />
          ))}
        </PatientsTable>

        <ConfirmationDialog
          open={openConfirmDialog}
          onClose={handleCloseConfirmDialog}
          patient={patientToDelete}
          onConfirm={handleDeletePatient}
        />
        <PatientModal
          patient={selectedPatient}
          open={showUpdateModal}
          onClose={handleCloseAddModal}
          onSave={handleAddAndUpdatePatient}
        />
      </Grid>
    </Grid>
  );
};

export default PatientsList;
