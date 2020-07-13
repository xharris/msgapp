import 'react-native-gesture-handler'
import React, {useEffect} from 'react'
import {NavigationContainer} from '@react-navigation/native'
import {createStackNavigator} from '@react-navigation/stack'
import {createDrawerNavigator} from '@react-navigation/drawer'
import {StatusBar} from 'react-native'

import SignIn from 'view/signin'
import SignUp from 'view/signup'
import Room from 'view/room'
import Settings from 'view/settings'
import {useAuth, signInEmail, signOut} from 'api/auth'

const Drawer = createDrawerNavigator()

const App = () => {
  const user = useAuth()
  useEffect(() => {
    //signOut()
    signInEmail('xhhalt@gmail.com', 'asdfasdf')
  })
  const header_options = title => ({
    title: title || 'Untitled View',
    headerStyle: {
      backgroundColor: '#f4511e',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
    },
  })

  useEffect(() => {
    console.log(user)
  }, [user])

  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="SignIn">
        <Drawer.Screen name="SignIn" component={SignIn} />
        <Drawer.Screen
          name="Room"
          component={Room}
          options={header_options('Room')}
        />
        <Drawer.Screen
          name="Settings"
          component={Settings}
          options={header_options('Settings')}
        />
      </Drawer.Navigator>
    </NavigationContainer>
  )
}

export default App
