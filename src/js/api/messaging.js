import {useEffect, useState} from 'react'
import messaging, {AuthorizationStatus} from '@react-native-firebase/messaging'

export const requestPerm = async () => {
  const authStatus = await messaging().requestPermission()
  const enabled =
    authStatus === AuthorizationStatus.AUTHORIZED ||
    AuthorizationStatus.PROVISIONAL
  if (enabled) console.log(`Permission status: ${authStatus}`)
}

export const useOnComment = fn => {
  useEffect(() => {
    const sub = messaging().onMessage(fn)
    return sub
  }, [fn])
}
