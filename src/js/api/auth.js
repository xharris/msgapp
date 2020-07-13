import React, {
  useEffect,
  useState,
  useReducer,
  useMemo,
  useContext,
  createContext,
} from 'react'
import auth from '@react-native-firebase/auth'
import {GoogleSignin} from '@react-native-community/google-signin'

import {user} from 'util/storage'

GoogleSignin.configure({
  webClientId: '',
})

// will throw an error if user already exists
export const signUpEmail = (email, password) =>
  auth().createUserWithEmailAndPassword(email, password)

export const signInEmail = (email, password) =>
  auth().signInWithEmailAndPassword(email, password)

export const signOut = () =>
  auth()
    .signOut()
    .catch(e => {})

export const useAuth = () => {
  const [user, setUser] = useState()

  useEffect(() => {
    const sub = auth().onAuthStateChanged(new_user => {
      setUser(new_user)
    })
    return sub
  }, [])

  return user
}

export const googleSignIn = async () => {
  // Get the users ID token
  const {idToken} = await GoogleSignin.signIn()
  // Create a Google credential with the token
  const googleCredential = auth.GoogleAuthProvider.credential(idToken)
  // Sign-in the user with the credential
  return auth().signInWithCredential(googleCredential)
}

export const getUID = () => auth().currentUser.uid

const AuthContext = createContext()
export const useAuthContext = () => useContext(AuthContext)
export const AuthContextGenerator = () => {
  const [state, dispatch] = useReducer(
    (prevState, action) => {
      switch (action.type) {
        case 'RESTORE_TOKEN':
          return {
            ...prevState,
            userToken: action.token,
            isLoading: false,
          }
        case 'SIGN_IN':
          return {
            ...prevState,
            isSignout: false,
            userToken: action.token,
          }
        case 'SIGN_OUT':
          return {
            ...prevState,
            isSignout: true,
            userToken: null,
          }
      }
    },
    {
      isLoading: true,
      isSignout: false,
      userToken: null,
    },
  )

  useEffect(() => {
    // Fetch the token from storage then navigate to our appropriate place
    const bootstrapAsync = async () => {
      user
        .getToken()
        .then(token => {
          // After restoring token, we may need to validate it in production apps

          // This will switch to the App screen or Auth screen and this loading
          // screen will be unmounted and thrown away.
          dispatch({type: 'RESTORE_TOKEN', token})
        })
        .catch(e => {
          // restoring token failed
        })
    }

    bootstrapAsync()
  }, [])

  const authContextValue = useMemo(
    () => ({
      signIn: async data => {
        // In a production app, we need to send some data (usually username, password) to server and get a token
        // We will also need to handle errors if sign in failed
        // After getting token, we need to persist the token using `AsyncStorage`
        // In the example, we'll use a dummy token

        dispatch({type: 'SIGN_IN', token: 'dummy-auth-token'})
      },
      signOut: () => dispatch({type: 'SIGN_OUT'}),
      signUp: async data => {
        // In a production app, we need to send user data to server and get a token
        // We will also need to handle errors if sign up failed
        // After getting token, we need to persist the token using `AsyncStorage`
        // In the example, we'll use a dummy token

        dispatch({type: 'SIGN_IN', token: 'dummy-auth-token'})
      },
    }),
    [],
  )

  return [AuthContext, authContextValue]
}
