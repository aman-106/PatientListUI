import { configureStore } from '@reduxjs/toolkit';
import {patientsReducer} from './reducers';

const store = configureStore({
  reducer: {
    patients: patientsReducer,
  },
});

export default store;
