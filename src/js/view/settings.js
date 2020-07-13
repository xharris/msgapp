import React, {useState, useEffect} from 'react'
import {View} from 'react-native'

import {InLabel, InSelect} from 'component/input'
import {user} from 'util/storage'
import {fromMiles} from 'util/units'
import {useFetch} from 'util/misc'

const Settings = () => {
  const [unit, fetchUnit] = useFetch(user.getUnits)
  const [radiusChoices, setRadiusChoices] = useState({})

  useEffect(() => {
    // use correct distance units
    // convert from miles to whatever
    if (unit) {
      setRadiusChoices({
        [`${fromMiles(1, unit)}${unit}`]: 0,
        [`${fromMiles(5, unit)}${unit}`]: 1,
        [`${fromMiles(10, unit)}${unit}`]: 2,
      })
      console.log('actually changed', unit)
    }
  }, [unit])

  return (
    <View>
      <InLabel label={'units'}>
        <InSelect
          choices={{
            mi: 'mi',
            km: 'km',
            ft: 'ft',
          }}
          onChange={r => {
            user.setRadius(r).then(() => fetchUnit())
            console.log('changed')
          }}
        />
      </InLabel>
      <InLabel label={'radius'}>
        <InSelect choices={radiusChoices} onChange={user.setUnits} />
      </InLabel>
    </View>
  )
}

export default Settings
