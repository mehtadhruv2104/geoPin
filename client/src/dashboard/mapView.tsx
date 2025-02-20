import * as React from 'react';
import Map,{Marker} from 'react-map-gl/mapbox';
import 'mapbox-gl/dist/mapbox-gl.css';
import { useState } from 'react';
import marker from './../assets/marker.svg'
import GeocoderControl from '../geocoder/GeocoderControl';
import { ViewStateObject } from '../interfaces/interface';
import { Location } from '../interfaces/interface';
import calculateInitialMapState from './getInitialMapState';
import { useRef } from 'react';
import mapboxgl from "mapbox-gl";

const markedLocations:Array<Location> = [
    {
      longitude: 72.8777,
      latitude: 19.0760,
      name: "Mumbai",
      description: "The bustling financial capital of India, known for its beaches, Bollywood, and street food.",
      userID: "user001"
    },
    {
      longitude: 73.0225,
      latitude: 19.1077,
      name: "Thane",
      description: "A city near Mumbai known for its lakes, temples, and lush green surroundings.",
      userID: "user001"
    },
    {
      longitude: 72.9667,
      latitude: 18.9894,
      name: "Navi Mumbai",
      description: "A planned city near Mumbai, known for its modern infrastructure and serene environment.",
      userID: "user001"
    },
    {
      longitude: 72.8951,
      latitude: 19.2183,
      name: "Lonavala",
      description: "A popular hill station known for its scenic beauty, waterfalls, and chikki (sweet snack).",
      userID: "user001"
    },
    {
      longitude: 73.4777,
      latitude: 18.7522,
      name: "Pune",
      description: "A vibrant city known for its educational institutions, historical landmarks, and pleasant weather.",
      userID: "user001"
    },
    {
      longitude: 72.7947,
      latitude: 19.3919,
      name: "Matheran",
      description: "A serene hill station and eco-sensitive zone, known for its toy train and panoramic views.",
      userID: "user001"
    }
  ];

  const globalLocations = [
    {
      longitude: -74.006,
      latitude: 40.7128,
      name: "New York City",
      description: "The largest city in the United States, known for its iconic skyline, Central Park, and Times Square.",
      userID: "user001"
    },
    {
      longitude: 139.6917,
      latitude: 35.6895,
      name: "Tokyo",
      description: "The bustling capital of Japan, famous for its modern technology, historic temples, and vibrant culture.",
      userID: "user001"
    },
    {
      longitude: -0.1278,
      latitude: 51.5074,
      name: "London",
      description: "The capital of the United Kingdom, known for its rich history, the Thames River, and landmarks like Big Ben.",
      userID: "user001"
    },
    {
      longitude: 2.3522,
      latitude: 48.8566,
      name: "Paris",
      description: "The romantic capital of France, famous for the Eiffel Tower, Louvre Museum, and Notre-Dame Cathedral.",
      userID: "user001"
    },
    {
      longitude: 151.2093,
      latitude: -33.8688,
      name: "Sydney",
      description: "Australia's largest city, known for the Sydney Opera House, Harbour Bridge, and stunning beaches.",
      userID: "user001"
    },
    {
      longitude: -99.1332,
      latitude: 19.4326,
      name: "Mexico City",
      description: "The vibrant capital of Mexico, famous for its Aztec heritage, colorful architecture, and delicious cuisine.",
      userID: "user001"
    }
  ];

  const indianLocations = [
    {
      longitude: 77.5946,
      latitude: 12.9716,
      name: "Bengaluru",
      description: "The Silicon Valley of India, known for its IT industry, pleasant weather, and vibrant culture.",
      userID: "user101"
    },
    {
      longitude: 72.8777,
      latitude: 19.0760,
      name: "Mumbai",
      description: "The financial capital of India, famous for Bollywood, Marine Drive, and the Gateway of India.",
      userID: "user102"
    },
    {
      longitude: 77.2090,
      latitude: 28.6139,
      name: "New Delhi",
      description: "The capital of India, known for its historical landmarks like the Red Fort and India Gate.",
      userID: "user103"
    },
    {
      longitude: 88.3639,
      latitude: 22.5726,
      name: "Kolkata",
      description: "The cultural capital of India, famous for its colonial architecture, Durga Puja, and the Howrah Bridge.",
      userID: "user104"
    },
    {
      longitude: 78.4867,
      latitude: 17.3850,
      name: "Hyderabad",
      description: "Known for its rich history, biryani, and the iconic Charminar.",
      userID: "user105"
    },
    {
      longitude: 75.7873,
      latitude: 11.2588,
      name: "Kochi",
      description: "A major port city in Kerala, known for its backwaters, Chinese fishing nets, and colonial history.",
      userID: "user106"
    }
  ];


const MapView = () =>{

    const {centroidLongitude, centroidLatitude} = calculateInitialMapState(markedLocations);
    const mapRef = useRef(null);
    const [viewState, setViewState] = useState<ViewStateObject>({
        longitude: centroidLongitude,
        latitude: centroidLatitude,
        zoom: 12
    })

    const fitMapToMarkedLocations = () => {
        console.log("ref", mapRef);
        if (mapRef.current) {
            const bounds = new mapboxgl.LngLatBounds();
            markedLocations.forEach(location => {
                bounds.extend([location.longitude, location.latitude]);
            });
            console.log('bound', bounds);
            mapRef.current.fitBounds(bounds, {
            padding: 80,
            maxZoom: 14,
            duration: 1000, 
            easing: (t:number) => t * (2 - t) 
            });
        }
    };
    
      const MAP_TOKEN = import.meta.env.VITE_MAP_TOKEN;
    
      return (
        <>
            <Map
            ref={mapRef}
            mapboxAccessToken={MAP_TOKEN}
            initialViewState={viewState}
            style={{width: '100vw' , height: '100vh'}}
            mapStyle="mapbox://styles/mapbox/streets-v9"
            onLoad={fitMapToMarkedLocations}
            >
            {markedLocations.map((location)=>{
                return(
                    <Marker longitude={location?.longitude} latitude={location?.latitude} anchor="bottom">
                        <img style={{width: '30px', height: '30px'}} src={marker} alt="marker" />
                    </Marker>
                )
            })}
            
            
            <GeocoderControl 
                mapboxAccessToken={MAP_TOKEN} 
                position="top-left" 
                marker={true} 
                autocomplete={true} 
                placeholder='Search for Favorite Location' 
                proximity={"ip"}
            />
            </Map>
        </>
      )
}


export default MapView;