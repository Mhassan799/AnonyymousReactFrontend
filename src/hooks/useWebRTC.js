// import { useCallback, useEffect, useRef } from "react";
// import { useStateWithCallBack } from "./useStateWithCallBack";
// import socketInit from "../socket";
// export const useWebRTC = (roomId, user) => {
//   const [clients, setClients] = useStateWithCallBack([]);
//   const audioElements = useRef({});
//   const connections = useRef({});
//   let localMediaStream = useRef(null);
//   const socket = useRef(null);
//   const provideRef = (instance, userId) => {
   
//     audioElements.current[userId] = instance;
//   };
//   useEffect(() => {
//     socket.current = socketInit();
//   }, []);


//   const addNewClients = useCallback(
//     (newClient, cb) => {
//       const lookingFor = clients.find((client) => client.id === newClient.id);
//       if (lookingFor === undefined) {
//         setClients((prev) => [...prev, newClient], cb);
//       }
//     },
//     [clients, setClients]
//   );

//   // captureMedia
//   useEffect(() => {
//     const startCapture = async () => {
//       localMediaStream.current = await navigator.mediaDevices.getUserMedia({
//         audio: true,
//       });
//     };


//     startCapture().then(() => {
//       addNewClients(user, () => {
//         const localElement = audioElements.current[user._id];
//         if (localElement) {
//           localElement.volume = 0;
//           localElement.srcObject = localMediaStream.current;
//         }
//         socket.current.emit("join", {});
       
//       });
//     });
//   }, []);

//   return { clients, provideRef };
// };


import { useCallback, useEffect, useRef } from "react";
import { useStateWithCallBack } from "./useStateWithCallBack";
import socketInit from "../socket";

export const useWebRTC = (roomId, user) => {
  const [clients, setClients] = useStateWithCallBack([]);
  const audioElements = useRef({});
  const connections = useRef({});
  let localMediaStream = useRef(null);
  const socket = useRef(null);

  const peerConnection = new RTCPeerConnection();
  const dataChannel = peerConnection.createDataChannel('hello');

  dataChannel.onopen = () => console.log('channel opened');
  dataChannel.onmessage = e => console.log('Message:', e.data);
  dataChannel.audio = e => console.log('audio:', e.data);

  peerConnection.onicecandidate = () => {
    console.log('iceCandidate', JSON.stringify(peerConnection.localDescription));
  };

  const provideRef = (instance, userId) => {
    audioElements.current[userId] = instance;
  };

  useEffect(() => {
    socket.current = socketInit();

    // On receiving an offer
    socket.current.on("offer", async (offer) => {
      await peerConnection.setRemoteDescription(new RTCSessionDescription(offer));
      const answer = await peerConnection.createAnswer();
      await peerConnection.setLocalDescription(answer);
      socket.current.emit("answer", answer);
    });

    // On receiving an answer
    socket.current.on("answer", async (answer) => {
      await peerConnection.setRemoteDescription(new RTCSessionDescription(answer));
    });

    // On receiving ICE candidate
    socket.current.on("ice-candidate", (iceCandidate) => {
      const candidate = new RTCIceCandidate(iceCandidate);
      peerConnection.addIceCandidate(candidate);
    });

    return () => { 
      // cleanup 
    };
  }, []);

  const addNewClients = useCallback((newClient, cb) => {
    const lookingFor = clients.find((client) => client.id === newClient.id);
    if (!lookingFor) {
      setClients((prev) => [...prev, newClient], cb);
    }
  }, [clients, setClients]);

  useEffect(() => {
    const startCapture = async () => {
      localMediaStream.current = await navigator.mediaDevices.getUserMedia({
        audio: true,
      });
    };

    startCapture().then(() => {
      addNewClients(user, async () => {
        const localElement = audioElements.current[user._id];
        if (localElement) {
          localElement.volume = 0;
          localElement.srcObject = localMediaStream.current;
        }

        if (socket.current) {
          const offer = await peerConnection.createOffer();
          await peerConnection.setLocalDescription(offer);
          socket.current.emit("offer", offer);
        }
      });
    });
  }, [addNewClients, user]);

  peerConnection.onicecandidate = (event) => {
    if(event.candidate) {
      socket.current.emit("ice-candidate", event.candidate);
    }
  };

  return { clients, provideRef };
};