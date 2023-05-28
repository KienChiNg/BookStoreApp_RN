import React from "react";
import { View, Text, ImageBackground, Dimensions, TouchableOpacity } from "react-native";
import img from "../../assets/pexels-anete-lusina-6353764.jpg"

const { width, height } = Dimensions.get("window")

const WelcomeScreen = () => {
    return (
        <View style={{flex:1, justifyContent:'center',alignItems:'center'}}>
            <Text>
                Coming soon
            </Text>
        </View>
    )
}

export default WelcomeScreen;

// import React from 'react';
// import { Dimensions, Image, View } from 'react-native';
// import { NavigationContainer } from '@react-navigation/native';
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import WelcomeScreen from './WelcomeScreen';
// import Test from './Test'
// import menu from '../assets/menu.png'
// import cart from '../assets/cart.png'
// import magnifyingGlass from '../assets/magnifyingglass.png'


// const Tab = createBottomTabNavigator();
// const { width, height } = Dimensions.get("window")

// function BottomNavigator() {
//     return (
//         <NavigationContainer>
//             <Tab.Navigator
//                 // initialRouteName="Home"
//                 // activeColor="darkviolet"
//                 // barStyle={{
//                 //     height: height * 0.08,
//                 //     tabBarLabel: false,
//                 //     backgroundColor:"white",
//                 //     position: "relative",
//                 //     // display: "none"
//                 //     zIndex: 50,
//                 // }}

//             >
//                 <Tab.Screen name="Home" component={WelcomeScreen}
//                     options={{
//                         tabBarIcon: ({ color }) => (
//                             <Image source={menu} style={{ width: width * 0.06, height: height * 0.03, tintColor: color}} />
//                             ),
//                         tabBarLabel: false,
//                         // tabBarBadge: true,
//                     }}
//                 />
//                 <Tab.Screen name="Search" component={Test}
//                     options={{
//                         tabBarIcon: ({ color }) => (
//                             <View
//                                 style={{
//                                     height: 50,
//                                     width: 50,
//                                     justifyContent: "center",
//                                     alignItems: "center",
//                                     backgroundColor: 'white',
//                                     borderColor: 'darkviolet',
//                                     borderWidth: 2,
//                                     borderRadius: 30,
//                                     top: -10,
//                                     elevation: 5,
//                                 }}
//                             >
//                                 <Image source={magnifyingGlass} style={{ width: width * 0.07, height: height * 0.03, tintColor: color }} />
//                             </View>
//                             ),
//                         tabBarLabel: false,
//                     }}
//                 />
//                 <Tab.Screen name="Cart" component={Test}
//                     options={{
//                         tabBarIcon: ({ color }) => (
//                             <Image source={cart} style={{ width: width * 0.07, height: height * 0.03, tintColor: color }} />
//                             ),
//                         tabBarLabel: false,
//                     }}
//                 />
//             </Tab.Navigator>
//         </NavigationContainer>
//     );
// }
// export default BottomNavigator;