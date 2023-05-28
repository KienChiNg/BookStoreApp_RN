import React from "react";
import { View, Text, ImageBackground, Dimensions, TouchableOpacity } from "react-native";
import img from "../assets/pexels-anete-lusina-6353764.jpg"

const { width, height } = Dimensions.get("window")

const WelcomeScreen = () => {
    return (
        <ImageBackground
            style={{ flex: 1 }}
            source={img}
        >
            <View style={{ flex: 1, backgroundColor: "black", opacity: 0.2 }} />
            <View
                style={{
                    position: "absolute",
                    width: "100%",
                    height: "100%",
                    zIndex: 2,
                    justifyContent: "flex-end",
                    paddingHorizontal: width * 0.08,
                    paddingBottom: height * 0.05,
                }}
            >
                <Text
                    style={{
                        color: "white",
                        fontWeight: "800",
                        fontSize: width * 0.15,
                        textTransform: "capitalize"
                    }}
                >
                    Discover {"\n"}new worlds
                </Text>
                <Text
                    style={{
                        color: "white",
                        fontWeight: "600",
                        fontSize: width * 0.05,
                    }}
                >
                    Dive into new worlds with our application, explore, study, follow the arrival of books.
                </Text>
                <TouchableOpacity
                    style={{
                        padding: width * 0.05,
                        backgroundColor: "white",
                        borderRadius: width * 0.05,
                        alignItems: "center",
                        marginTop: width * 0.08,
                    }}
                >
                    <Text
                        style={{
                            color: "black",
                            fontWeight: "800",
                            fontSize: width * 0.05,
                        }}
                    >Let's start!</Text>
                </TouchableOpacity>
            </View>
        </ImageBackground>
    )
}

export default WelcomeScreen;                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      