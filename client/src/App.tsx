import * as React from 'react';
import MapView from './dashboard/mapView';
import useAuth from './auth/useAuth';
import LandingPage from './dashboard/landingPage';
import { logout } from './auth/keycloak';
import { setAuthToken } from './redux/locationSlice';
import { useDispatch } from 'react-redux';


function App() {

  const {isLogin, token} = useAuth();
  const dispatch = useDispatch();
  dispatch(setAuthToken(token));
  
  
  return(
    <>
    {isLogin?
      <MapView />:
      <LandingPage />
    }
   
    </>
  )
  
}

export default App
