// import React from 'react';
// import styles from './Room.module.css';
// import { useWebRTC } from '../../hooks/useWebRTC';
// import { useParams } from 'react-router-dom';
// const Room = () => {
//   const { id: roomId } = useParams();
//   const storeData = localStorage.getItem('user');
//   let user;
//   if (storeData) {
//     user = JSON.parse(storeData);
//   }
// console.log(user)
//  // const { clients, provideRef } = useWebRTC(roomId, user);

//   return (
//     <div>
//       <div>Room</div>
//       <div className={styles.main}>
//         {clients.map((client) => (
//           <div key={client.id}>
//             <audio ref={(instance) => provideRef(instance, user._id)} controls autoPlay src=""></audio>
//             <h4>{user.Name}</h4>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Room;
// import React from 'react';
// import styles from './Room.module.css';
// import { useWebRTC } from '../../hooks/useWebRTC';
// import { useParams } from 'react-router-dom';

// const Room = () => {

//   const { id: roomId } = useParams();
 
//   const storeData = localStorage.getItem('user');

//   let user;
//   if (storeData) {
//     user = JSON.parse(storeData);
//   }
  
//   const { clients, provideRef } = useWebRTC(roomId, user);


//   return (
//     <div>
  
//       <div>Room</div>
//       <div className={styles.main}>
//         {
       
//         clients.map((client) => (
//           <div key={client.id}>
//             <audio ref={(instance) => provideRef(instance, user._id)} controls autoPlay src=""></audio>
//             <h4>{user.Name}</h4>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Room;

import React, { useState, useEffect, useRef } from 'react';
import styles from './Room.module.css';
import { useWebRTC } from '../../hooks/useWebRTC';
import { useParams } from 'react-router-dom';
import socketInit from '../../socket/index';

const Room = () => {
  const { id: roomId } = useParams();
  const storeData = localStorage.getItem('user');
  const [messages, setMessages] = useState([]);
  let user;
  
  if (storeData) {
    user = JSON.parse(storeData);
  }

  const { clients, provideRef } = useWebRTC(roomId, user);
  const socket = useRef(socketInit()).current;

  useEffect(() => {
    if (socket) {
      socket.emit('join-room', roomId, user._id);
    }
  }, [roomId, user, socket]);

  useEffect(() => {
    if (socket) {
      console.log('Connected to server');

      socket.on('user-joined', (userId) => {
        console.log(`${userId} joined`);
        setMessages((prev) => {
          if (!prev.includes(`${userId} has joined the room`)) {
            return [...prev, `${userId} has joined the room`];
          }
          return prev;
        });
      });

      socket.on('user-left', (userId) => {
        console.log(`${userId} left`);
        setMessages((prev) => {
          if (!prev.includes(`${userId} has left the room`)) {
            return [...prev, `${userId} has left the room`];
          }
          return prev;
        });
      });

      socket.on('connect_error', (error) => {
        console.error('Connection Error:', error);
      });

      return () => {
        socket.off('user-joined');
        socket.off('user-left');
        socket.off('connect_error');
      };
    }
  }, [socket]);

  return (
    <div>
      <div>Room</div>
      <div className={styles.main}>
        {clients.map((client) => (
          <div key={client.id}>
            <audio ref={(instance) => provideRef(instance, user._id)} controls autoPlay src=""></audio>
            <h4>{user.Name}</h4>
          </div>
        ))}
      </div>

      <div className={styles.messages} style={{ border: '1px solid red', marginTop: '10px' }}>
        {messages.map((msg, index) => (
          <div key={index}>{msg}</div>
        ))}
      </div>
    </div>
  );
};

export default Room;
