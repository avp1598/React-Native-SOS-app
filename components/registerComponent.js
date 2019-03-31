import React, { Component } from 'react';
import { View, StyleSheet, Button } from 'react-native';
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
  username: t.maybe(t.String),
  password: t.String,
  terms: t.Boolean
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
      error: 'Without an email address how are you going to reset your password when you forget it?'
    },
    password: {
      error: 'Choose something you use on a dozen other sites or something you won\'t remember',
      password: true,
      secureTextEntry: true
    },
    terms: {
      label: 'Agree to Terms',
    },
  },
  stylesheet: formStyles,
};
export default class Register extends Component {


  async signup(email, pass) {
    
    try {
        await firebase.auth()
            .createUserWithEmailAndPassword(email, pass);

        console.log("Account created");

        // Navigate to the Home page, the user is auto logged in

    } catch (error) {
        alert(error.toString()," Please enter a valid email address")
    }
  }

  handleSubmit = () => {
    const value = this._form.getValue();
    const mail= value.email;
    const pass= value.password;
    this.signup(mail,pass);

  }
  
  render() {
    return (
      <View style={styles.container}>
        <Form 
          ref={c => this._form = c}
          type={User} 
          options={options}
        />
        <Button
          title="Sign Up!"
          onPress={this.handleSubmit}
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
