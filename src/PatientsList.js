import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchPatients,
  addPatient,
  updatePatient,
  deletePatient,
} from "./redux/actions";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Typography,
  Grid,
} from "@mui/material";
import PatientModal from "./PatientModal";
import ConfirmationDialog from "./ConfirmationDialog";

const PatientsList = () => {
  const dispatch = useDispatch();
  const patients = useSelector((state) => state.patients.patients);
  const loading = useSelector((state) => state.patients.loading);
  const error = useSelector((state) => state.patients.error);

  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState(null);

  // State for confirmation dialog
  const [openConfirmDialog, setOpenConfirmDialog] = useState(false);
  const [patientToDelete, setPatientToDelete] = useState(null);

  // Fetch patients on component mount
  useEffect(() => {
    dispatch(fetchPatients());
  }, [dispatch]);

  // Handle form submissions for adding/updating patients
  const handleAddAndUpdatePatient = async (e, newPatient) => {
    e.preventDefault();
    if (newPatient.id) {
      await dispatch(updatePatient(newPatient));
    } else {
      await dispatch(addPatient(newPatient));
    }
    setShowUpdateModal(false);
    dispatch(fetchPatients());
  };

  // Handle opening/closing add and update modals
  const handleOpenAddModal = () => {
    setShowUpdateModal(true);
    setSelectedPatient(null); // Clear selected patient for adding
  };

  const handleCloseAddModal = () => {
    setShowUpdateModal(false);
  };

  const handleOpenUpdateModal = (patient) => {
    setSelectedPatient(patient);
    setShowUpdateModal(true);
  };

  const handleCloseUpdateModal = () => {
    setShowUpdateModal(false);
  };

  // Handle opening/closing confirmation dialog for deletion
  const handleOpenConfirmDialog = (patient) => {
    setPatientToDelete(patient);
    setOpenConfirmDialog(true);
  };

  const handleCloseConfirmDialog = () => {
    setOpenConfirmDialog(false);
    setPatientToDelete(null);
  };

  // Handle user confirmation for deletion
  const handleDeletePatient = () => {
    dispatch(deletePatient(patientToDelete.id));
    setOpenConfirmDialog(false);
    setPatientToDelete(null);
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Typography variant="h4" gutterBottom>
          Patients List
        </Typography>
        <Button variant="contained" onClick={handleOpenAddModal}>
          Add Patient
        </Button>
      </Grid>

      <Grid item xs={12}>
        <Paper elevation={3}>
          <TableContainer component={Paper}>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>DoB</TableCell>
                  <TableCell align="right">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {patients.map((patient) => (
                  <TableRow key={patient.id}>
                    <TableCell>{patient.id}</TableCell>
                    <TableCell>
                      {patient.first_name} {patient.last_name}
                    </TableCell>
                    <TableCell>{patient.email}</TableCell>
                    <TableCell>{patient.date_of_birth}</TableCell>
                    <TableCell align="right">
                      <Button
                        variant="contained"
                        size="small"
                        onClick={() => handleOpenUpdateModal(patient)}
                      >
                        Edit
                      </Button>
                      <Button
                        variant="contained"
                        size="small"
                        color="error"
                        onClick={() => handleOpenConfirmDialog(patient)}
                      >
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
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
