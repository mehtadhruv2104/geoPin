import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    locations: [],
    loading: false,
    error: null,
    selectedLocation: null,
    authToken:'',
};

const locationSlice = createSlice({
    name: 'locations',
    initialState,
    reducers: {
        addLocation: (state, action) => {
            state.locations.push(action.payload);
        },
        
        setLocations: (state, action) => {
            state.locations = action.payload;
            state.loading = false;
        },
        setAuthToken:(state, action) => {
            state.authToken = action.payload;
        },
    }
});


export const {
    addLocation,
    setLocations,
    setAuthToken
} = locationSlice.actions;


export default locationSlice.reducer;


