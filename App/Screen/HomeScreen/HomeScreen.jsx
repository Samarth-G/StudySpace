import { View, Text, StyleSheet } from 'react-native'
import React, { useContext, useEffect } from 'react'
import AppMapView from './AppMapView'
import Header from './Header'
import SearchBar from './SearchBar'
import GlobalApi from '../../Utils/GlobalApi'
import { UserLocationContext } from '../../Context/UserLocationContext'

export default function HomeScreen() {

  const { location, setLocation } = useContext(UserLocationContext);
  useEffect(() => {
    location&&GetNearByPlace();
  }, [location])

  const GetNearByPlace = () => {
    const data = {
      "includedTypes": ["library"],
      "maxResultCount": 10,
      "locationRestriction": {
        "circle": {
          "center": {
            "latitude": location?.latitude,
            "longitude": location?.longitude
          },
          "radius": 1000.0
        }
      }
    }
    GlobalApi.NewNearByPlace(data).then(resp => {
      console.log(JSON.stringify(resp.data));
    })
  }

return (
  <View>
    <View style={styles.headerContainer}>
      <Header />
      <SearchBar searchedLocation={(location) => setLocation({
          latitude:location.lat,
          longitude:location.lng
        })} />
    </View>
    <AppMapView />
  </View>
)
}

const styles = StyleSheet.create({
  headerContainer: {
    position: 'absolute',
    zIndex: 10,
    padding: 10,
    width: '100%',
    paddingHorizontal: 20
  },
  placeListContainer: {
    position: 'absolute',
    bottom: 0,
    zIndex: 10,
    width: '100%'
  }
})