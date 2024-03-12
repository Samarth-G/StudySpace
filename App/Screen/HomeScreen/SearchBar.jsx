import { View, Text } from 'react-native'
import React from 'react'
import Colors from '../../Utils/Colors'
import Ionicons from '@expo/vector-icons/Ionicons'
import { GOOGLE_MAPS_API_KEY } from 'react-native-dotenv'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete'

export default function SearchBar({searchedLocation}) {
  return (
    <View style={{
        display:'flex',
        flexDirection:'row',
        marginTop:15,
        paddingHorizontal:5,
        backgroundColor:Colors.WHITE,
        borderRadius:6}}>

        <Ionicons name="location-sharp" size={24} color={Colors.GRAYSCALE[4]} style={{paddingTop:10}} />

        <GooglePlacesAutocomplete
        placeholder='Search Study Spots on Campus'
        enablePoweredByContainer={false}
        fetchDetails={true}
        onPress={(data, details = null) => {
            // 'details' is provided when fetchDetails = true
            searchedLocation(details?.geometry?.location)
        }}
        query={{
            key: GOOGLE_MAPS_API_KEY,
            language: 'en',
        }}/>
    </View>
  )
}