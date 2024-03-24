import { View, Text, Image, Dimensions, Pressable, Platform, Linking } from "react-native";
import React from "react";
import Colors from "../../Utils/Colors";
import GlobalApi from "../../Utils/GlobalApi";
import { FontAwesome6, Ionicons } from "@expo/vector-icons";
import { getFirestore, doc, setDoc, deleteDoc } from "firebase/firestore";
import { app } from "../../Utils/FirebaseConfig";
import { useUser } from "@clerk/clerk-expo";
import { useRoute } from '@react-navigation/native';
import { Rating, AirbnbRating } from 'react-native-ratings';

export default function ItemScreen() {
  const PLACE_PHOTO_BASE_URL = "https://places.googleapis.com/v1/";
  const { user } = useUser();
  const db = getFirestore(app);
  const route = useRoute();

  const { place } = route.params || {};

  const openToMap = () => {
    const url = Platform.select({
      ios:"maps:"+place.location.latitude+","+place?.location?.longitude+"?q="+place?.formattedAddress,
      android:"geo:"+place.location.latitude+","+place?.location?.longitude+"?q="+place?.formattedAddress,
    });

    Linking.openURL(url);
  }

  const ratingCompleted = (rating) => {
    console.log("Rating is: " + rating)
  }

  return (
    <View
      /* To make list scrollable */
      style={{
        backgroundColor: Colors.WHITE,
        borderRadius: 20,
        width: Dimensions.get("screen").width * 0.9,
        margin: 10,
        marginHorizontal: 20,
        shadowColor: "#171717",
        shadowOffset: { width: -2, height: 4 },
        shadowOpacity: 0.4,
        shadowRadius: 8,
      }}
    >
      <Image
        source={
          place?.photos
            ? {
                uri:
                  PLACE_PHOTO_BASE_URL +
                  place.photos[0]?.name +
                  "/media?key=" +
                  GlobalApi?.GOOGLE_MAPS_API_KEY +
                  "&maxHeightPx=800&maxWidthPx=1200",
              }
            : require("./../../../assets/images/background.png")
        }
        style={{ width: "100%", borderRadius: 20, height: 250, zIndex: -1 }}
      />
      <View style={{ padding: 15, paddingTop: 15, paddingBottom: 15 }}>
        <Text
          numberOfLines={1}
          style={{
            fontSize: 20,
            fontFamily: "outfit-medium",
          }}
        >
          {place.displayName?.text}
        </Text>
        <Text
          style={{
            color: Colors.GRAY,
            fontFamily: "outfit",
            fontSize: 12,
            marginTop: 2,
          }}
        >
          {place?.formattedAddress.slice(0, -8)}
        </Text>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            marginTop: 15,
          }}
        >
          <View>
            <Text
              style={{
                fontFamily: "outfit",
                color: Colors.GRAY,
                fontSize: 14,
              }}
            >
              Open
            </Text>
            <Text
              style={{
                fontFamily: "outfit-medium",
                fontSize: 14,
                marginTop: 2,
              }}
            >
              {place.currentOpeningHours !== undefined ? (
                place.currentOpeningHours.openNow == true ? (
                  <Ionicons name="checkmark-circle" size={24} color="green" />
                ) : (
                  <Ionicons name="close-circle" size={24} color="red" />
                )
              ) : (
                "N/A"
              )}
            </Text>
          </View>
          <View>
            <Text
              style={{
                fontFamily: "outfit",
                color: Colors.GRAY,
                fontSize: 14,
              }}
            >
              Accessibility
            </Text>
            <Text
              style={{
                fontFamily: "outfit-medium",
                fontSize: 14,
                marginTop: 2,
              }}
            >
              {place.accessibilityOptions.wheelchairAccessibleEntrance ==
              true ? (
                <Ionicons name="checkmark-circle" size={24} color="green" />
              ) : (
                <Ionicons name="close-circle" size={24} color="red" />
              )}
            </Text>
          </View>
          <View>
            <Text
              style={{
                fontFamily: "outfit",
                color: Colors.GRAY,
                fontSize: 14,
              }}
            >
              Wifi
            </Text>
            <Text
              style={{
                fontFamily: "outfit-medium",
                fontSize: 14,
                marginTop: 2,
              }}
            >
              {place.accessibilityOptions.wheelchairAccessibleEntrance ==
              true ? (
                <Ionicons name="checkmark-circle" size={24} color="green" />
              ) : (
                <Ionicons name="close-circle" size={24} color="red" />
              )}
            </Text>
          </View>
          <View>
            <Text
              style={{
                fontFamily: "outfit",
                color: Colors.GRAY,
                fontSize: 14,
              }}
            >
              Charging
            </Text>
            <Text
              style={{
                fontFamily: "outfit-medium",
                fontSize: 14,
                marginTop: 2,
              }}
            >
              {place.accessibilityOptions.wheelchairAccessibleEntrance ==
              true ? (
                <Ionicons name="checkmark-circle" size={24} color="green" />
              ) : (
                <Ionicons name="close-circle" size={24} color="red" />
              )}
            </Text>
          </View>
        </View>

        <Rating
          showRating
          onFinishRating={ratingCompleted}
          style={{ paddingVertical: 10 }}
        />
        <Pressable
          onPress={() => openToMap()}
          style={({ pressed }) => [
            {
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              marginTop: 15,
              padding: 12,
              backgroundColor: Colors.PRIMARY,
              paddingHorizontal: 14,
              borderRadius: 17,
              opacity: pressed ? 0.2 : 1,
            },
          ]}
        >
          <Text
            style={{ color: "white", textAlign: "center", marginRight: 10 }}
          >
            Get Directions
          </Text>
          <FontAwesome6 name="location-arrow" size={20} color="white" />
        </Pressable>
      </View>
    </View>
  );
}
