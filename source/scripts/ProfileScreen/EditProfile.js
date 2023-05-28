import React, { useState } from 'react';
import { View, Text, Image, TextInput, StyleSheet, TouchableOpacity, SafeAreaView, Dimensions, Alert } from 'react-native';
import Colors from "../Const/Colors";
import Icon, { Icons } from "../Const/Icons";
import imgHeader from "../../assets/user.png"
// import categories from "./Categories";
import bookData2 from "../FakeDB_Test_CommingSoon/FakeDB";
import API from "../Const/Const"
import Loading from "../Loading/Loading";
import ImageCropPicker from 'react-native-image-crop-picker';
import Toast from 'react-native-toast-message';

const { width, height } = Dimensions.get("window")

const EditProfileView = (props) => {
    const profile = {
        // name: 'Jane Doe',
        // email: 'jane.doe@example.com',
        // bio: 'Software engineer and cat lover',
        // avatar: 'https://example.com/jane-doe-avatar.png',
    }

    // const [profileData, setProfileData] = React.useState({});
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [bio, setBio] = useState(profile.bio);
    const [avatar, setAvatar] = useState(profile.avatar);
    const [isLoading, setLoading] = React.useState(false)
    const [memId, setMemId] = React.useState("");


    React.useEffect(() => {
        (async () => {
            InitData();
        })();
    }, []);

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
                    //  setProfileData(response.result.member);
                    let profile = response.result.member;
                    setName(profile.mem_fullname)
                    setEmail(profile.mem_email)
                    setAvatar(profile.mem_avatar)
                    setUsername(profile.mem_username)
                    setMemId(profile.mem_id)
                }
                else {
                }
            });
        setLoading(false)
        // setProfileData(bookData2.profile.result.member);
    }
    const showToast = (des) => {
        Toast.show({
            type: 'success',
            //   text1: 'Library',
            text1: des,
        });
    }
    const OpenLib = async () => {
        await ImageCropPicker.openPicker({
            width: 300,
            height: 400,
            cropping: true,
            includeBase64: true,
        }).then(image => {
            setAvatar(image.data)
        });
    }
    const handleSubmit = async () => {
        setLoading(true)
        var options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                session: API.sessionID,
                member: {
                    mem_username: username,
                    mem_avatar: avatar,
                    mem_id: memId,
                    // mem_group: "admin",
                    mem_email: email,
                    mem_fullname: name
                }
            })
        }
        await fetch(`${API.API}/member/update_profile`, options)
            .then((response) => response.json())
            .then(response => {
                console.log(response);
                if (response.code == 200) {
                    //    Alert.alert("Thay đổi thành công")
                    showToast("Save successfully")
                    console.log("thanhcong");
                }
                else {
                    console.log("error");
                }
            });
        setLoading(false)
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.root}>
                <TouchableOpacity onPress={props.navigation.goBack}>
                    <Icon type={Icons.Feather} name={'chevron-left'} color={Colors.black} />
                </TouchableOpacity>
                <Text style={{ fontSize: 20, fontWeight: 'bold', color: Colors.black }}>Edit Account</Text>
            </View>
            <View style={{ justifyContent: "center", alignItems: "center" }}>
                <View style={styles.avatarContainer}>
                    <Image
                        style={styles.avatar}
                        source={avatar ? { uri: `data:image/jpeg;base64,${avatar}` } : imgHeader}
                    />
                    <TouchableOpacity style={styles.changeAvatarButton} onPress={() => { OpenLib() }}>
                        <Text style={styles.changeAvatarButtonText}>Change Avatar</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.form}>
                    <Text style={styles.label}>Name</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Enter Name"
                        value={name}
                        onChangeText={setName}
                    />
                    <Text style={styles.label}>Email</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Enter Email"
                        value={email}
                        onChangeText={setEmail}
                    />
                    <Text style={styles.label}>Username</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Enter Bio"
                        value={username}
                        onChangeText={setUsername}
                    />
                    <TouchableOpacity style={styles.button} onPress={() => handleSubmit()}>
                        <Text style={styles.buttonText}>Submit</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <Toast />
            <Loading isLoading={isLoading} />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.white
        // alignItems: 'center',
        // justifyContent: 'center',
    },
    root: {
        paddingVertical: 20,
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: 20,
    },
    header: {
        marginTop: height * 0.03,
        flexDirection: 'row',
        justifyContent: 'space-around',
        paddingHorizontal: width * 0.04,
    },
    form: {
        width: '80%',
    },
    label: {
        marginTop: 20,
        fontWeight: "bold",
        marginBottom: 10,
        color: Colors.black
    },
    input: {
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 5,
        padding: 10,
        fontSize: 15,
        borderRadius: 24,
        paddingLeft: 20,
        fontWeight: "bold",
    },
    button: {
        marginTop: 40,
        marginHorizontal: 60,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: Colors.primary,
        paddingVertical: 15,
        borderRadius: 50,
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: "bold",
    },
    avatarContainer: {
        marginTop: 20,
        alignItems: 'center',
    },
    avatar: {
        width: 100,
        height: 100,
        borderRadius: 50,
    },
    changeAvatarButton: {
        marginTop: 10,
    },
    changeAvatarButtonText: {
        color: Colors.primary,
        fontSize: 18,
        fontWeight: "bold"
    },
});

export default EditProfileView;
