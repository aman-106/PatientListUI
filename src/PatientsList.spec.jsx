// utils-for-tests.js
import React from "react";
import { getByTestId, render } from "@testing-library/react";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import { patientsReducer } from "./redux/reducers";
import { screen, fireEvent } from "@testing-library/react";
import PatientsList from "./PatientsList";
import { act } from 'react-dom/test-utils';
import axios  from "axios";

jest.mock('axios');

export function renderWithProviders(
  ui,
  {
    preloadedState = {},
    store = configureStore({
      reducer: { patients: patientsReducer },
      preloadedState,
    }),
    ...renderOptions
  } = {}
) {
  function Wrapper({ children }) {
    return <Provider store={store}>{children}</Provider>;
  }

  // Return an object with the store and all of RTL's query functions
  return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) };
}


describe("PatientsList Component", () => {


  // beforeEach(() => {
  //   // Clear all mocks before each test
  //   jest.clearAllMocks();
  // });

  it("should render loading indicator when loading is true", () => {
    const { getByTestId } = renderWithProviders(<PatientsList />, {
      preloadedState: { patients: {} },
    });
    expect(getByTestId("loader")).toBeInTheDocument();
  });

  // Displaying Patients
it("should render patients table with data", () => {
  const mockPatients = [{ id: 1,      first_name:'first_name', last_name:"last_name",date_of_birth:"1992/02/01",email:"S@dd.com"}];
  const { getByText } = renderWithProviders(<PatientsList />, {
    preloadedState: { patients: {
      patients: mockPatients,
      loading: false,
      error: null,
    } },
  });
  expect(getByText(mockPatients[0].id)).toBeInTheDocument();
  expect(getByText(mockPatients[0].email)).toBeInTheDocument();
});

// Handling Empty State
it("should render 'No data available' message when patients list is empty", () => {
  const { getByText } = renderWithProviders(<PatientsList />,{
    preloadedState: { patients: {
      patients: [],
      loading: false,
      error: null,
    } 
  }});
  expect(getByText("No data available.")).toBeInTheDocument();
});

// Error Handling
it("should render error message when error occurs", () => {
  const error = "Something went wrong!";
  const { getByTestId } = renderWithProviders(<PatientsList />,{
    preloadedState: { patients: {
      patients: [],
      loading: false,
      error,
    } 
  }});
  expect(getByTestId("ErrorOutlineIcon")).toBeInTheDocument();
});

it("should delete patient when confirmation dialog is confirmed", async () => {
  // Mock useSelector to return one patient
  const mockPatient = { id: 1, first_name: "John", last_name: "Doe", email: "john@example.com", date_of_birth: "1990-01-01" };


  const { getByText, queryByText,getByTestId } = renderWithProviders(
    <PatientsList />,
    {
      preloadedState: { patients: { patients: [mockPatient], loading: false, error: null } },
      store: configureStore({
        reducer: { patients: patientsReducer },
        preloadedState: { patients: { patients: [mockPatient], loading: false, error: null } },
      }), // Use configureStore to create store with mock dispatch
    }
  );

  // Click the delete button for the patient
  fireEvent.click(getByText("Delete", { exact: false })); // Use { exact: false } for partial text match

  // Check if confirmation dialog is displayed
  expect(getByText("Are you sure you want to delete the patient:")).toBeInTheDocument();



  // Mock the HTTP request to simulate successful deletion
  const mockDeletePatient = jest.fn().mockResolvedValue();
  axios.delete = mockDeletePatient; 

  // Wait for the asynchronous dispatch and mock HTTP request to complete
  await act(async () => {
      // Click on confirm button
  fireEvent.click(getByTestId("confirm-delete"));
    await Promise.resolve(); // Trigger updates
  });


  expect(mockDeletePatient).toHaveBeenCalled(); // Check API endpoint
  expect(mockDeletePatient).toHaveBeenCalledWith(`${process.env.REACT_APP_API_BASE_URL}/patients/${mockPatient.id}/`);

});




});

