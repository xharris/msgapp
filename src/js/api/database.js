import firestore from '@react-native-firebase/firestore'
import * as geofirestore from 'geofirestore'

import {getUID} from 'api/auth'

const now = () => firestore.Timestamp.now()

export const GeoPoint = (...args) => new firestore.GeoPoint(...args)

const fstore = firestore()
const geofstore = geofirestore.initializeApp(fstore)

// reference collection in database
export const ref = {
  get messages() {
    return geofstore.collection('messages')
  },
  get checkIns() {
    return geofstore.collection('checkIns')
  },
}

// add document to database
export const add = {
  message: (value, geopoint) =>
    ref.messages.doc(getUID()).set({
      value,
      coordinates: geopoint,
      date_modified: now(),
    }),
  // room_id: optional
  checkIn: (user_id, geopoint, room_id) =>
    ref.checkIns.doc(user_id).set({
      coordinates: geopoint,
      room_id: room_id || -1,
      date_modified: now(),
    }),
}

// get database data
export const get = {
  // returns [ { id:user_id, data:{ <add.message> } } ]
  localMessages: (geopoint, radius) =>
    ref.messages.near({center: geopoint, radius}),
  roomMessages: room_id => ref.messages.where('room_id', '==', room_id),
  localUsers: (geopoint, radius) =>
    ref.checkIns.near({center: geopoint, radius}),
  roomUsers: room_id => ref.checkIns.where('room_id', '==', room_id),
}
