import { View, Text, ActivityIndicator, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import Colors from '../../Utils/Colors'
import { getFirestore } from "firebase/firestore";
import { collection, query, where, getDocs } from "firebase/firestore";
import { useUser } from '@clerk/clerk-expo';
import { app } from '../../Utils/FirebaseConfig';
import PlaceItem from '../HomeScreen/PlaceItem';
import PlaceListView from '../HomeScreen/PlaceListView';

export default function ListScreen() {
  const db = getFirestore(app);
  const {user} = useUser();
  const [favList, setFavList] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    user&&getFav();
  }, [user])
  const getFav = async() => {
      setFavList([])
      setLoading(true)
      const q = query(collection(db, "fav-places"), 
      where("email", "==", user?.primaryEmailAddress?.emailAddress));

      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        // console.log(doc.id, " => ", doc.data());
        setFavList(favList => [...favList, doc.data()]);
        setLoading(false)
      });
    }

  return (
    <View>
      <Text style = {{padding:10, fontFamily: 'outfit-medium', fontSize: 30, textAlign:'center'}}>
        Favorite <Text style={{ color: Colors.PRIMARY }}> Spots </Text>
      </Text>

      {!favList? <View
        style = {{height:'100%',
        display:'flex', alignItems:'center',
        justifyContent:'center'
        }}>
        <ActivityIndicator
          color={Colors.PRIMARY}
          size={'large'}
        />
      </View>:null}

      <FlatList
        data={favList}
        onRefresh={()=>getFav()}
        refreshing={loading}
        renderItem={({item, index}) => (
          <PlaceItem place={item.place} 
          key={index}
          isFav={(place) => true}
          markedFav={() => getFav()}/>
        )}
      />
       
    </View>
  )
}