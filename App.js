import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './source/scripts/Login/Login'
import DetailsScreen from './source/scripts/HomeScreen/DetailScreen';
import BottomNavigator from './source/scripts/Navigator/BottomNavigator'
import EditProfileScreen from './source/scripts/ProfileScreen/EditProfile'
import DetailHistoryScreen from './source/scripts/ProfileScreen/DetailHistoryScreen'
import HistoryTransactionScreen from './source/scripts/ProfileScreen/HistoryTransaction';
import PurchaseHistoryScreen from './source/scripts/ProfileScreen/PurchaseHistoryScreen';
import HistoryDetailTransactionScreen from './source/scripts/ProfileScreen/HistoryDetailTransaction';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
      }}
      >
        <Stack.Screen name="HomeScreen" component={LoginScreen} />
        <Stack.Screen name="BottomTabScreen" component={BottomNavigator} />
        <Stack.Screen name="DetailScreen" component={DetailsScreen} />
        <Stack.Screen name="EditProfileScreen" component={EditProfileScreen} />
        <Stack.Screen name="PurchaseHistoryScreen" component={PurchaseHistoryScreen} />
        <Stack.Screen name="DetailHistoryScreen" component={DetailHistoryScreen} />
        <Stack.Screen name="HistoryTransactionScreen" component={HistoryTransactionScreen} />
        <Stack.Screen name="HistoryDetailTransactionScreen" component={HistoryDetailTransactionScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  )
  ;
}