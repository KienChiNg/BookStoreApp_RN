import React from 'react';
import {
  Text,
  StyleSheet,
  View,
  Dimensions,
  TouchableOpacity,
  Alert,
  Button,
  TextInput,
  Image,
} from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Colors from "../Const/Colors";
import Register from './Register';
import API from "../Const/Const"
import Loading from '../Loading/Loading'
import Toast from 'react-native-toast-message';

const { width, height } = Dimensions.get('window');
class LoginScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      data: [

      ],
      isLoading: false,
    };
  }
  saveData = async () => {
    try {
      await AsyncStorage.setItem('LibraryAppUserName', this.state.username)
      await AsyncStorage.setItem('LibraryAppPassword', this.state.password)
    } catch (e) {
      // error reading value
    }
  }
  getData = async (str) => {
    try {
      const value = await AsyncStorage.getItem("LibraryAppUserName")
      const value2 = await AsyncStorage.getItem("LibraryAppPassword")
      if (value !== null && value2 != null) {
        this.setState({
          username: value,
          password: value2
        })
      }
    } catch (e) {
      // error reading value
    }
  }
  componentDidMount = () => {
    this.getData();
    // if(this.props.isLogOut == true)
    //   this.showToast("Successful logout",'success')
    // this.getData('LibraryAsppPassword'); 
    // InitData();
  }
  api = async () => {
    this.setState({ isLoading: true })
    var options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: this.state.username,
        password: this.state.password
      }),
    };
    await fetch(`${API.API}/member/login`, options)
      .then(response => response.json())
      .then(async (response) => {
        if (response.code == 200) {
          // Alert.alert(response.description)
          API.sessionID = response.session;
          this.saveData();
          // this.showToast(`Successful login`, 'success')
          this.props.navigation.navigate('BottomTabScreen', { isLogin: true });
        }
        else {
          // Alert.alert(response.description)
          this.showToast(`Wrong account or password`, 'error')
        }
      });
    this.setState({ isLoading: false })
  }
  checklogin = () => {
    this.api();
  };
  showToast = (des, ty) => {
    Toast.show({
      type: ty,
      //   text1: 'Library',
      text1: des,
    });
  }
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.background}>
          <Image
            style={styles.imageback}
            source={require('../../assets/3532127.png')}
          />
          <Text style={styles.styletext}>Book Library</Text>
        </View>
        <View style={styles.styleinputtxt}>
          <TextInput
            style={styles.txtinput}
            onChangeText={username => this.setState({ username })}
            placeholder="Account"
            placeholderTextColor="#84878a"
            backgroundColor="#fff"
            value={this.state.username}
          />
          <TextInput
            style={styles.txtinput}
            secureTextEntry={true}
            value={this.state.password}
            onChangeText={password => this.setState({ password })}
            placeholder="Password"
            placeholderTextColor="#84878a"
            backgroundColor="#fff"
          />
        </View>
        <View style={{ ...styles.backgroundbt }}>
          <View style={{ alignItems: 'center' }}>
            <TouchableOpacity
              style={styles.stylebutton}
              //disabled={!this.state.username || !this.state.password}
              onPress={() => this.checklogin()}>
              <Text style={styles.txtnew}>LOG IN</Text>
            </TouchableOpacity>
          </View>

          <View
            style={{
              flexDirection: 'row',
              // justifyContent: 'str',
              // alignItems:"stretch",
              // width:width,
              // backgroundColor:"red",
              justifyContent:"center",
              alignItems:"center",
              margin: 10,
            }}>
            <Text style={{ color: '#000000' }}>Create a new account </Text>
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate('Register')}>
              <Text style={{ color: Colors.primary }}>here</Text>
            </TouchableOpacity>
          </View>
        </View>
        <Toast />
        <Loading isLoading={this.state.isLoading} />
      </View>
    );
  }
}
const Stack = createNativeStackNavigator();

function Login({navigation, route }) {
  // console.log(route.params?.isLogOut);
  // React.useEffect(() => {
  //   console.log("aloo",route.params);
  //   // const unsubscribe = navigation.addListener('focus', () => {
  //     if (route.params?.isLogOut != undefined)
  //       showToast("Successful logout")
  //   // });

  //   // return unsubscribe;
  // }, []);
  // React.useEffect(() => {
  //   console.log("aloo",route.params);
  //   const unsubscribe = navigation.addListener('focus', () => {
  //     if (route.params?.isLogOut != undefined)
  //       showToast("Successful logout")
  //   });

  //   // return unsubscribe;
  // }, [navigation]);
  const showToast = (des) => {
    Toast.show({
      type: 'success',
      //   text1: 'Library',
      text1: des,
    });
  }
  return (
    // <NavigationContainer>
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={Register} />
    </Stack.Navigator>
    // </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  imageback: {
    width: height * 0.15,
    height: height * 0.15,
  },
  background: {
    height: height * 0.35,
    alignItems: 'center',
    justifyContent: 'flex-end',
    backgroundColor: Colors.primary,
  },
  styletext: {
    fontFamily: 'cursive',
    fontSize: height * 0.04,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#fff',
  },
  styleinputtxt: {
    alignSelf: 'center',
    justifyContent: 'space-evenly',
    height: height * 0.2,
  },
  txtinput: {
    paddingLeft: width * 0.035,
    width: width * 0.5,
    borderRadius: 25,
    color: '#000000',
    borderColor: '#dcdcdc',
    borderWidth: 2,
  },
  backgroundbt: {
    height: height * 0.1,
    alignSelf: 'center',
    justifyContent: 'center',
    width: width,
  },
  stylebutton: {
    backgroundColor: Colors.primary,
    padding: height * 0.01,
    borderRadius: 7,
    width: width * 0.35,
    alignItems: 'center',
  },
  txtnew: {
    color: '#000000',
    color: 'white',
    fontWeight: 'bold',
    fontSize: height * 0.018,
  },
});

export default Login;
