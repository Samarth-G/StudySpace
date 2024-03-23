import { View, TouchableOpacity, Image, StyleSheet } from 'react-native'
import React from 'react'
import { useUser } from '@clerk/clerk-expo'
import { FontAwesome } from '@expo/vector-icons';
import Colors from '../../Utils/Colors';
import { useNavigation } from '@react-navigation/native';

export default function Header() {
    const {user} = useUser();
    const navigation=useNavigation();
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.navigate('profile')}>
        <Image source={{uri:user?.imageUrl}}
        style={{width:35,height:35,borderRadius:99}}/>
      </TouchableOpacity>

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