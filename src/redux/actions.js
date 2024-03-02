import axios from 'axios';
import {urls} from '../config/endpoints';
import { createAsyncThunk } from '@reduxjs/toolkit';


const {PATIENTS_URL} = urls;
// Action types

export const fetchPatients = createAsyncThunk(
  'patients/fetch',
  async () => {
    const response = await axios.get(`${PATIENTS_URL}/`); 
    return response.data;
  }
);

export const addPatient = createAsyncThunk(
  'patients/add',
  async (patient) => {
    const response = await axios.post(`${PATIENTS_URL}/`, patient);  
    return response.data;
  }
);

export const updatePatient = createAsyncThunk(
  'patients/update',
  async (updatedPatient) => {
    const response = await axios.put(`${PATIENTS_URL}/${updatedPatient.id}/`, updatedPatient);  
    return response.data;
  }
);

export const deletePatient = createAsyncThunk(
  'patients/delete',
  async (patientId) => {
    await axios.delete(`${PATIENTS_URL}/${patientId}/`); 
    return patientId; // Return the ID for deletion confirmation in the component
  }
);
