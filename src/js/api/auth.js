import {useEffect, useState} from 'react'
import auth from '@react-native-firebase/auth'

export const useAuth = () => {
  const [user, setUser] = useState()
  auth().signInAnonymously()

  useEffect(() => {
    const sub = auth().onAuthStateChanged(new_user => {
      setUser(new_user)
    })
    return sub
  }, [])

  return user
}

export const getUID = () => auth().currentUser.uid
