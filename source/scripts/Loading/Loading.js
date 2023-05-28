import React from 'react';
import { SafeAreaView, StyleSheet, View, Text, Image, ScrollView, TouchableOpacity, FlatList, Dimensions, TextInput, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import AnimatedLottieView from 'lottie-react-native';
import Colors from '../Const/Colors';



const { width, height } = Dimensions.get("window")

const Loading = (props) => {
    return (
        <SafeAreaView style={{ position: "absolute" }}>
            {props.isLoading && (
                <View style={{ flex: 1, backgroundColor: Colors.white, opacity: 1, width: width, height: height, justifyContent: "center", alignItems: "center" }}>
                    {/* <View style ={{justifyContent:"center", alignItems:"center",width: 200, height: 200}}> */}
                        <View style={{ width: width, height: height/3 }}>
                            <AnimatedLottieView source={require('../../assets/91349-loading-text.json')} autoPlay loop />
                        </View>
                        <View style={{ width: width, height: height/3,top:-180 }}>
                            <AnimatedLottieView source={require('../../assets/77792-book.json')} autoPlay loop />
                        </View>
                    {/* </View> */}
                </View>)}
        </SafeAreaView>
    );
};

const style = StyleSheet.create({

});

export default Loading;