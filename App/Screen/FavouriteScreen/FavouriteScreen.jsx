import { View, Text, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import Colors from '../../Utils/Colors'
import { getFirestore } from "firebase/firestore";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import { useUser } from '@clerk/clerk-expo';
import { app } from '../../Utils/FirebaseConfig';
import PlaceItem from '../HomeScreen/PlaceItem';
import { StyleSheet } from 'react-native';

export default function ListScreen() {
  const db = getFirestore(app);
  const {user} = useUser();
  const [favList, setFavList] = useState([]);

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
          <PlaceItem place={item.place} 
          key={index}
          isFav={(place) => true}
          markedFav={() => {}}
           />
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