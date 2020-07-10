import React, {useEffect, useState, useRef} from 'react'
import {View, Button, Text, FlatList, TextInput, ScrollView} from 'react-native'

import * as db from 'api/database'
import {user} from 'util/storage'
import {useOnComment} from 'api/messaging'

const CommentInput = () => {
  const [text, setText] = useState()
  const el_input = useRef()

  const submitComment = () => {
    if (el_input.current && text && text.length > 0) {
      db.add.message(text, db.GeoPoint(0, 0)).catch(err => {
        console.error('message add error', err)
      })
      el_input.current.clear()
      el_input.current.blur()
    }
  }

  return (
    <View
      style={{
        flexDirection: 'row',
        alignContent: 'stretch',
      }}>
      <TextInput
        style={{
          flex: 1,
        }}
        ref={el_input}
        placeholder={'Post a comment...'}
        onChangeText={setText}
        multiline={true}
      />
      <Button title="send" onPress={submitComment} />
    </View>
  )
}

const Comment = ({value}) => (
  <View>
    <Text>{value}</Text>
  </View>
)

const CommentList = ({roomId}) => {
  const [msgList, setMsgList] = useState([])

  useEffect(() => {
    // get realtime messages
    const sub = roomId
      ? db.get.roomMessages(roomId).onSnapshot(qsnap => {
          setMsgList(qsnap.docs.map(d => ({...d.data(), key: d.id})))
        })
      : db.get
          .localMessages(db.GeoPoint(0, 0), user.getRadius())
          .onSnapshot(qsnap => {
            setMsgList(qsnap.docs.map(d => ({...d.data(), key: d.id})))
          })

    return sub
  })

  return (
    <View>
      <FlatList
        style={{
          borderColor: 'red',
          borderWidth: 1,
        }}
        data={msgList}
        renderItem={({item}) => <Comment value={item.value} roomId={roomId} />}
      />
      <CommentInput />
    </View>
  )
}

export default CommentList
