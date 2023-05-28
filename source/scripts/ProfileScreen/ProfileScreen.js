import React from "react";
import { SafeAreaView, StyleSheet, View, Text, Image, FlatList, TouchableOpacity, Dimensions } from 'react-native';
import Colors from "../Const/Colors";
import Icon, { Icons } from "../Const/Icons";
import imgHeader from "../../assets/user.png"
import AsyncStorage from '@react-native-async-storage/async-storage';
import bookData2 from "../FakeDB_Test_CommingSoon/FakeDB";
import API from "../Const/Const"
import Loading from "../Loading/Loading";
import Toast from 'react-native-toast-message';


const { width, height } = Dimensions.get("window")

const ProfileScreen = ({ navigation }) => {
    const [profileData, setProfileData] = React.useState({});
    const [isLoading, setLoading] = React.useState(false)
    React.useEffect(() => {
        (async () => {
            InitData();
        })();
    }, []);
    React.useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            InitData();
        });

        return unsubscribe;
    }, [navigation]);
    const setData = async () => {
        try {
            await AsyncStorage.setItem('LibraryAppLogin', 0)
        } catch (e) {
            // error reading value
        }
    }

    const InitData = async () => {
        setLoading(true)
        var options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                session: API.sessionID,
            })
        }
        await fetch(`${API.API}/member/profile`, options)
            .then((response) => response.json())
            .then(response => {
                if (response.code == 200) {
                    setProfileData(response.result.member);
                }
                else {
                }
            });
        setLoading(false)
        // setProfileData(bookData2.profile.result.member);
    }

    const Signout = async () => {
        var options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                session: API.sessionID,
            })
        }
        await fetch(`${API.API}/member/logout`, options)
            .then((response) => response.json())
            .then(response => {
                if (response.code == 200) {
                    // showToast("Log out successfully")
                    navigation.navigate('HomeScreen', { isLogOut: true })
                    // setData();
                }
                else {
                }
            });
        // Chuyển trang => Login
    }
    const showToast = (des) => {
        Toast.show({
            type: 'success',
            //   text1: 'Library',
            text1: des,
        });
    }

    return (
        // console.log(profileData.mem_avatar),
        <SafeAreaView style={{ backgroundColor: Colors.white, flex: 1 }}>
            <View style={styles.root}>
                <TouchableOpacity onPress={navigation.goBack}>
                    <Icon type={Icons.Feather} name={'chevron-left'} color={Colors.black} />
                </TouchableOpacity>
                <Text style={{ fontSize: 20, fontWeight: 'bold', color: Colors.black }}>Account</Text>
            </View>
            <View style={styles.header}>
                <View style={{flex:1,justifyContent:"center",alignItems:"flex-start"}}>
                    <Image source={profileData.mem_avatar ? { uri: `data:image/jpeg;base64,${profileData.mem_avatar}` } : imgHeader} style={{ height: width * 0.25, width: width * 0.25, borderRadius: 100 }} />
                </View>
                <View style={{ justifyContent: 'center',alignItems:"flex-start" }}>
                    <View style={{ flexDirection: 'row'}} >
                        {/* <Text style={{ fontSize: width * 0.06 }} >Hello,</Text> */}
                        <Text style={{ fontSize: width * 0.06, fontWeight: 'bold', color: Colors.black }} numberOfLines={1}>{profileData.mem_fullname}</Text>
                    </View>
                    <View style={{}}>
                        <Text style={{ marginTop: height * 0.006, fontSize: width * 0.05, color: Colors.black }}>
                            What do you want today
                        </Text>
                    </View>
                </View>
            </View>
            <View style={{ paddingBottom: 80, paddingTop: 40 }}>
                <TouchableOpacity activeOpacity={0.6} style={styles.feature}
                    onPress={() => navigation.navigate('EditProfileScreen', { data: profileData })}
                >
                    {/* <Image source={item.image} style={{ height: 80, width: 80 }} /> */}
                    <View
                        style={{
                            height: 60,
                            width: 100,
                            marginHorizontal: 10,
                            alignItems: 'center',
                            flex: 1,
                            flexDirection: 'row',
                            justifyContent: 'space-between'
                        }}>
                        <Text style={{ fontWeight: 'bold', fontSize: 16, color: Colors.black }}>Edit Profile</Text>
                        {/* <View style={{ backgroundColor: 'red' }}> */}
                        <Icon type={Icons.Feather} name={'chevron-right'} color={Colors.line} />
                        {/* </View> */}
                    </View>
                </TouchableOpacity>
                <TouchableOpacity activeOpacity={0.6} style={styles.feature}
                    onPress={() => navigation.navigate('PurchaseHistoryScreen')}>
                    {/* <Image source={item.image} style={{ height: 80, width: 80 }} /> */}
                    <View
                        style={{
                            height: 60,
                            width: 100,
                            marginHorizontal: 10,
                            alignItems: 'center',
                            flex: 1,
                            flexDirection: 'row',
                            justifyContent: 'space-between'
                        }}>
                        <Text style={{ fontWeight: 'bold', fontSize: 16, color: Colors.black }}>Purchase History</Text>
                        <Icon type={Icons.Feather} name={'chevron-right'} color={Colors.line} />
                    </View>
                </TouchableOpacity>
                <TouchableOpacity activeOpacity={0.6} style={styles.feature}
                    onPress={() => navigation.navigate('HistoryTransactionScreen')}>
                    {/* <Image source={item.image} style={{ height: 80, width: 80 }} /> */}
                    <View
                        style={{
                            height: 60,
                            width: 100,
                            marginHorizontal: 10,
                            alignItems: 'center',
                            flex: 1,
                            flexDirection: 'row',
                            justifyContent: 'space-between'
                        }}>
                        <Text style={{ fontWeight: 'bold', fontSize: 16, color: Colors.black }}>Transaction History </Text>
                        <Icon type={Icons.Feather} name={'chevron-right'} color={Colors.line} />
                    </View>
                </TouchableOpacity>
                <TouchableOpacity activeOpacity={0.6} style={[styles.feature, { backgroundColor: 'red' }]}
                    onPress={() => Signout()}
                >
                    {/* <Image source={item.image} style={{ height: 80, width: 80 }} /> */}
                    <View
                        style={{
                            height: 60,
                            width: 100,
                            marginHorizontal: 10,
                            alignItems: 'center',
                            flex: 1,
                            flexDirection: 'row',
                            justifyContent: 'space-between'
                        }}>
                        <Text style={{ fontWeight: 'bold', fontSize: 16, color: Colors.white }}>Sign Out</Text>
                        <Icon type={Icons.Feather} name={'log-out'} color={Colors.white} />
                    </View>
                </TouchableOpacity>
            </View>
            <Toast />
            <Loading isLoading={isLoading} />
        </SafeAreaView>
    );
};
const styles = StyleSheet.create({
    root: {
        paddingVertical: 20,
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: 20,
    },
    header: {
        marginTop: height * 0.03,
        flexDirection: 'row',
        width: width,
        justifyContent: "space-between",
        padding: 20
        // paddingHorizontal: width * 0.08,
    },
    feature: {
        height: 60,
        elevation: 15,
        borderRadius: 10,
        backgroundColor: Colors.white,
        marginVertical: 10,
        marginHorizontal: 20,
        paddingHorizontal: 10,
        flexDirection: 'row',
        alignItems: 'center',
    },
});

export default ProfileScreen