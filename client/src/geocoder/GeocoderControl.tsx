import * as React from 'react';
import {useState, useEffect} from 'react';
import {useControl, Marker, MarkerProps, ControlPosition} from 'react-map-gl/mapbox';
import MapboxGeocoder, {GeocoderOptions} from '@mapbox/mapbox-gl-geocoder';
import marker from '../assets/marker.svg';
import { useCallback } from 'react';
import type {MarkerDragEvent, LngLat} from 'react-map-gl';
import { Popup } from 'react-map-gl/mapbox';
import { useAddLocationMutation } from '../services/mapService';
import { Location } from '../interfaces/interface';
import { Coordinates } from '../interfaces/interface';
import { getCurrentLocation } from '../dashboard/getCurrentLocation';


type GeocoderControlProps = Omit<GeocoderOptions, 'accessToken' | 'mapboxgl' | 'marker'> & {
  mapboxAccessToken: string;
  marker?: boolean | Omit<MarkerProps, 'longitude' | 'latitude'>;
  position: ControlPosition;


  onLoading?: (e: object) => void;
  onResults?: (e: object) => void;
  onResult?: (e: object) => void;
  onError?: (e: object) => void;
};



/* eslint-disable complexity,max-statements */
export default function GeocoderControl(props: GeocoderControlProps) {

  const userLocation = getCurrentLocation()

  const [markerCoordinates, setMarkerCoordinates] = useState<Coordinates>(userLocation);

  useEffect(()=>{
    setMarkerCoordinates(userLocation);
  },[userLocation])
  
  const [showAddLocationMenu, setShowAddLocationMenu] = useState<boolean>(false);

  const [events, logEvents] = useState<Record<string, LngLat>>({});
  
  const onMarkerDragStart = useCallback((event: MarkerDragEvent) => {
    logEvents(_events => ({..._events, onDragStart: event.lngLat}));
  }, []);
  
  const onMarkerDrag = useCallback((event: MarkerDragEvent) => {
    logEvents(_events => ({..._events, onDrag: event.lngLat}));
    setMarkerCoordinates({
      longitude: event.lngLat.lng,
      latitude: event.lngLat.lat
    });
  }, []);
  
  const onMarkerDragEnd = useCallback((event: MarkerDragEvent) => {
    logEvents(_events => ({..._events, onDragEnd: event.lngLat}));
  }, []);

  const handleRightClick = useCallback((e:React.MouseEvent) =>{
    e.preventDefault(); 
    e.stopPropagation();
    setShowAddLocationMenu(true);
  },[showAddLocationMenu, markerCoordinates])

  const [name, setName] = useState<string>('');
  const [description, setDescription] = useState<string>('');

  const [setLocation,location] = useAddLocationMutation()

  const addLocation = (e) =>{
    e.preventDefault(); 
    e.stopPropagation();
    const loc:Location = {
      longitude: markerCoordinates?.longitude,
      latitude: markerCoordinates?.latitude,
      name: name,
      description: description
    }
    setLocation(loc);
    setShowAddLocationMenu(false);
    setName("");
    setDescription("");
  }


  const geocoder = useControl<MapboxGeocoder>(
    () => {
      const ctrl = new MapboxGeocoder({
        ...props,
        marker: false,
        accessToken: props.mapboxAccessToken,
      });
      
      if (props.onLoading) ctrl.on('loading', props.onLoading);
      if (props.onResults) ctrl.on('results', props.onResults);
      ctrl.on('result', evt => {
        if (props.onResult) props.onResult(evt);

        const {result} = evt;
        const location =
          result &&
          (result.center || (result.geometry?.type === 'Point' && result.geometry.coordinates));
        if (location && props.marker) {
            setMarkerCoordinates({
              longitude: location[0],
              latitude: location[1],
            });
        }
      });
      if (props.onError) ctrl.on('error', props.onError);
      return ctrl;
    },
    {
      position: props.position
    }
  );

  // @ts-ignore (TS2339) private member
  if (geocoder._map) {
    if (geocoder.getProximity() !== props.proximity && props.proximity !== undefined) {
      geocoder.setProximity(props.proximity);
    }
    if (geocoder.getRenderFunction() !== props.render && props.render !== undefined) {
      geocoder.setRenderFunction(props.render);
    }
    if (geocoder.getLanguage() !== props.language && props.language !== undefined) {
      geocoder.setLanguage(props.language);
    }
    if (geocoder.getZoom() !== props.zoom && props.zoom !== undefined) {
      geocoder.setZoom(props.zoom);
    }
    if (geocoder.getFlyTo() !== props.flyTo && props.flyTo !== undefined) {
      geocoder.setFlyTo(props.flyTo);
    }
    if (geocoder.getPlaceholder() !== props.placeholder && props.placeholder !== undefined) {
      geocoder.setPlaceholder(props.placeholder);
    }
    if (geocoder.getCountries() !== props.countries && props.countries !== undefined) {
      geocoder.setCountries(props.countries);
    }
    if (geocoder.getTypes() !== props.types && props.types !== undefined) {
      geocoder.setTypes(props.types);
    }
    if (geocoder.getMinLength() !== props.minLength && props.minLength !== undefined) {
      geocoder.setMinLength(props.minLength);
    }
    if (geocoder.getLimit() !== props.limit && props.limit !== undefined) {
      geocoder.setLimit(props.limit);
    }
    if (geocoder.getFilter() !== props.filter && props.filter !== undefined) {
      geocoder.setFilter(props.filter);
    }
    if (geocoder.getOrigin() !== props.origin && props.origin !== undefined) {
      geocoder.setOrigin(props.origin);
    }
    // Types missing from @types/mapbox__mapbox-gl-geocoder
    if (geocoder.getAutocomplete() !== props.autocomplete && props.autocomplete !== undefined) {
      geocoder.setAutocomplete(props.autocomplete);
    }
    if (geocoder.getFuzzyMatch() !== props.fuzzyMatch && props.fuzzyMatch !== undefined) {
      geocoder.setFuzzyMatch(props.fuzzyMatch);
    }
    if (geocoder.getRouting() !== props.routing && props.routing !== undefined) {
      geocoder.setRouting(props.routing);
    }
    if (geocoder.getWorldview() !== props.worldview && props.worldview !== undefined) {
      geocoder.setWorldview(props.worldview);
    }
  }
  return (
    <>
      <Marker
        longitude={markerCoordinates.longitude}
        latitude={markerCoordinates.latitude}
        anchor="bottom"
        draggable
        onDragStart={onMarkerDragStart}
        onDrag={onMarkerDrag}
        onDragEnd={onMarkerDragEnd}
      >     
        <div onContextMenu={handleRightClick}>
          <img style={{width: '30px', height: '30px'}} src={marker} alt="marker" />
        </div>  
      </Marker>
      {showAddLocationMenu && (
        <Popup
            longitude={markerCoordinates.longitude}
            latitude={markerCoordinates.latitude}
            anchor="top"
            onClose={() => setShowAddLocationMenu(false)}
            closeOnClick={false}
        >
          <div className="p-3 bg-gray-50 rounded-lg w-56">
            <h3 className="text-md font-bold text-gray-900 mb-2">
              Mark your Favorite Location
            </h3>
            <div className="space-y-2">
              <div>
                <label className="text-sm text-gray-600">Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e)=>{setName(e.target.value)}}
                  placeholder="Enter name"
                  className="w-full p-1.5 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500 text-sm"
                />
              </div>
              <div>
                <label className="text-sm text-gray-600">Description</label>
                <textarea
                  value={description}
                  onChange={(e)=>{setDescription(e.target.value)}}
                  placeholder="Enter description"
                  className="w-full p-1.5 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500 text-sm h-16"
                />
              </div>
            </div>
            <button
              onClick={addLocation}
              className="mt-3 w-full py-1.5 bg-green-500 text-white rounded-md hover:bg-green-600 text-sm font-medium"
            >
              Save
            </button>
          </div>
        </Popup>
      )}
    </>
  );
}

const noop = () => {};

GeocoderControl.defaultProps = {
  marker: true,
  onLoading: noop,
  onResults: noop,
  onResult: noop,
  onError: noop
};