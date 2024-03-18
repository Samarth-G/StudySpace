import { View, Text, FlatList, Dimensions } from 'react-native'
import React, { useContext, useEffect, useRef, useState } from 'react'
import PlaceItem from './PlaceItem';
import { SelectMarkerContext } from '../../Context/SelectMarkerContext';
import { getFirestore, collection, query, where, getDocs } from 'firebase/firestore';
import { app } from '../../Utils/FirebaseConfig';
import { useUser } from '@clerk/clerk-expo';

// creates list of places
export default function PlaceListView({placeList}) {
    const {user} = useUser();  
    const [favList, setFavList] = useState([]);
    console.log("***", placeList.length);

    const flatListRef = useRef(null);
    const {selectedMarker, setSelectedMarker} = useContext(SelectMarkerContext);

    // scrolls to card of marker
    useEffect(() => {
        if (selectedMarker !== null && placeList.length > 0) {
            scrollToIndex(selectedMarker);
        }
    },[selectedMarker])

    const scrollToIndex=(index)=>{
        flatListRef.current?.scrollToIndex({animated:true, index})
    };

    const getItemLayout=(_, index) => ({
        length:Dimensions.get('screen').width,
        offset:Dimensions.get('screen').width*index,
        index
    });

    const db = getFirestore(app);
    useEffect(() => {
      user&&getFav();
    }, [user])
    const getFav = async() => {
      setFavList([]);
      const q = query(collection(db, "fav-places"), 
      where("email", "==", user?.primaryEmailAddress?.emailAddress));

      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        // console.log(doc.id, " => ", doc.data());
        setFavList(favList => [...favList, doc.data()]);
      });
    }

    const isFav = (place) => {
      const result = favList.find(item=>item.place.id==place.id);
      // console.log("***", result);
      return result?true:false;
    }

  return (
    <View style={{flex:1}}>
      <FlatList
        data = {placeList}
        horizontal={true}
        pagingEnabled
        ref={flatListRef}
        getItemLayout={getItemLayout}
        showsHorizontalScrollIndicator={false}
        renderItem={({item, index})=>(
        <View key={index}>
            <PlaceItem place={item}
            isFav={(place) => isFav(place)}
            markedFav={() => getFav()}/>
        </View>
        )}
        />
    </View>
  )
}