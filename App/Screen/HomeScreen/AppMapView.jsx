import React, {useContext } from 'react';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { StyleSheet, View, Image} from 'react-native';
import MapViewStyle from '../../Utils/MapViewStyle.json'
import { UserLocationContext } from '../../Context/UserLocationContext';
import Markers from './../HomeScreen/Markers'
import {LOCATION_LONGITUDE, LOCATION_LATITUDE} from 'react-native-dotenv'

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
          <Image source={require('./../../../assets/images/user-marker2.png')} 
          style={{width:50, height:50, shadowColor: '#287cff',
          shadowOffset: {width: -4, height: 4},
          shadowOpacity: 1,
          shadowRadius: 6,}}
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