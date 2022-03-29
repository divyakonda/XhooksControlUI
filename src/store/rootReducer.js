import { combineReducers } from '@reduxjs/toolkit';
import loading from './loaderSlice';
import settings from './settingsSlice';
import backdrop from './backdropSlice';
import auth from './auth/store';
import message from './messageSlice';
import dialog from './dialogSlice';
import smartContract from './smartContractSlice';

const createReducer = (asyncReducers) =>
  combineReducers({
    auth,
    settings,
    loading,
    message,
    backdrop,
    dialog,
    smartContract,
    ...asyncReducers
  });

export default createReducer;
