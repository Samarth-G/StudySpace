import { View, Text, Image, Dimensions } from 'react-native'
import React from 'react'
import Colors from '../../Utils/Colors'
import GlobalApi from '../../Utils/GlobalApi'
import { LinearGradient } from 'expo-linear-gradient';
import { FontAwesome6 } from '@expo/vector-icons';


export default function PlaceItem({place}) {
    const PLACE_PHOTO_BASE_URL = 'https://places.googleapis.com/v1/'
  return (  
    <View
    /* To make list scrollable */
    style={{
        backgroundColor:Colors.WHITE,
        width: Dimensions.get("screen").width*0.9,
        margin:5,
        borderRadius:10,
        marginHorizontal:20
    }}
    >
        <LinearGradient
        colors={['transparent', '#ffffff']}
        >    
      <Image 
      source={
        place?.photos?
        {uri: PLACE_PHOTO_BASE_URL+place.photos[0]?.name+"/media?key="+GlobalApi?.GOOGLE_MAPS_API_KEY+"&maxHeightPx=800&maxWidthPx=1200"}
        :require('./../../../assets/images/ev-charging.png')}
        style={{width:'100%', borderRadius:10, height:180, zIndex:-1}}
      />
      <View style={{ padding: 15 }}>
          <Text numberOfLines={1} style={{
            fontSize: 23,
            fontFamily: 'outfit-medium'
          }}>
            {place.displayName?.text}
          </Text>
          <Text style={{
            color: Colors.GRAY,
            fontFamily: 'outfit'
          }}>
            {place?.shortFormattedAddress}
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
                fontSize: 17
              }}>Rating</Text>
              <Text style={{
                fontFamily: 'outfit-medium',
                fontSize: 20,
                marginTop: 2
              }}>
                {place.rating !== undefined ? `${place.rating}` : 'N/A'}
              </Text>
            </View>
            <Text
              style={{
                padding: 12,
                backgroundColor: Colors.PRIMARY,
                borderRadius: 6,
                paddingHorizontal: 14
              }}>
              <FontAwesome6 name="location-arrow" size={25} color="white" />
            </Text>
          </View>
        </View>
      </LinearGradient>
    </View>
  )
}