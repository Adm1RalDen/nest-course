import React, { useEffect, useState } from 'react'
import Select from 'react-select'
import { Button, Input } from '@material-ui/core'

export const CreateChatModal = props => {
  const { visible, close, onCreateRoom } = props
  const [data, setData] = useState({ selectedUser: null, roomName: '' })

  const setByKey = key => data => setData(prev => ({ ...prev, [key]: data }))

  const generateOptions = contacts =>
    contacts.map(contact => ({
      value: contact.userId,
      label: contact.nickname,
    }))

  const onConfirmCreatingRoom = () => {
    onCreateRoom(data.selectedUser.value, data.roomName)
  }

  return (
    <div className='modal' style={{ display: visible ? 'block' : 'none' }}>
      <div className='modal-dialog'>
        <div className='modal-content'>
          <div className='modal-header'>Create chat</div>
          <div className='modal-body'>
            <Input
              value={data.roomName}
              onChange={e => setByKey('roomName')(e.target.value)}
            />
            <Select
              options={generateOptions(props.contactList || [])}
              // isMulti
              value={data.selectedUser}
              onChange={setByKey('selectedUser')}
            />
            <Button onClick={onConfirmCreatingRoom}>Confirm</Button>
          </div>
        </div>
      </div>
    </div>
  )
}
