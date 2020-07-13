import AsyncStorage from '@react-native-community/async-storage'
import {fromMiles, toMiles} from 'util/units'

const defaults_store = {}
const setDefault = (key, defaults) => (defaults_store[key] = defaults)

const merge = async (key, data) => {
  try {
    await AsyncStorage.mergeItem(key, data)
  } catch (e) {
    console.error(e)
  }
}

const get = async (key, subkey) => {
  try {
    var ret = await AsyncStorage.getItem(key)
    if (ret != null) {
      return subkey && typeof key === 'object' ? ret[subkey] : ret
    }
  } catch (e) {}
  return subkey ? defaults_store[key][subkey] : defaults_store[key]
}

const set = async (key, data) => {
  try {
    return await AsyncStorage.setItem(key, data)
  } catch (e) {
    console.error(e)
  }
}

setDefault('user', {
  radius: 1,
  units: 'mi',
})

export const user = {
  get: async () => await get('user'),
  getToken: async () => await get('user-private', 'token'),
  setToken: async t => await merge('user-private', {token: t}),
  // distance for viewing/sending messages converted to miles
  setRadius: async r => await merge('user', {radius: r}),
  // will always return in miles
  getRadius: async () => await get('user', 'radius'),
  // units: mi, km, ft
  setUnits: async u => await merge('user', {units: u}),
  getUnits: async () => await get('user', 'units'),
}
