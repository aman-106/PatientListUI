import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
  Button,
  FormControl,
  FormHelperText,
} from "@mui/material";
import PatientDataAdapter from "./PatientDataAdapter";

const defaultdata = {
  firstName: "",
  lastName: "",
  dateOfBirth: "", // Utilize proper date format
  email: "",
  phoneNumber: "",
};

function getPatientInitialData(patient) {
  return patient
    ? PatientDataAdapter.convertToFormFormat(patient)
    : defaultdata;
}

const PatientModal = ({ open, patient, onClose, onSave }) => {
  const [formData, setFormData] = useState(getPatientInitialData(patient));
  const [errors, setErrors] = useState({});

  // Handle form field changes
  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  //  form validation logic
  const validateForm = () => {
    const newErrors = {};
    if (!formData.firstName) {
      newErrors.firstName = "First name is required";
    }
    if (!formData.lastName) {
      newErrors.lastName = "Last name is required";
    }
    if (!formData.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Invalid email address";
    }

    if (!formData.dateOfBirth) {
      newErrors.dateOfBirth = "Date of birth is required";
    } else {
      const dateOfBirth = new Date(formData.dateOfBirth);
      if (isNaN(dateOfBirth.getTime())) {
        newErrors.dateOfBirth = "Invalid date of birth";
      } else {
        const currentYear = new Date().getFullYear();
        const minValidYear = currentYear - 150;
        if (dateOfBirth < new Date(minValidYear, 0, 1)) {
          newErrors.dateOfBirth =
            "Date of birth cannot be more than 150 years ago";
        } else if (dateOfBirth > new Date()) {
          newErrors.dateOfBirth = "Date of birth cannot be in the future";
        }
      }
    }

    if (!/^[0-9]+$/.test(formData.phoneNumber)) {
      newErrors.phoneNumber = "Phone number must only contain numbers";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Returns true if no errors
  };

  // Handle form submission
  const handleSave = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onSave(e, PatientDataAdapter.convertToApiFormat(formData));
      setFormData(defaultdata);
      onClose();
    }
  };

  // Optionally, update form data on component mount if editing a patient
  useEffect(() => {
    if (patient) {
      setFormData(getPatientInitialData(patient)); // Update form with existing patient data
    }
  }, [patient]);

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{patient ? "Edit Patient" : "Add Patient"}</DialogTitle>
      <DialogContent>
        <TextField
          label="First Name"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
          error={!!errors.firstName} // Set error state based on presence of error message
          helperText={errors.firstName}
          required
        />
        <TextField
          label="Last Name"
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
          error={!!errors.lastName}
          helperText={errors.lastName}
          required
        />
        <TextField
          label="Date of Birth"
          name="dateOfBirth"
          type="date"
          value={formData.dateOfBirth}
          onChange={handleChange}
          error={!!errors.dateOfBirth}
          InputLabelProps={{ shrink: true }}
        />
        <TextField
          label="Email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          error={!!errors.email}
          helperText={errors.email}
          required
        />
        <TextField
          label="Phone Number"
          name="phoneNumber"
          value={formData.phoneNumber}
          onChange={handleChange}
          error={!!errors.phoneNumber}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button type="submit" variant="contained" onClick={handleSave}>
          {patient ? "Save Changes" : "Add Patient"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default PatientModal;
