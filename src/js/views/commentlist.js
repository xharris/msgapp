import React, {useEffect, useState, useRef} from 'react'

import {View, Button, Text, TextInput, ScrollView} from 'react-native'

import * as db from 'api/database'

const CommentInput = () => {
  const [text, setText] = useState()
  const el_input = useRef()

  const submitComment = () => {
    if (el_input.current && text && text.length > 0) {
      db.add
        .message(text, 0, 0)
        .then(doc => {
          console.log('message added', doc)
        })
        .catch(err => {
          console.error('message add error', err)
        })
      el_input.current.clear()
      el_input.current.blur()
    }
  }

  return (
    <View
      style={{
        width: '100%',
        flexDirection: 'row',
        alignContent: 'stretch',
      }}>
      <TextInput
        ref={el_input}
        placeholder={'Post a comment...'}
        onChangeText={setText}
        multiline={true}
      />
      <Button
        title="send"
        onPress={submitComment}
        style={{
          flexShrink: 0,
        }}
      />
    </View>
  )
}

const CommentList = () => {
  db.get.localMessages({lat: 0, lng: 0}, 10).then(data => {
    console.log(data)
  })

  return (
    <View>
      <ScrollView>
        <Text>comments</Text>
      </ScrollView>
      <CommentInput />
    </View>
  )
}

export default CommentList
