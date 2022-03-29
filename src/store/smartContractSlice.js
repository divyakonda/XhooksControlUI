import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { showMessage } from './messageSlice';
import {
  startLoading1,
  clearLoading1,
  startLoading2,
  clearLoading2,
  startLoading3,
  clearLoading3
} from './loaderSlice';
import {
  fetchSmartContractListService,
  createSmartContractService,
  testSmartContractService
} from '../services/default/defaultService';
// import history from '../configurations/@history';

export const getSmartContractList = createAsyncThunk(
  'smartContract/getSmartContractList',
  async (id, { dispatch }) => {
    dispatch(startLoading3());
    try {
      const response = await fetchSmartContractListService();
      console.log(response);
      if (response.status) {
        dispatch(clearLoading3());
        return response.data;
      }
      dispatch(clearLoading3());
      if (response.error) {
        response.error.message &&
          dispatch(showMessage({ message: response.error.message, variant: 'error' }));
      } else {
        response.message && dispatch(showMessage({ message: response.message, variant: 'error' }));
      }
      return [];
    } catch (error) {
      dispatch(clearLoading3());
      error.message && dispatch(showMessage({ message: error.message, variant: 'error' }));
      return [];
    }
  }
);

export const createSmartContract = createAsyncThunk(
  'smartContract/createSmartContract',
  async (data, { dispatch }) => {
    dispatch(startLoading1());
    try {
      const response = await createSmartContractService(data);
      // console.log(response);
      if (response.status) {
        dispatch(clearLoading1());
        dispatch(
          showMessage({ message: 'Smart Contract created successfully', variant: 'success' })
        );
        // history.push('/');
        return response;
      }
      dispatch(clearLoading1());
      if (response.error) {
        response.error.message &&
          dispatch(showMessage({ message: response.error.message, variant: 'error' }));
      } else {
        response.message && dispatch(showMessage({ message: response.message, variant: 'error' }));
      }
      return null;
    } catch (error) {
      dispatch(clearLoading1());
      error.message && dispatch(showMessage({ message: error.message, variant: 'error' }));
      return null;
    }
  }
);

export const testSmartContract = createAsyncThunk(
  'smartContract/testSmartContract',
  async (data, { dispatch }) => {
    dispatch(startLoading2());
    try {
      const response = await testSmartContractService(data);
      // console.log(response);
      if (response.status) {
        dispatch(clearLoading2());
        if (response.message === 'Success') {
          dispatch(showMessage({ message: 'Test successfull', variant: 'success' }));
          return response;
        } else {
          dispatch(
            showMessage({ message: response.message.code || 'Invalid data', variant: 'error' })
          );
          return null;
        }
      }
      dispatch(clearLoading2());
      if (response.error) {
        response.error.message &&
          dispatch(showMessage({ message: response.error.message, variant: 'error' }));
      } else {
        response.message && dispatch(showMessage({ message: response.message, variant: 'error' }));
      }
      return null;
    } catch (error) {
      dispatch(clearLoading2());
      error.message && dispatch(showMessage({ message: error.message, variant: 'error' }));
      return null;
    }
  }
);

const smartContractSlice = createSlice({
  name: 'smartContract',
  initialState: {
    smartContractList: []
  },
  reducers: {},
  extraReducers: {
    [getSmartContractList.fulfilled]: (state, action) => {
      return { ...state, smartContractList: action.payload };
    },
    [createSmartContract.fulfilled]: (state) => {
      return { ...state };
    },
    [testSmartContract.fulfilled]: (state) => {
      return { ...state };
    }
  }
});

// export const { } = smartContractSlice.actions;

export default smartContractSlice.reducer;
