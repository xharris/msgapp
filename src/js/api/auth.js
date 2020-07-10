import {useEffect, useState} from 'react'
import auth from '@react-native-firebase/auth'

export const useAuth = () => {
  const [user, setUser] = useState()
  // auth().signInAnonymously()
  auth()
    .createUserWithEmailAndPassword('xhhalt@gmail.com', 'asdfasdf')
    .catch(e => {
      if (e.code === 'auth/email-already-in-use') {
        auth().signInWithEmailAndPassword('xhhalt@gmail.com', 'asdfasdf')
      }
    })

  useEffect(() => {
    const sub = auth().onAuthStateChanged(new_user => {
      setUser(new_user)
    })
    return sub
  }, [])

  return user
}

export const getUID = () => auth().currentUser.uid
