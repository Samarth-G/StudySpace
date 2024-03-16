import { View, Text, Image, Dimensions } from 'react-native'
import React from 'react'
import Colors from '../../Utils/Colors'
import GlobalApi from '../../Utils/GlobalApi'
import { FontAwesome6, Ionicons } from '@expo/vector-icons';

export default function PlaceItem({place}) {
    const PLACE_PHOTO_BASE_URL = 'https://places.googleapis.com/v1/'
  return (  
    <View
    /* To make list scrollable */
    style={{
        backgroundColor:Colors.WHITE,
        borderRadius:20,
        width: Dimensions.get("screen").width*0.9,
        margin:8,
        marginHorizontal:20,
        shadowColor: '#171717',
        shadowOffset: {width: -2, height: 4},
        shadowOpacity: 0.4,
        shadowRadius: 8,
    }}
    >  
      <Image 
      source={
        place?.photos?
        {uri: PLACE_PHOTO_BASE_URL+place.photos[0]?.name+"/media?key="+GlobalApi?.GOOGLE_MAPS_API_KEY+"&maxHeightPx=800&maxWidthPx=1200"}
        :require('./../../../assets/images/background.png')}
        style={{width:'100%', borderRadius:20, height:150}}
      />
      <View style={{ padding: 15, paddingTop:8, paddingBottom:10 }}>
          <Text numberOfLines={1} style={{
            fontSize: 20,
            fontFamily: 'outfit-medium'
          }}>
            {place.displayName?.text}
          </Text>
          <Text style={{
            color: Colors.GRAY,
            fontFamily: 'outfit',
            fontSize: 12
          }}>
            {place?.formattedAddress.slice(0, -8)}
          </Text>
          <View style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginTop: 15,
          }}>
            <View>
              <Text style={{
                fontFamily: 'outfit',
                color: Colors.GRAY,
                fontSize: 14
              }}>Open</Text>
              <Text style={{
                fontFamily: 'outfit-medium',
                fontSize: 14,
                marginTop: 2
              }}>
                {place.currentOpeningHours !== undefined ? 
                (place.currentOpeningHours.openNow == true ?
                <Ionicons name="checkmark-circle" size={24} color="green" /> : 
                <Ionicons name="close-circle" size={24} color="red" />) : 'N/A'}
              </Text>
            </View>
            <View>
              <Text style={{
                fontFamily: 'outfit',
                color: Colors.GRAY,
                fontSize: 14
              }}>Wheelchair?</Text>
              <Text style={{
                fontFamily: 'outfit-medium',
                fontSize: 14,
                marginTop: 2
              }}> 
                {place.accessibilityOptions.wheelchairAccessibleEntrance == true ? <Ionicons name="checkmark-circle" size={24} color="green" /> : <Ionicons name="close-circle" size={24} color="red" />}
              </Text>
            </View>
            <View>
              <Text style={{
                fontFamily: 'outfit',
                color: Colors.GRAY,
                fontSize: 14
              }}>Rating</Text>
              <Text style={{
                fontFamily: 'outfit-medium',
                fontSize: 14,
                marginTop: 2
              }}>
                {place.rating !== undefined ? `${place.rating}` : 'N/A'}
              </Text>
            </View>
            <View
              style={{
                padding: 12,
                backgroundColor: Colors.PRIMARY,
                paddingHorizontal: 14,
                borderRadius: 17
              }}>
              <FontAwesome6 name="location-arrow" size={20} color="white" />
            </View>
          </View>
        </View>
    </View>
  )
}