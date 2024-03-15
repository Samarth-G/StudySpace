import { View, Text, Image } from 'react-native'
import React, { useContext, useState } from 'react'
import { Marker } from 'react-native-maps'
import { SelectMarkerContext } from '../../Context/SelectMarkerContext'

export default function Markers({index, place}) {
  const {selectedMarker, setSelectedMarker} = useContext(SelectMarkerContext);
  return place && (
    <Marker 
          coordinate={{
            latitude: place.location?.latitude, 
            longitude: place.location?.longitude
          }}
          onPress={()=> setSelectedMarker(index)}
          > 
          <Image source={require('./../../../assets/images/lib_marker.png')} 
          style={{width:60, height:60}}
          />
    </Marker>
  )
}