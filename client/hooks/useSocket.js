import { useEffect, useRef, useState } from 'react';
import { io } from 'socket.io-client';
import { toast } from 'react-toastify';
import { URL } from 'services/api';

export function useSocket(token, setUser) {
  const socket = useRef(
    io(URL[process.env.NODE_ENV], {
      autoConnect: false,
      auth: {
        token,
      },
    }),
  );

  const [rooms, setRooms] = useState([]);
  const roomsRef = useRef(null);
  const [selectedChat, setSelectedChat] = useState(null);
  const selectedChatRef = useRef(null);
  const [messages, setMessages] = useState([]);

  const connectToSocket = () => {
    socket.current.connect();
  };

  useEffect(() => {
    socket.current.on('connect', (res) => {
      console.log('success connected', res);
    });

    socket.current.on('catchUserData', (data) => {
      console.log('userData', data);
      setUser(data);
    });

    socket.current.on('error', (res) => {
      console.log('error', res);
    });

    socket.current.on('error-message', (res) => {
      console.log('error-message', res);
    });

    socket.current.on('gotNewContact', (res) => {
      console.log('gotNewContact', res);
    });

    socket.current.on('gotContactList', (res) => {
      console.log('список контактів', res);
    });

    socket.current.on('addedToNewRoom', (res) => {
      console.log('добавлений в нову кімнату', res);
      setRooms((prev) => [...prev, res]);
    });

    socket.current.on('roomList', (res) => {
      console.log('roomList', res);
      setRooms(res);
      roomsRef.current = res;
    });

    socket.current.on('listOfMessages', (res) => {
      console.log('listOfMessages', res);
      setMessages(res);
    });

    socket.current.on('users', (res) => {
      console.log('connected users', res);
    });

    socket.current.on('data-from-serv', (res) => {
      console.log('data from serv: ', res);
    });

    socket.current.on('newMessage', (message) => {
      console.log('new Message from server', message);
      console.log('selected chat ref', selectedChatRef.current);
      if (message.chatRoomId === selectedChatRef.current)
        setMessages((prev) => [...prev, message]);
      else {
        const chatName = roomsRef.current.find(
          (room) => room._id === message.chatRoomId,
        ).name;
        toast(
          <div className="d-flex flex-column">
            <div>{chatName}</div>
            <div>{message.content}</div>
          </div>,
          { type: 'info' },
        );
      }
    });
  }, []);

  const addNewContact = (nickname, userId) => {
    console.log(nickname, userId);
    socket.current.emit('createNewContact', {
      userId,
      nickname,
    });
  };

  const getContactList = () => {
    socket.current.emit('getContactList');
  };

  const createNewChat = (userId, roomName) => {
    socket.current.emit('createRoom', {
      userId,
      roomName,
    });
  };

  const getMessageList = (id) => {
    socket.current.emit('getMessagesList', {
      chatRoomId: id,
    });
  };

  const selectChat = (id) => {
    setSelectedChat(id);
    selectedChatRef.current = id;
    getMessageList(id);
  };

  const disconnect = () => {
    socket.current.disconnect();
  };

  const sendMessage = (message) => {
    console.log('add new message', {
      message,
      roomId: selectedChat,
    });
    socket.current.emit('newMessage', {
      message,
      roomId: selectedChat,
    });
  };

  return {
    connectToSocket,
    addNewContact,
    createNewChat,
    getContactList,
    rooms,
    selectedChat,
    selectChat,
    messages,
    sendMessage,
    disconnect,
  };
}
