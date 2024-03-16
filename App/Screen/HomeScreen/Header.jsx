import { View, Text, Image, StyleSheet } from 'react-native'
import React from 'react'
import { useUser } from '@clerk/clerk-expo'
import { FontAwesome } from '@expo/vector-icons';
import Colors from '../../Utils/Colors';

export default function Header() {
    const {user} = useUser();
  return (
    <View style={styles.container}>
      <Image source={{uri:user?.imageUrl}}
        style={{width:35,height:35,borderRadius:99}}/>

      <Image source={require('./../../../assets/images/logo3.png')}
        style={{width:200,height:30,objectFit:'contain'}}/>

      <FontAwesome name="filter" size={26} color="black" />
    </View>
  )
}

const styles = StyleSheet.create({
    container:{
        display:'flex',
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        padding:10,
        borderRadius:15,
        backgroundColor: Colors.WHITE
    }
})