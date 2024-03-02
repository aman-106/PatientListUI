import React from 'react';
import { Paper, Table, TableContainer, TableHead, TableRow, TableCell, TableBody } from '@mui/material';
import PatientTableRow from './PatientTableRow';

const PatientsTable = ({ children }) => {
  return (
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
            {children}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

export default PatientsTable;
