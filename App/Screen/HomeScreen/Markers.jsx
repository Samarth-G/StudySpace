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
          style={{width:60, 
            height:60,
            shadowColor: selectedMarker === index ? Colors.SUCCESS : 'transparent', // Apply shadow only to selectedMarker
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 1,
            shadowRadius: 6,
          }}
          />
    </Marker>
  )
}