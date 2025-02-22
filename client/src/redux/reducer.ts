
import { combineReducers } from '@reduxjs/toolkit';
import locationReducer from './locationSlice';
import { LocationApi } from '../services/mapService';

const rootReducer = combineReducers({
    locations: locationReducer,
    [LocationApi.reducerPath]: LocationApi.reducer,
});

export default rootReducer;