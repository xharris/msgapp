import React from 'react'
import {View, Button, TextInput} from 'react-native'

import {googleSignIn} from 'api/auth'

const EmailModal = ({navigation}) => (
  <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
    <TextInput style={{fontSize: 30}} placeholder={'Email'} />
    <TextInput style={{fontSize: 30}} placeholder={'Password'} />
    <Button onPress={() => navigation.goBack()} title="Log In" />
  </View>
)

const SignIn = ({navigation}) => {
  return (
    <View>
      <Button title="Email" />
      <Button title="Google" onPress={googleSignIn} />
    </View>
  )
}

export default SignIn
