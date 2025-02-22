import { Location } from "../interfaces/interface";

// const getHaversineDistance = (lat1:number, lon1:number, lat2:number, lon2:number) =>{
//     let dLat = (lat2 - lat1) * Math.PI / 180.0;
//     let dLon = (lon2 - lon1) * Math.PI / 180.0;
//     lat1 = (lat1) * Math.PI / 180.0;
//     lat2 = (lat2) * Math.PI / 180.0;
//     let a = Math.pow(Math.sin(dLat / 2), 2) + 
//                 Math.pow(Math.sin(dLon / 2), 2) * 
//                 Math.cos(lat1) * 
//                 Math.cos(lat2);
//     let rad = 6371;
//     let c = 2 * Math.asin(Math.sqrt(a));
//     return rad * c;
// }


const calculateInitialMapState = (locations:Array<Location>) => {
    
    const totalLocations = locations.length;
    const centroidLongitude = locations.reduce((sum, loc) => sum + loc.longitude, 0) / totalLocations;
    const centroidLatitude = locations.reduce((sum, loc) => sum + loc.latitude, 0) / totalLocations; 

    return {centroidLongitude,centroidLatitude};
};

export default calculateInitialMapState;
