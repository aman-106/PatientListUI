class PatientDataAdapter {
    static convertToApiFormat(patient) {
      return {
        id: patient.id,
        first_name: patient.firstName,
        last_name: patient.lastName,
        email: patient.email,
        phone_number: patient.phoneNumber,
        date_of_birth: patient.dateOfBirth,
      };
    }
  
    static convertToFormFormat(patient) {
      return {
        id: patient.id,
        firstName: patient.first_name,
        lastName: patient.last_name,
        email: patient.email,
        phoneNumber: patient.phone_number,
        dateOfBirth: patient.date_of_birth,
      };
    }
  }
  
  export default PatientDataAdapter;
  