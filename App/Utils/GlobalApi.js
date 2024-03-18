import axios from 'axios'
import { GOOGLE_MAPS_API_KEY } from 'react-native-dotenv'

const BASE_URL = "https://places.googleapis.com/v1/places:searchNearby"
const config={
    headers:{
        'Content-Type':'application/json',
        'X-Goog-Api-Key':GOOGLE_MAPS_API_KEY,
        'X-Goog-FieldMask':['places.displayName',
        'places.formattedAddress',
        'places.location',
        'places.rating',
        'places.shortFormattedAddress',
        'places.photos','places.id',
        'places.accessibilityOptions.wheelchairAccessibleEntrance', 'places.currentOpeningHours.openNow']
    }
}

const NewNearByPlace=(data)=>axios.post(BASE_URL,data,config);
const findPlaceById=(id)=>axios.get('https://places.googleapis.com/v1/places/' + id + '?fields=*&key=' + GOOGLE_MAPS_API_KEY);

export default{
    NewNearByPlace,
    findPlaceById,
    GOOGLE_MAPS_API_KEY
}
