import React, {useState} from 'react'
import {Text, View} from 'react-native'
import {Picker} from '@react-native-community/picker'

export const InLabel = ({label, children}) => (
  <View>{[label && <Text>{label}</Text>, ...children]}</View>
)

export const InSelect = ({choices, initial, onChange}) => {
  const [selected, setSelected] = useState(initial || Object.values(choices)[0])

  return (
    <Picker
      selectedValue={selected}
      onValueChange={v => {
        setSelected(v)
        onChange(v)
      }}>
      {Object.keys(choices).map(k => (
        <Picker.Item label={k} value={choices[k]} />
      ))}
    </Picker>
  )
}
