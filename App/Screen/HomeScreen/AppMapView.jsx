import React, {useContext, useEffect } from 'react';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { StyleSheet, View, Text, Image} from 'react-native';
import MapViewStyle from '../../Utils/MapViewStyle.json'
import { UserLocationContext } from '../../Context/UserLocationContext';
import Markers from './../HomeScreen/Markers'

export default function AppMapView({placeList}) {
  
  const {location, setLocation} = useContext(UserLocationContext);

  return location?.latitude && (
    <View>
        <MapView style={styles.map} 
        provider={PROVIDER_GOOGLE}
        customMapStyle={MapViewStyle}
        region={{
          latitude: location?.latitude, 
          longitude: location?.longitude, 
          latitudeDelta: 0.0041, 
          longitudeDelta: 0.0041}}> 
        <Marker 
          coordinate={{
            latitude: location?.latitude, 
            longitude: location?.longitude
          }}> 
          <Image source={require('./../../../assets/images/user-marker.png')} 
          style={{width:60, height:60}}
          />
          </Marker>

          {placeList && placeList.map((item, index) => (
            <Markers key={index}
            index={index}
            place={item}/>
          ))}
        </MapView>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    map: {
      width: '100%',
      height: '100%',
    },
  });