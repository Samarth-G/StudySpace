import { View, StyleSheet } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import AppMapView from "./AppMapView";
import Header from "./Header";
import GlobalApi from "../../Utils/GlobalApi";
import { app } from '../../Utils/FirebaseConfig';
import { UserLocationContext } from "../../Context/UserLocationContext";
import PlaceListView from "./PlaceListView";
import { SelectMarkerContext } from "../../Context/SelectMarkerContext";
import { LOCATION_LONGITUDE, LOCATION_LATITUDE } from "react-native-dotenv";
import SearchBar from "./SearchBar";
import { getFirestore, collection, query, where, onSnapshot } from 'firebase/firestore';

export default function HomeScreen() {
  const { location, setLocation } = useContext(UserLocationContext);
  const [placeList, setPlaceList] = useState([]);
  const [selectedMarker, setSelectedMarker] = useState([]);
  const db = getFirestore(app); 

  useEffect(() => {
    location && GetNearByPlace();
  }, [location]);

  const GetNearByPlace = () => {
    const q = query(collection(db, "study-spots"));

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const db_placeList = [];
      querySnapshot.forEach((doc) => {
        db_placeList.push(doc.data());
      });

      db_placeList.sort((a, b) => {
        const distA = distBetween(LOCATION_LATITUDE, LOCATION_LONGITUDE, a.location.latitude, a.location.longitude);
        const distB = distBetween(LOCATION_LATITUDE, LOCATION_LONGITUDE, b.location.latitude, b.location.longitude);
        return distA - distB;
      });

      setPlaceList(db_placeList.slice(0, 10));
    });

    return () => unsubscribe(); 

    // const data = {
    //   includedTypes: ["library"],
    //   maxResultCount: 8,
    //   locationRestriction: {
    //     circle: {
    //       center: {
    //         latitude: LOCATION_LATITUDE, // location?.latitude,
    //         longitude: LOCATION_LONGITUDE // location?.longitude,
    //       },
    //       radius: 1000.0,
    //     },
    //   },
    // };
    //
    // GlobalApi.NewNearByPlace(data).then((resp) => {
    //   console.log(JSON.stringify(resp.data?.places));
    //   setPlaceList(resp.data?.places);
    // });
  };

  const distBetween = (lat1, lon1, lat2, lon2) => {
    var R = 6371; // km
    var dLat = (lat2 - lat1) * Math.PI / 180;
    var dLon = (lon2 - lon1) * Math.PI / 180;
    var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c;
    return d;
  }

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
