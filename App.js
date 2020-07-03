import React from 'react'
import {SafeAreaView, StatusBar} from 'react-native'

import CommentList from 'views/commentlist'
import {useAuth} from 'api/auth'

const App: () => React$Node = () => {
  const user = useAuth()

  return (
    <>
      <StatusBar hidden={true} />
      <SafeAreaView>{user ? <CommentList /> : null}</SafeAreaView>
    </>
  )
}

export default App
