import { View, Text, Image } from 'react-native'
import React, { useContext, useState } from 'react'
import { Marker } from 'react-native-maps'
import { SelectMarkerContext } from '../../Context/SelectMarkerContext'
import Colors from '../../Utils/Colors';

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
          <Image source={require('./../../../assets/images/lib-marker2.png')} 
          style={{width:60, height:60}}
          />
    </Marker>
  )
}