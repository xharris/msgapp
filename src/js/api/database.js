import {useEffect} from 'react'
import firestore from '@react-native-firebase/firestore'

import {getUID} from 'api/auth'
console.log(firestore.Timestamp.now())

const now = () => firestore.Timestamp.now().seconds()

// reference collection in database
export const ref = {
  get messages() {
    return firestore().collection('messages')
  },
}

// add document to database
export const add = {
  message: (value, lat, lng) =>
    ref.messages.doc(getUID()).set({
      value,
      lat,
      lng,
      date_modified: now(),
    }),
}

// get database data
export const get = {
  /**
   * Uses variation of great-circle distance formula:
   * `latitude` BETWEEN `orig_latitude` - (`radius` / 69) AND `orig_latitude` + (`radius` / 69)
   * `longitude` BETWEEN `orig_longitude` - (`radius` / (69 * COS(RADIANS(`orig_latitude`)))) AND `orig_longitude` + (`radius` / (69 * COS(RADIANS(`orig_latitude`))))
   */
  localMessages: (latlng, radius) => {
    radius /= 1.609344 // km to miles
    return ref.messages
      .where('lat', '>', latlng.lat - radius / 69)
      .where('lat', '<', latlng.lat + radius / 69)
      .where(
        'lng',
        '>',
        latlng.lng - radius / (69 * Math.cos((latlng.lng * Math.PI) / 180)),
      )
      .where(
        'lng',
        '<',
        latlng.lng + radius / (69 * Math.cos((latlng.lng * Math.PI) / 180)),
      )
      .orderBy('date_modified', 'desc')
      .get()
      .then(qsnap => qsnap.docs.map(doc => doc.data()))
  },
}
