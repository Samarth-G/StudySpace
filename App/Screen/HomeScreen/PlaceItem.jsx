import { View, Text, Image, Dimensions, Pressable } from 'react-native'
import Toast from 'react-native-root-toast';
import React from 'react'
import Colors from '../../Utils/Colors'
import GlobalApi from '../../Utils/GlobalApi'
import { FontAwesome6, Ionicons } from '@expo/vector-icons';
import { getFirestore, doc, setDoc } from "firebase/firestore";
import { app } from '../../Utils/FirebaseConfig'
import { useUser } from '@clerk/clerk-expo';

export default function PlaceItem({place}) {
    const PLACE_PHOTO_BASE_URL = 'https://places.googleapis.com/v1/'
    const { user } = useUser();
    const db = getFirestore(app);
    let testColor = Colors.WHITE_TRANSP
    const addFav = async(place) => {
      await setDoc(doc(db, "fav-places", place.id),{ // (place.id + user.primaryEmailAddress.emailAddress)
        user: user.primaryEmailAddress.emailAddress,
        place_name: place.displayName.text} // place: place
      );
      Toast.show('Added to favorites!', {
        duration: Toast.durations.SHORT,
        position: Toast.positions.BOTTOM,
        shadow: true,
        animation: true,
        hideOnPress: true,
        delay: 0,
      });
    }

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
      <Pressable onPress={() => addFav(place)} style={({ pressed }) => [
        {
          opacity: pressed ? 0.2 : 1
        }]}>
        <Ionicons name='heart' size={30} color={testColor} style={{position:'absolute', top:15, right:15}}/>
      </Pressable>
      <Image 
      source={
        place?.photos?
        {uri: PLACE_PHOTO_BASE_URL+place.photos[0]?.name+"/media?key="+GlobalApi?.GOOGLE_MAPS_API_KEY+"&maxHeightPx=800&maxWidthPx=1200"}
        :require('./../../../assets/images/background.png')}
        style={{width:'100%', borderRadius:20, height:150, zIndex:-1}}
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