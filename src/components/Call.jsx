// import React, {useState} from "react";
// import firebase from "firebase/compat/app";
// import "firebase/compat/database";
// import {Box} from "@mui/material";
// import {useParams} from "react-router-dom";
// import CallFooter from "./CallFooter";
// import {
//   createAnswerSdpUsingWebRTC,
//   createOfferSdpUsingWebRTC,
// } from "../lib/webrtc";

// const Call = ({user}) => {
//   const [localStream, setLocalStream] = useState(null);
//   const [remoteStream, setRemoteStream] = useState(null);
//   const {emailId} = useParams();

//   const handleCreateOffer = async () => {
//     const offerSdp = await createOfferSdpUsingWebRTC(setLocalStream);

//     // Send the offer SDP to the receiver using Firebase Realtime Database
//     const callRef = firebase.database().ref("calls").push();
//     callRef.set({
//       callerId: user.email, // Replace with the actual caller ID
//       receiverId: emailId, // Replace with the actual receiver ID
//       status: "initiating",
//       offerSdp,
//       timestamp: firebase.database.ServerValue.TIMESTAMP,
//     });
//   };

//   const handleAnswerCall = async (callData) => {
//     const answerSdp = await createAnswerSdpUsingWebRTC(
//       setLocalStream,
//       callData.offerSdp
//     );

//     // Send the answer SDP back to the caller using Firebase Realtime Database
//     const callRef = firebase.database().ref(`calls/${callData.callId}`);
//     callRef.update({
//       status: "ongoing",
//       answerSdp,
//     });
//   };

//   return (
//     <div>
//       <h1>WebRTC Audio and Video Call</h1>

//       <div>
//         {!localStream && (
//           <button onClick={handleCreateOffer}>Initiate Call</button>
//         )}
//         {localStream && (
//           <div>
//             <h2>Your Video</h2>
//             <video
//               ref={(videoRef) => videoRef && (videoRef.srcObject = localStream)}
//               autoPlay
//               playsInline
//               muted
//             />
//           </div>
//         )}
//         {remoteStream && (
//           <div>
//             <h2>Remote Video</h2>
//             <video
//               ref={(videoRef) =>
//                 videoRef && (videoRef.srcObject = remoteStream)
//               }
//               autoPlay
//               playsInline
//             />
//           </div>
//         )}
//       </div>
//       <CallFooter />
//     </div>
//   );
// };

// export default Call;

import React, {useState, useEffect} from "react";
import firebase from "firebase/compat/app";
import "firebase/compat/database";
import {useParams} from "react-router-dom";

const firebaseConfig = {
  // Your Firebase configuration
  apiKey: "AIzaSyBvgtDa4bq0mEHNXpbKWJQTDIBVaFWuDS4",
  authDomain: "raabta-786.firebaseapp.com",
  projectId: "raabta-786",
  storageBucket: "raabta-786.appspot.com",
  messagingSenderId: "528751578812",
  appId: "1:528751578812:web:cdd7a773b24c2b9069cab9",
};

firebase.initializeApp(firebaseConfig);

const Call = ({user}) => {
  const [localStream, setLocalStream] = useState(null);
  const [remoteStream, setRemoteStream] = useState(null);
  const [peerConnection, setPeerConnection] = useState(null);
  const [callStatus, setCallStatus] = useState("idle");
  const [callId, setCallId] = useState(null);
  const {emailId} = useParams();

  useEffect(() => {
    const setupPeerConnection = async () => {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: true,
        video: true,
      });
      setLocalStream(stream);

      const connection = new RTCPeerConnection();
      stream.getTracks().forEach((track) => {
        connection.addTrack(track, stream);
      });

      connection.onicecandidate = (event) => {
        if (event.candidate) {
          const callRef = firebase.database().ref(`calls/${callId}`);
          callRef.child("iceCandidates").push(event.candidate);
        }
      };

      connection.ontrack = (event) => {
        setRemoteStream(event.streams[0]);
      };

      setPeerConnection(connection);
    };

    setupPeerConnection();

    return () => {
      if (peerConnection) {
        peerConnection.close();
      }
    };
  }, [callId]);

  const handleCreateOffer = async () => {
    if (peerConnection) {
      const offer = await peerConnection.createOffer();
      await peerConnection.setLocalDescription(offer);

      const callRef = firebase.database().ref("calls").push();
      callRef.set({
        callerId: user.email,
        receiverId: emailId,
        status: "initiating",
        offerSdp: peerConnection.localDescription,
        timestamp: firebase.database.ServerValue.TIMESTAMP,
      });

      setCallStatus("calling");
      setCallId(callRef.key);
    }
  };

  const handleAnswerCall = async (callData) => {
    if (peerConnection) {
      const offer = new RTCSessionDescription(callData.offerSdp);
      await peerConnection.setRemoteDescription(offer);

      const answer = await peerConnection.createAnswer();
      await peerConnection.setLocalDescription(answer);

      const callRef = firebase.database().ref(`calls/${callData.callId}`);
      callRef.update({
        status: "ongoing",
        answerSdp: peerConnection.localDescription,
      });

      setCallStatus("ongoing");
      setCallId(callData.callId);
    }
  };

  const handleIceCandidates = (iceCandidates) => {
    if (peerConnection) {
      iceCandidates.forEach((candidate) => {
        peerConnection.addIceCandidate(new RTCIceCandidate(candidate));
      });
    }
  };

  const handleEndCall = () => {
    if (peerConnection) {
      peerConnection.close();
    }

    if (callStatus === "calling" || callStatus === "ongoing") {
      const callRef = firebase.database().ref(`calls/${callId}`);
      callRef.remove();
    }

    setLocalStream(null);
    setRemoteStream(null);
    setPeerConnection(null);
    setCallStatus("idle");
    setCallId(null);
  };

  return (
    <div>
      <h1>WebRTC Call</h1>
      {callStatus === "idle" && (
        <button onClick={handleCreateOffer}>Initiate Call</button>
      )}
      {localStream && (
        <div>
          <h2>Your Video</h2>
          <video
            ref={(videoRef) => videoRef && (videoRef.srcObject = localStream)}
            autoPlay
            playsInline
            muted
          />
        </div>
      )}
      {remoteStream && (
        <div>
          <h2>Remote Video</h2>
          <video
            ref={(videoRef) => videoRef && (videoRef.srcObject = remoteStream)}
            autoPlay
            playsInline
          />
        </div>
      )}
      {callStatus === "calling" && (
        <button onClick={handleEndCall}>End Call</button>
      )}
    </div>
  );
};

export default Call;
