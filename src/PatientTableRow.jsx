import React from 'react';
import { TableRow, TableCell, Button } from '@mui/material';

const PatientTableRow = ({ patient, handleOpenUpdateModal, handleOpenConfirmDialog }) => {
  return (
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
  );
};

export default PatientTableRow;
