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
import Colors from "../Const/Colors";
import API from "../Const/Const"
import Login from './Login';
const {width, height} = Dimensions.get('window');
class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name:'',
      email:'',
      username: '',
      password: '',
    };
  }
  addapi = async() => {
    var options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        fullname: this.state.name,
        email: this.state.email,
        username: this.state.username,
        password: this.state.password,
      }),
    };
    await fetch(`${API.API}/member/register`, options)
      .then(response => response.json())
      .then(response => {
        if(response.code == 200){
          Alert.alert(response.description,"Đăng nhập để vào thư viện",
          [{
            text: 'Đồng ý',
            onPress: ()=> this.props.navigation.goBack()
          }] )
        }
        else{
          Alert.alert(response.description)
        }
      });
  }
  addment = () => {
    this.addapi();
  };
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.background}>
          <Image
            style={styles.imageback}
            source={require('../../assets/3532127.png')}
          />
          <Text style={styles.styletext}>Create new account</Text>
        </View>
        <View style={styles.styleinputtxt}>
          <TextInput
            style={styles.txtinput}
            onChangeText={name => this.setState({name})}
            placeholder="Fullname"
            placeholderTextColor="#84878a"
            backgroundColor="#fff"
          />
          <TextInput
            style={styles.txtinput}
            onChangeText={email => this.setState({email})}
            placeholder="Email"
            placeholderTextColor="#84878a"
            backgroundColor="#fff"
          />
          <TextInput
            style={styles.txtinput}
            onChangeText={username => this.setState({username})}
            placeholder="Account"
            placeholderTextColor="#84878a"
            backgroundColor="#fff"
          />
          <TextInput
            style={styles.txtinput}
            onChangeText={password => this.setState({password})}
            placeholder="Password"
            placeholderTextColor="#84878a"
            backgroundColor="#fff"
            secureTextEntry={true}
          />
        </View>
        <View style={{...styles.backgroundbt}}>
          <View style={{alignItems: 'center'}}>
            <TouchableOpacity
              style={styles.stylebutton}
              onPress={() => this.addment()}>
              <Text
                style={styles.txtnew}>
                Register
              </Text>
            </TouchableOpacity>
          </View>

          <View
            style={{
              flexDirection:"row",
              justifyContent:"center",
              alignItems:"center",
              margin: 10,
            }}>
            <Text style={{color: '#000000'}}>Already have an account, </Text>
            <TouchableOpacity
              onPress={ () => this.props.navigation.goBack()}>
              <Text style={{color: Colors.primary}}>Login</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  imageback: {
    width: height * 0.1,
    height: height * 0.1,
  },
  background: {
    height: height * 0.25,
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
    height: height * 0.35,
  },
  txtinput: {
    paddingLeft:width*0.035,
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
    width: width
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
    fontSize: height*0.018
  },
});

export default Register;
