import { useSocket } from '../hooks/useSocket'
import React, { useEffect, useState } from 'react'
import moment from 'moment'
import { useRouter } from 'next/router'
import { IdCopyBtn } from './id-copy'
import Modal from './modal'
import { CreateChatModal } from './create-chat-modal'

const HomePage = props => {
  const router = useRouter()
  const socket = useSocket(props.token, props.setUser)

  const [modalVisible, setModalVisible] = useState(false)
  const [createChatModalVisible, setCreateChatModalVisible] = useState(false)

  const [messageText, setMessageText] = useState('')
  const changeTextMessage = e => setMessageText(e.target.value)

  const closeModal = () => {
    setModalVisible(false)
  }

  const openModal = () => {
    console.log('click to modal visible')
    setModalVisible(true)
  }

  const openCreateChat = () => {
    setCreateChatModalVisible(true)
  }
  const closeCreateChat = () => {
    setCreateChatModalVisible(false)
  }

  const logout = () => {
    props.logout()
    router.push('/')
    socket.disconnect()
  }

  useEffect(() => {
    socket.connectToSocket()
  }, [])

  return (
    <div className='container' style={{ height: '100vh' }}>
      <div className='fixed-top' style={{ width: '6%' }}>
        <button className='btn btn-dark' onClick={logout}>
          Logout
        </button>
      </div>
      <div className='row' style={{ height: '100%' }}>
        <div
          className='col-3 bg-info position-relative'
          style={{ height: '100%' }}
        >
          <button
            className='btn btn-light mt-2 '
            style={{
              fontWeight: 'bold',
              margin: '0 auto',
              display: 'block',
              width: '100%',
            }}
            onClick={openModal}
          >
            Add new contact
          </button>
          <button
            className='btn btn-light mt-2 '
            style={{
              fontWeight: 'bold',
              margin: '0 auto',
              display: 'block',
              width: '100%',
            }}
            onClick={openCreateChat}
          >
            Create chat
          </button>
          <Modal
            visible={modalVisible}
            close={closeModal}
            addContact={socket.addNewContact}
          />
          <CreateChatModal
            visible={createChatModalVisible}
            close={closeCreateChat}
            contactList={props.user?.contacts}
            onCreateRoom={socket.createNewChat}
          />
          <div className='mt-2'>
            <ul className='list-group list-group-flush'>
              {socket.rooms.map(room => (
                <li
                  className='list-group-item'
                  key={room._id}
                  onClick={() => socket.selectChat(room._id)}
                >
                  {room.name}
                </li>
              ))}
            </ul>
          </div>
          <IdCopyBtn id={props.user?._id} />
        </div>
        <div
          className='col-9 bg-secondary'
          style={{ height: '100%', position: 'relative' }}
        >
          {socket.selectedChat ? (
            <div>
              {socket.messages.map(message => {
                const isMyMessage = message.userId === props.user?._id
                const user = props.user?.contacts.find(
                  el => el.userId === message.userId,
                )
                const name = isMyMessage ? 'Me' : user?.nickname || 'unknown'
                const time = moment(message.timeSent).format('DD MMM HH:mm:ss')
                return (
                  <div
                    className='d-flex flex-column mt-3 card'
                    key={message._id}
                  >
                    <div className='d-flex flex-row justify-content-between'>
                      <span>{name}</span>
                      <span> {time}</span>
                    </div>
                    <span>{message.content}</span>
                  </div>
                )
              })}
              <div
                className='row '
                style={{
                  position: 'absolute',
                  bottom: 0,
                  flexDirection: 'column',
                  margin: 0,
                  left: 0,
                  right: 0,
                  width: '100%',
                }}
              >
                <input
                  className='form-control col-auto'
                  value={messageText}
                  onChange={changeTextMessage}
                />
                <button
                  className='btn btn-primary col-auto'
                  onClick={() => {
                    socket.sendMessage(messageText)
                    setMessageText('')
                  }}
                >
                  Send
                </button>
              </div>
            </div>
          ) : (
            <div className='mt-5'>
              <h2
                className='align-middle'
                style={{ textAlign: 'center', color: 'white' }}
              >
                Please Select Chat
              </h2>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
export default HomePage
