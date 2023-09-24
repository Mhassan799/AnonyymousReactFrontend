// import React from "react";
// import styles from "./RoomCard.module.css";
// import chatBuble from "../../assets/chatBuble.png";
// import { useNavigate } from "react-router-dom";

// const RoomCard = ({ room }) => {
//     console.log(room)
//   const storeData = localStorage.getItem("user");
//   let user;
//   if (storeData) {
//     user = JSON.parse(storeData);
//   }
//    room.SpeakerId.push(user)
//   //   console.log(room.speaker);
//   const history = useNavigate();
//   return (
//     <div
//       onClick={() => {
//         history(`/room/${room._id}`);
//       }}
//       className={styles.card}
//     >
//       <h3 className={styles.topic}>{room.topic}</h3>
//       <div
//         className={`${styles.speakers} ${
//           room.SpeakerId.length === 1 ? styles.singleSpeaker : ""
//         }`}
//       >
//         <div className={styles.avatars}>
//            {room.SpeakerId.map((s, index) => (
//             <img key={index} src={user.Img} alt="SpeakerId-avatar" />
//           ))} 
//         </div>
//         <div className={styles.names}>
//           {room.SpeakerId.map((s, index) => (
//             <div key={index} className={styles.nameWrapper}>
//               <span>{user.Name}</span>
//               <img src={chatBuble} alt="chat-bubble" />
//             </div>
//           ))}
//         </div>
//       </div>
//       <div className={styles.peopleCount}>
//         {/* <span>{room.SpeakerId.length}</span> */}
//         <img src={chatBuble} alt="user-icon" />
//       </div>
//     </div>
//   );
// };

// export default RoomCard;
import React from 'react';
import styles from './RoomCard.module.css';
import chatBuble from '../../assets/chatBuble.png'
import { useNavigate } from 'react-router-dom';

const RoomCard = ({ room }) => {
    const storeData = localStorage.getItem('user')
    let user;
    if(storeData)
    {
      user = JSON.parse(storeData)
    }
  
    const history = useNavigate();
    return (
        <div
            onClick={() => {
                history(`/room/${room._id}`);
            }}
            className={styles.card}
        >
            <h3 className={styles.topic}>{room.topic}</h3>
            <div
                className={`${styles.speakers} ${
                    room.SpeakerId.length === 1 ? styles.singleSpeaker : ''
                }`}
            >
                <div className={styles.avatars}>
                    {room.SpeakerId.map((speaker) => (
                        <img
                            key={room._id}
                            src={user.Img}
                            alt="speaker-avatar"
                        />
                    ))}
                </div>
                <div className={styles.names}>
                    {room.SpeakerId.map((speaker,index) => (
                        <div key={room._id} className={styles.nameWrapper}>
                            <span>{user.Name}</span>
                            <img
                                src={chatBuble}
                                alt="chat-bubble"
                            />
                        </div>
                    ))}
                </div>
            </div>
            <div className={styles.peopleCount}>
                <span>{room.SpeakerId.length}</span>
                <img src={chatBuble} alt="user-icon" />
            </div>
        </div>
    );
};

export default RoomCard;
