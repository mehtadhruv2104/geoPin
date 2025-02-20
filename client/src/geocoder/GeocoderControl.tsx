import * as React from 'react';
import {useState} from 'react';
import {useControl, Marker, MarkerProps, ControlPosition} from 'react-map-gl/mapbox';
import MapboxGeocoder, {GeocoderOptions} from '@mapbox/mapbox-gl-geocoder';
import marker from '../assets/marker.svg';

type GeocoderControlProps = Omit<GeocoderOptions, 'accessToken' | 'mapboxgl' | 'marker'> & {
  mapboxAccessToken: string;
  marker?: boolean | Omit<MarkerProps, 'longitude' | 'latitude'>;

  position: ControlPosition;

  onLoading?: (e: object) => void;
  onResults?: (e: object) => void;
  onResult?: (e: object) => void;
  onError?: (e: object) => void;
};

// interface Location{
//   latitute: number
//   longitude: number
// }

/* eslint-disable complexity,max-statements */
export default function GeocoderControl(props: GeocoderControlProps) {
  const [markerElement, setMarkerElement] = useState<React.ReactNode>(null);
  //const [locations, setLocations] = Array<Location>([]);

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
          const markerProps = typeof props.marker === 'boolean' ? {} : props.marker;
          setMarkerElement(<Marker {...markerProps} longitude={location[0]} latitude={location[1]} > 
            <img style={{width: '30px', height: '30px'}} src={marker} alt="marker" />
          </Marker>);
        } else {
          setMarkerElement(null);
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
  return markerElement;
}

const noop = () => {};

GeocoderControl.defaultProps = {
  marker: true,
  onLoading: noop,
  onResults: noop,
  onResult: noop,
  onError: noop
};