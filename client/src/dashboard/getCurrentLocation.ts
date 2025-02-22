
import { useEffect,useState } from "react";
import { Coordinates } from "../interfaces/interface";

export const getCurrentLocation = () =>{

    const [userLocation, setUserLocation] = useState<Coordinates>({latitude:19.0760,longitude:72.8777}); 
    useEffect(() => {
        if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
            console.log('positions', position);
            const { latitude, longitude } = position.coords;
            setUserLocation({ latitude, longitude });
            console.log('User location:', latitude, longitude);
            },
            (error) => {
                console.error('Error getting location:', error.message);
            },
            {
            timeout: 10000,           
            maximumAge: 0,            
            }
        );
        } else {
            console.error('Geolocation is not supported by this browser.');
        }
        }, []);

    return userLocation
}

