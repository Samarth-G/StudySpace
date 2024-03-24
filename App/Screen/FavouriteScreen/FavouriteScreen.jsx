import { View, Text, FlatList, TouchableOpacity } from 'react-native'
import React, { useEffect, useState, useContext } from 'react'
import Colors from '../../Utils/Colors'
import { getFirestore } from "firebase/firestore";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import { useUser } from '@clerk/clerk-expo';
import { app } from '../../Utils/FirebaseConfig';
import PlaceItem from '../HomeScreen/PlaceItem';
import { StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function ListScreen() {
  const db = getFirestore(app);
  const {user} = useUser();
  const [favList, setFavList] = useState([]);
  const navigation=useNavigation();

  useEffect(() => {
      if (user) {
          const q = query(collection(db, "fav-places"), 
              where("email", "==", user.primaryEmailAddress.emailAddress));

          const unsubscribe = onSnapshot(q, (querySnapshot) => {
              const updatedFavList = [];
              querySnapshot.forEach((doc) => {
                  updatedFavList.push(doc.data());
              });
              setFavList(updatedFavList);
          });

          return () => unsubscribe(); 
      }
  }, [user]); 

  return (
    <View style={styles.container}>
      <Text style = {{margin:20, padding:10, fontFamily: 'outfit-medium', fontSize: 30, textAlign:'center'}}>
        Favorite <Text style={{ color: Colors.PRIMARY }}> Spots </Text>
      </Text>

      <FlatList
        data={favList}
        contentContainerStyle={{ flexGrow: 1 }}
        renderItem={({item, index}) => (
          <TouchableOpacity onPress={() => navigation.navigate('homestack', 
          { screen: 'home', params: { selectedID: item.place.id }})}>
          <PlaceItem place={item.place} 
          key={index}
          isFav={(place) => true}/>
          </TouchableOpacity>
        )}
      /> 
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});