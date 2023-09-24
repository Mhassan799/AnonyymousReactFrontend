// import React, { useEffect, useState } from "react";
// import RoomModal from "../components/RoomModal/RoomModal";
// import { getAllRooms } from "../http";
// import network from "../assets/netwrok.png";
// import styles from "./Rooms.module.css";
// import RoomCard from "../components/RoomCard/RoomCard";
// const Rooms = () => {
//   const [rooms, setRooms] = useState([]);
//   const [show, setShow] = useState(false);
  
//   const storeData = localStorage.getItem("token");
//   let token;
//   if (storeData) {
//     token = JSON.parse(storeData);
 
//   }
//   const showBtn = () => {
//     setShow(true);
//   };
//   useEffect(() => {
//     const getRooms = async () => {
//       const { data } = await getAllRooms({ token });
//       console.log(data);
//       setRooms(data.room);
//     };
//     getRooms();
//   }, []);
//   return (
//     <div>
//       <div className={styles.main}>
//         <span className={styles.head}>All Rooms</span>

//         <button onClick={showBtn} className={styles.btnSet}>
//           <img src={network} alt="" />
//           <span>create Room</span>
//         </button>
//       </div>
//       <div className={styles.roomList}>
//         {rooms.map((room) => {
//           return (
//             <div key={room._id}>
//               <RoomCard room={room} />
//             </div>
//           );
//         })}
//       </div>
//       <div className={styles.modalCover}>
//         {show && <RoomModal onClose={() => setShow(false)} />}
//       </div>
//     </div>
//   );
// };

// export default Rooms;


import React, { useEffect, useState } from "react";
import RoomModal from "../components/RoomModal/RoomModal";
import { getAllRooms } from "../http";
import network from "../assets/netwrok.png";
import styles from "./Rooms.module.css";
import RoomCard from "../components/RoomCard/RoomCard";
import { useNavigate} from 'react-router-dom';

const Rooms = () => {
    const navigate = useNavigate();
    const [rooms, setRooms] = useState([]);
    const [show, setShow] = useState(false);
    
    const storeData = localStorage.getItem("token");
    let token;
    if (storeData) {
        token = JSON.parse(storeData);
    }

    const handleRoomCreation = async (newRoomId) => {
      console.log(newRoomId)
      navigate(`/room/${newRoomId}`);
    }
    const showBtn = () => {
        setShow(true);
    };
    
    useEffect(() => {
        const getRooms = async () => {
            const { data } = await getAllRooms({ token });
            console.log(data);
            setRooms(data.room);
        };
        
        getRooms();
    }, []);

    return (
        <div>
            <div className={styles.main}>
                <span className={styles.head}>All Rooms</span>

                <button onClick={showBtn} className={styles.btnSet}>
                    <img src={network} alt="" />
                    <span>create Room</span>
                </button>
            </div>
            <div className={styles.roomList}>
                {rooms.map((room) => {
                    return (
                        <div key={room._id}>
                            <RoomCard room={room} />
                        </div>
                    );
                })}
            </div>
            <div className={styles.modalCover}>
                {show && <RoomModal onClose={() => setShow(false)} onRoomCreated={handleRoomCreation} />}
            </div>
        </div>
    );
};

export default Rooms;
