import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../Screen/HomeScreen/HomeScreen'
import FavouriteScreen from '../Screen/FavouriteScreen/FavouriteScreen'
import ProfileScreen from '../Screen/ProfileScreen/ProfileScreen'
import ItemScreen from '../Screen/ItemScreen/ItemScreen';
import { FontAwesome } from '@expo/vector-icons';
import Colors from '../Utils/Colors'

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function HomeStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="home"
        component={HomeScreen}
        options={{ headerShown: false }} 
      />
      <Stack.Screen
        name="item"
        component={ItemScreen}
      />
    </Stack.Navigator>
  );
}

export default function TabNavigation() {
  return (
    <Tab.Navigator screenOptions={{
      headerShown: false
    }}>
        <Tab.Screen name='homestack' 
        component={HomeStack}
        options={{
            tabBarLabel:'Search',
            tabBarActiveTintColor:Colors.PRIMARY,
            tabBarIcon: ({color, size}) => (
                <FontAwesome name="search" size={size} color={color} />
            )
        }}/>

        <Tab.Screen name='favourite' 
        component={FavouriteScreen}
        options={{
            tabBarLabel:'Favorites',
            tabBarActiveTintColor:Colors.PRIMARY,
            tabBarIcon: ({color, size}) => (
                <FontAwesome name="heart" size={size} color={color} />
            )
        }}/>
        <Tab.Screen name='profile' 
        component={ProfileScreen}
        options={{
            tabBarLabel:'Profile',
            tabBarActiveTintColor:Colors.PRIMARY,
            tabBarIcon: ({color, size}) => (
                <FontAwesome name="user-circle" size={size} color={color} />
            )
        }}/>
    </Tab.Navigator>
  )
}