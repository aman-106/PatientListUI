import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchPatients,
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
  CircularProgress,
  Snackbar,
  Alert
} from "@mui/material";
import PatientModal from "./PatientModal";
import ConfirmationDialog from "./ConfirmationDialog";
import { usePatientActions, useModals } from "./usePatientActions";

const PatientsList = () => {
  const dispatch = useDispatch();
  const patients = useSelector((state) => state.patients.patients);
  const loading = useSelector((state) => state.patients.loading);
  const error = useSelector((state) => state.patients.error);
  const { handleAddAndUpdatePatient, handleDeletePatient } =
    usePatientActions();
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
  } = useModals();

  // ... handle data fetching, error, and loading states
  // Fetch patients on component mount
  useEffect(() => {
    dispatch(fetchPatients());
  }, [dispatch]);

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        {/* Display loading indicator if loading is true */}
        {loading && <CircularProgress size={48} />}

        {/* Display error banner if error is present */}
        {error && (
          <Snackbar open={true} autoHideDuration={4000} onClose={() => null}>
            <Alert severity="error">{error.message}</Alert> // Adjust error
            message formatting as needed
          </Snackbar>
        )}
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
