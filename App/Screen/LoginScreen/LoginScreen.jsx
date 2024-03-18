import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { StyleSheet, Image } from 'react-native'
import Colors from '../../Utils/Colors';
import * as WebBrowser from 'expo-web-browser';
import { useWarmUpBrowser } from '../../../hooks/useWarmUpBrowser';
import { useOAuth } from "@clerk/clerk-expo";

WebBrowser.maybeCompleteAuthSession();
export default function LoginScreen() {
    useWarmUpBrowser();
    const { startOAuthFlow } = useOAuth({ strategy: "oauth_google" });

    const onPress = async () => {
        try {
            const { createdSessionId, signIn, signUp, setActive } =
              await startOAuthFlow();
       
            if (createdSessionId) {
              setActive({ session: createdSessionId });
            } else {
              // Use signIn or signUp for next steps such as MFA
            }
          } catch (err) {
            console.error("OAuth error", err);
          }
    };
  return (
    <View style={{
      display:'flex',
      justifyContent:'center',
      alignItems:'center',
      marginTop:50
    }}>
      <Image source ={require('./../../../assets/images/logo3.png')} 
      style={styles.logoImage}
      />
      <Image source={require('./../../../assets/images/background.png')} 
      style={styles.bgImage}/>

      <View style={{padding:20, alignItems:'center'}}>
        <Text style={styles.heading}>Find the best study spot on campus for you!</Text>
        <Text style={styles.bodyText}>For UBC students, by UBC students with real-time data sourced by the our community!</Text>
        <TouchableOpacity style={styles.button}
        onPress={onPress}>
          <Text style={{
            color:Colors.WHITE,
            textAlign:'center',
            fontSize:17,
            fontFamily:'outfit-medium',
          }}>Login with Google</Text>

        </TouchableOpacity>
      </View>
    </View>
  )
};

const styles = StyleSheet.create({
  logoImage:{
    width:200,
    height:40,
    objectFit:'contain'
  },
  bgImage:{
    width:'100%',
    height:270,
    marginTop:20,
    objectFit:'cover'
  },
  heading:{
    fontSize:25,
    fontFamily:'outfit-bold',
    textAlign:'center',
    marginTop:10
  },
  bodyText:{
    fontSize:17,
    fontFamily:'outfit',
    marginTop:15,
    textAlign:'center',
    color:Colors.GRAYSCALE[4],
    paddingHorizontal: 15
  },
  button:{
    backgroundColor:Colors.PRIMARY,
    padding:16,
    display:'flex',
    borderRadius:99,
    marginTop:80,
    width:250,
    shadowColor: '#171717',
    shadowOffset: {width: -2, height: 4},
    shadowOpacity: 0.4,
    shadowRadius: 8,
  }
});