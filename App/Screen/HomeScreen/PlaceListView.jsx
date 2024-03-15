import { View, Text, FlatList, Dimensions } from 'react-native'
import React, { useContext, useEffect, useRef } from 'react'
import PlaceItem from './PlaceItem';
import { SelectMarkerContext } from '../../Context/SelectMarkerContext';
// creates list of places
export default function PlaceListView({placeList}) {
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

    console.log("***", placeList);
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
            index={index} />
        </View>
        )}
        />
    </View>
  )
}