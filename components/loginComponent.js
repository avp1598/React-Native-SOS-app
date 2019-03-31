import React, { Component } from 'react';
import { View, StyleSheet, Button,Text } from 'react-native';
import * as firebase from "firebase";
import t from 'tcomb-form-native';

if (!firebase.apps.length) {
    firebase.initializeApp({
        apiKey: "AIzaSyBVMXh1Y03uh59AMF2nI_qvJRnZlXQtSXg",
        authDomain: "test1-35925.firebaseapp.com",
        databaseURL: "https://test1-35925.firebaseio.com",
        projectId: "test1-35925",
        storageBucket: "test1-35925.appspot.com",
        messagingSenderId: "1085685151097"
      })
 }

const Form = t.form.Form;

const User = t.struct({
  email: t.String,
  password: t.String
});

const formStyles = {
  ...Form.stylesheet,
  formGroup: {
    normal: {
      marginBottom: 10
    },
  },
  controlLabel: {
    normal: {
      color: 'blue',
      fontSize: 18,
      marginBottom: 7,
      fontWeight: '600'
    },
    // the style applied when a validation error occours
    error: {
      color: 'red',
      fontSize: 18,
      marginBottom: 7,
      fontWeight: '600'
    }
  }
}

const options = {
  fields: {
    email: {
      error: 'Enter valid email id'
    },
    password: {
      error: 'Enter valid password',
      password: true,
      secureTextEntry: true
    },
  },
  stylesheet: formStyles,
};
export default class Login extends Component {

    async login(email, pass) {
        const {navigate} = this.props.navigation;
        try {
            await firebase.auth()
                .signInWithEmailAndPassword(email, pass);
    
            alert("Logged In!");
            navigate('Profile',{name:email});
    
            // Navigate to the Home page
    
        } catch (error) {
            alert(error.toString())
        }
    
    }

  handleSubmit = () => {
    const value = this._form.getValue();
    const mail= value.email;
    const pass= value.password;
    this.login(mail,pass);
  }
  
  render() {
    const {navigate} = this.props.navigation;
    return (
      <View style={styles.container}>
        <Form 
          ref={c => this._form = c}
          type={User} 
          options={options}
        />
        <Button
          title="Login!"
          onPress={this.handleSubmit}
        />
        <Text>Not registered yet? Click on sign up below to register</Text>
        <Button
          title="Sign up!"
          onPress={() => navigate('Register')}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    marginTop: 50,
    padding: 20,
    backgroundColor: '#ffffff',
  },
});