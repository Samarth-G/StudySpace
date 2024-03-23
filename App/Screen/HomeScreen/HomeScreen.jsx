import { View, StyleSheet } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import AppMapView from "./AppMapView";
import Header from "./Header";
import GlobalApi from "../../Utils/GlobalApi";
import { UserLocationContext } from "../../Context/UserLocationContext";
import PlaceListView from "./PlaceListView";
import { SelectMarkerContext } from "../../Context/SelectMarkerContext";
import { LOCATION_LONGITUDE, LOCATION_LATITUDE } from "react-native-dotenv";
import SearchBar from "./SearchBar";

export default function HomeScreen() {
  const { location, setLocation } = useContext(UserLocationContext);
  const [placeList, setPlaceList] = useState([]);
  const [selectedMarker, setSelectedMarker] = useState([]);

  useEffect(() => {
    location && GetNearByPlace();
  }, [location]);

  const GetNearByPlace = () => {
    const data = {
      includedTypes: ["library"],
      maxResultCount: 8,
      locationRestriction: {
        circle: {
          center: {
            latitude: LOCATION_LATITUDE, // location?.latitude,
            longitude: LOCATION_LONGITUDE // location?.longitude,
          },
          radius: 1000.0,
        },
      },
    };
    GlobalApi.NewNearByPlace(data).then((resp) => {
      // console.log(JSON.stringify(resp.data?.places));
      setPlaceList(resp.data?.places);
    });
  };

  return (
    <SelectMarkerContext.Provider value={{ selectedMarker, setSelectedMarker }}>
      <View>
        <View style={styles.headerContainer}>
          <Header />
          {/* <SearchBar searchedLocation={(location) => setLocation({
          latitude:location.lat,
          longitude:location.lng
        })} /> */}
        </View>
        {placeList && <AppMapView placeList={placeList} />}
        <View style={styles.placeListContainer}>
          {/* display placelist if it exists */}
          {placeList && <PlaceListView placeList={placeList} />}
        </View>
      </View>
    </SelectMarkerContext.Provider>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    position: "absolute",
    zIndex: 10,
    padding: 7,
    width: "100%",
    paddingHorizontal: 20,
    marginTop: 8,
    shadowColor: "#171717",
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
  },
  placeListContainer: {
    position: "absolute",
    bottom: 0,
    zIndex: 10,
    width: "100%",
  },
});
