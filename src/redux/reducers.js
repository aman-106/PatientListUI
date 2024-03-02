import { createReducer, createAsyncThunk } from '@reduxjs/toolkit';
import {fetchPatients,addPatient,deletePatient,updatePatient} from './actions'
const initialState = {
  patients: [],
  loading: false,
  error: null,
};

export const patientsReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(fetchPatients.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(fetchPatients.fulfilled, (state, action) => {
      state.loading = false;
      state.patients = action.payload;
    })
    .addCase(fetchPatients.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    })
    .addCase(addPatient.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(addPatient.fulfilled, (state, action) => {
      state.loading = false;
      state.patients.push(action.payload);
    })
    .addCase(addPatient.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    })
    .addCase(updatePatient.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(updatePatient.fulfilled, (state, action) => {
      const updatedPatientIndex = state.patients.findIndex((patient) => patient.id === action.payload.id);
      state.loading = false;
      if (updatedPatientIndex !== -1) {
        state.patients[updatedPatientIndex] = action.payload; // Update the patient in the state
      } else {
        console.warn('Patient not found for update:', action.payload.id); // Handle potential errors
      }
    })
    .addCase(updatePatient.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    })
    .addCase(deletePatient.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(deletePatient.fulfilled, (state, action) => {
      state.loading = false;
      state.patients = state.patients.filter((patient) => patient.id !== action.payload); // Remove deleted patient
    })
    .addCase(deletePatient.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
});

