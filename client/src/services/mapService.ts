import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { Location } from '../interfaces/interface'
import { useSelector } from 'react-redux'
import { RootState } from '../redux/store'



export const LocationApi = createApi({
    reducerPath: 'locationAPI',
    baseQuery: fetchBaseQuery({ 
        baseUrl: import.meta.env.VITE_BASE_URL,
        prepareHeaders: (headers,{getState}) => {
            const token = (getState() as RootState).locations.authToken
            console.log('authToken inheader',token )
            if(token){
                headers.set('Authorization', `Bearer ${token}`);
            }
            return headers;  
        }
    }),
    tagTypes: ['Location'],
    endpoints: (builder) => ({
        getLocation: builder.query({
            query: () => ({
                url: 'location',
                method: 'GET'
            }),
            providesTags:['Location']
        }),
        addLocation: builder.mutation({
            query:(data:Location)=>({
                url:'location',
                method:'POST',
                body: JSON.stringify({
                    longitude: data?.longitude,
                    latitude: data?.latitude,
                    name: data?.name,
                    description: data?.description,
                })
            }),
            invalidatesTags:['Location']
        }),
        getLocationByID: builder.query({
            query: (data) => ({
                url: `location${data?.id}`,
                method: 'GET'
            }),
            providesTags:['Location']
        }),
        
    }),
})

export const {
    useGetLocationQuery,
    useAddLocationMutation,
    useGetLocationByIDQuery,
} = LocationApi;

