import * as React from 'react';
import Map,{Marker, Popup} from 'react-map-gl/mapbox';
import 'mapbox-gl/dist/mapbox-gl.css';
import { useState, useEffect } from 'react';
import markerImg from './../assets/marker.svg'
import GeocoderControl from '../geocoder/GeocoderControl';
import { ViewStateObject } from '../interfaces/interface';
import { Location } from '../interfaces/interface';
import calculateInitialMapState from './getInitialMapState';
import { useRef } from 'react';
import mapboxgl from "mapbox-gl";
import { indianLocations, globalLocations, markedLocations } from './data';
import { useGetLocationQuery } from '../services/mapService';
import './dashboard.css'
import { setLocations } from '../redux/locationSlice';
import { useDispatch } from 'react-redux';
import LoadingScreen from './loadingScreen';
import useAuth from '../auth/useAuth';
import { logout } from '../auth/keycloak';
import IntroToUser from './intro';
import { getCurrentLocation } from './getCurrentLocation';


const MapView = () =>{
    const userLocation = getCurrentLocation()
    const [viewState, setViewState] = useState<ViewStateObject>({
      longitude: userLocation.longitude? userLocation.longitude: 72.8777,
      latitude: userLocation?.latitude? userLocation.latitude: 19.0760,
      zoom: 12
    })

    const locations = useGetLocationQuery({},{})
    const [loading, setLoading] = useState<boolean>(true);
    const [showMarkerInfo, setShowMarkerInfo] = useState<boolean>(false);
    const [selectedMarkerInfo, setSelectedMarkerInfo] = useState<Location>()
    const dispatch = useDispatch()
    const [markedLocations, setMarkedLocations] = useState<Array<Location>>([])
    const [showIntro, setShowIntro] = useState<boolean>(false);



    useEffect(()=>{
      if(locations.isSuccess && !locations.isFetching){
        if(locations?.data === null){
            setShowIntro(true);
        }
        setMarkedLocations(locations?.data || []);
        dispatch(setLocations(locations?.data || []));
        setLoading(false);
      }else if(locations.isError){
        console.log("Locations API failed, showing default view")
      }
    },[locations])
    

    useEffect(()=>{
        if(markedLocations?.length > 0){
          const {centroidLongitude, centroidLatitude} = calculateInitialMapState(markedLocations);
          setViewState({
            longitude: centroidLongitude,
            latitude: centroidLatitude,
            zoom: 12,
          })
        }
    },[markedLocations])

    
   
    const mapRef = useRef(null);
    

    const fitMapToMarkedLocations = () => {
        if (mapRef.current && markedLocations?.length > 0) {
            const bounds = new mapboxgl.LngLatBounds();
            markedLocations.forEach(location => {
              bounds.extend([location.longitude, location.latitude]);
            })
            mapRef.current.fitBounds(bounds, {
            padding: 80,
            maxZoom: 14,
            duration: 1000, 
            easing: (t:number) => t * (2 - t) 
            });
        }
    };

    const showInfo = (e,loc:Location) =>{
      e.originalEvent.stopPropagation();
      setSelectedMarkerInfo(loc);
      setShowMarkerInfo(true);
    }
    
    const MAP_TOKEN = import.meta.env.VITE_MAP_TOKEN;
    
    return (
      <>
        {loading?
          <LoadingScreen />:
        <div>
          <Map
          ref={mapRef}
          mapboxAccessToken={MAP_TOKEN}
          initialViewState={viewState}
          style={{width: '100vw' , height: '100vh'}}
          mapStyle="mapbox://styles/mapbox/streets-v9"
          onLoad={fitMapToMarkedLocations}
          >
          {markedLocations?.length > 0 && markedLocations.map((location, index)=>{
              return(
                <>
                  <Marker longitude={location?.longitude} latitude={location?.latitude} anchor="bottom" key={index} onClick={(e)=>{showInfo(e,location)}}>
                      <img style={{width: '30px', height: '30px'}} src={markerImg} alt="marker" />
                  </Marker>
                </>  
              )
          })}  
          {showMarkerInfo && selectedMarkerInfo &&
            (<Popup
              longitude={selectedMarkerInfo.longitude}
              latitude={selectedMarkerInfo.latitude}
              anchor="top"
              onClose={() => setShowMarkerInfo(false)}
              closeOnClick={true}
         
            > 
              <div className="w-40 p-3 bg-white rounded-md shadow-md">
                <label className="block text-sm font-semibold text-gray-800">
                  {selectedMarkerInfo.name}
                </label>
                <label className="block text-sm text-gray-600">
                  {selectedMarkerInfo.description}
                </label>
            </div>
          
            </Popup>
          )}

          <GeocoderControl 
              mapboxAccessToken={MAP_TOKEN} 
              position="top-left" 
              marker={true} 
              autocomplete={true} 
              placeholder='Search for Favorite Location' 
              proximity={"ip"}
          />
          <button
            onClick={(e) => {
              e.stopPropagation();
              dispatch(setLocations([]));
              logout();
            }}
            className="absolute top-2 right-2 px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors z-10"
          >
            Logout
          </button>
          {showIntro && <IntroToUser setShowIntro={setShowIntro}/>}
          {/* <NavigationControl /> */}
          </Map>
        </div>

      }      
    </>
  )
}


export default MapView;