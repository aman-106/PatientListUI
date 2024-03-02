## Available Scripts

In the project directory, you can run:

Make Sure! , Rest API is working 

### `REACT_APP_API_BASE_URL=http://127.0.0.1:8000/api npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.


### High-Level Documentation for `PatientsList` Component

#### Overview:
The `PatientsList` component is a React functional component responsible for displaying a list of patients fetched from the Redux store. It facilitates patient management operations such as adding, updating, and deleting patients.

#### Dependencies:
- React: A JavaScript library for building user interfaces.
- Redux: A predictable state container for JavaScript applications.
- Material-UI: A popular React UI framework for building responsive web applications.

#### Key Features:
1. **Fetching Patients**: Utilizes Redux to fetch patients from the backend upon component mount.
2. **Displaying Loader and Error States**: Renders loader spinner while data is being fetched and displays error message if data retrieval fails.
3. **Success Banner**: Shows a success banner upon successful patient update.
4. **Adding and Updating Patients**: Provides functionality to add new patients and update existing patient records through modal dialogs.
5. **Deleting Patients**: Offers the ability to delete patients with a confirmation dialog.
6. **Displaying Patient List**: Renders a table displaying patient information including ID, name, email, date of birth, and action buttons for editing and deleting patients.
7. **No Data Banner**: Displays a message if no patient data is available.

#### Component Structure:
- The component consists of two main sections: the header section and the patient list section.
- The header section contains a button to add a new patient.
- The patient list section displays the list of patients in a table format.
- It includes error handling components, success banners, confirmation dialogs, and patient modals for interactive user experience.


