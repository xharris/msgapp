import 'react-native-gesture-handler'
import React from 'react'
import {NavigationContainer} from '@react-navigation/native'
import {createStackNavigator} from '@react-navigation/stack'
import {SafeAreaView, StatusBar} from 'react-native'

import Room from 'view/room'
import Settings from 'view/settings'
import {useAuth} from 'api/auth'

const Stack = createStackNavigator()

const App = () => {
  const user = useAuth()

  return (
    <NavigationContainer>
      <StatusBar hidden={true} />
      <SafeAreaView>
        <Stack.Navigator>
          <Stack.Screen name="Room" component={Room} />
          <Stack.Screen name="Settings" component={Settings} />
        </Stack.Navigator>
      </SafeAreaView>
    </NavigationContainer>
  )
}

export default App
