import React, {useState, useEffect} from 'react'
import {View} from 'react-native'

import {InLabel, InSelect} from 'component/input'
import {user} from 'util/storage'
import {fromMiles} from 'util/units'

const Settings = () => {
  const [settings, setSettings] = useState()
  const [radiusChoices, setRadiusChoices] = useState({})

  useEffect(() => {
    // use correct distance units
    user.getUnits().then(u => {
      // convert from miles to whatever
      setRadiusChoices({
        [`${fromMiles(1, u)}${u}`]: 0,
        [`${fromMiles(5, u)}${u}`]: 1,
        [`${fromMiles(10, u)}${u}`]: 2,
      })
    })
  }, [settings])

  return (
    <View>
      <InLabel label={'units'}>
        <InSelect
          choices={{
            mi: 'mi',
            km: 'km',
            ft: 'ft',
          }}
          onChange={user.setRadius}
        />
      </InLabel>
      <InLabel label={'radius'}>
        <InSelect choices={radiusChoices} onChange={user.setUnits} />
      </InLabel>
    </View>
  )
}

export default Settings
