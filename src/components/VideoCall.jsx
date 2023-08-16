// import React from "react";
// import firebase from "../lib/firebase";
// import {getFirestore} from "firebase/firestore";
// import "firebase/messaging";
// import SimpleWebRTC from "simplewebrtc";
// import { Box } from "@mui/material";

// const VideoCall = () => {
// const db = getFirestore(firebase);
// const [localStream, setLocalStream] = useState(null);
// const [remoteStream, setRemoteStream] = useState(null);

// const servers = {
//     iceServers: [
//         {
//             urls: [
//                 "stun:stun1.l.google.com:19302", "stun:stun2.l.google.com:19302",
//             ],
//         },
//     ],
//     iceCandidatePoolSize: 10,
// };

// const pc = new RTCPeerConnection(servers);

//   return (
//     <Box>
//         <Box id="localVideo"></Box>

//     </Box>
//   )
// };

// export default VideoCall;

// import React, {useEffect, useRef, useState} from "react";
// import SimpleWebRTC from "simplewebrtc";
// import {useParams} from "react-router-dom";
// import firebase from "../lib/firebase";
// import {getFirestore} from "firebase/firestore";
// import "firebase/messaging";

// function VideoCall({user}) {
//   const db = getFirestore(firebase);
//   const [localStream, setLocalStream] = useState(null);
//   const [remoteStream, setRemoteStream] = useState(null);
//   const [webrtc, setWebRTC] = useState(null);
//   const [participants, setParticipants] = useState([]);
//   const localVideoRef = useRef(null);
//   const {emailId} = useParams();

//   const servers = {
//     iceServers: [
//       {
//         urls: [
//           "stun:stun1.l.google.com:19302",
//           "stun:stun2.l.google.com:19302",
//         ],
//       },
//     ],
//     iceCandidatePoolSize: 10,
//   };

//   const pc = new RTCPeerConnection(servers);

//   useEffect(() => {
//     // Initialize SimpleWebRTC
//     const rtc = new SimpleWebRTC({
//       localVideoEl: localVideoRef.current,
//       autoRequestMedia: true,
//       debug: false,
//     });

//     setWebRTC(rtc);

//     // Join the call
//     rtc.on("readyToCall", () => {
//       rtc.joinRoom("video-call-room");
//     });

//     // Handle new participants joining the call
//     rtc.on("createdPeer", (peer) => {
//       setParticipants((prevParticipants) => [...prevParticipants, peer]);
//     });

//     // Clean up on unmount
//     return () => {
//       rtc.stopLocalVideo();
//       rtc.leaveRoom();
//     };
//   }, []);

//   useEffect(() => {
//     const messaging = firebase.messaging();
//     messaging
//       .requestPermission()
//       .then(() => {
//         return messaging.getToken();
//       })
//       .then((token) => {
//         console.log("Token: ", token);
//         firebase.database().ref("fcmTokens").child(user.uid).set({
//           token: token,
//         });
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   }, []);

//   useEffect(() => {
//     const db = firebase.database();
//     const callRef = db.ref("calls");
//     callRef.on("value", (snapshot) => {
//       if (snapshot.val()) {
//         const call = snapshot.val();
//         if (call.receiver === user.uid && !call.isReceived) {
//           console.log("call received");
//           const confirm = window.confirm(
//             `${call.senderName} is calling you. Do you want to join the call?`
//           );
//           callRef.child(user.uid).update({isReceived: true});
//           if (confirm) {
//             callRef.child(user.uid).remove();
//             navigator.mediaDevices
//               .getUserMedia({video: true, audio: true})
//               .then((stream) => {
//                 setLocalStream(stream);
//                 setRemoteStream(call.localStream);
//                 pc.addStream(stream);
//                 pc.ontrack = (event) => {
//                   setRemoteStream(event.streams[0]);
//                 };
//                 const desc = new RTCSessionDescription(call.offer);
//                 pc.setRemoteDescription(desc).then(() => {
//                   pc.createAnswer().then((answer) => {
//                     pc.setLocalDescription(answer);
//                     const payload = {
//                       target: call.sender,
//                       name: user.displayName,
//                       caller: user.uid,
//                       answer: {
//                         type: answer.type,
//                         sdp: answer.sdp,
//                       },
//                     };
//                     callRef.child(user.uid).update({isCalling: true});
//                     callRef.child(call.sender).update({isCalling: true});
//                     callRef
//                       .child(call.sender)
//                       .child("answer")
//                       .set(payload.answer);
//                     callRef.child(user.uid).child("answer").set(payload.answer);
//                   });
//                 });
//               });
//           } else {
//             callRef.child(user.uid).remove();
//           }
//         }
//       }
//     });
//   }, []);

//   // Render remote video elements
//   const remoteVideos = participants.map((participant) => (
//     <video key={participant.id} ref={participant.videoEl} autoPlay />
//   ));

//   return (
//     <div>
//       <h1>Video Call</h1>
//       <div>
//         <video ref={localVideoRef} autoPlay muted />
//       </div>
//       <div>{remoteVideos}</div>
//     </div>
//   );
// }

// export default VideoCall;

import React, {useEffect, useRef, useState} from "react";
import SimpleWebRTC from "simplewebrtc";
import {useParams} from "react-router-dom";
import firebase from "firebase/compat/app";
import Firebase from "../lib/firebase";
// import "firebase/compat/messaging";
import {getFirestore} from "firebase/firestore";
import {getMessaging} from "firebase/messaging";

const db = getFirestore(Firebase);

function VideoCall({user}) {
  const [participants, setParticipants] = useState([]);
  const localVideoRef = useRef(null);
  const {emailId} = useParams();

  useEffect(() => {
    const rtc = new SimpleWebRTC({
      localVideoEl: localVideoRef.current,
      autoRequestMedia: true,
      debug: false,
    });

    rtc.on("readyToCall", () => {
      rtc.joinRoom("video-call-room");
    });

    rtc.on("createdPeer", (peer) => {
      setParticipants((prevParticipants) => [...prevParticipants, peer]);
    });

    rtc.on("videoAdded", (video, peer) => {
      const participantIndex = participants.findIndex((p) => p.id === peer.id);
      if (participantIndex !== -1) {
        participants[participantIndex].videoEl = video;
      }
      document.getElementById("remote-videos-container").appendChild(video);
    });

    // Clean up on unmount
    return () => {
      rtc.leaveRoom();
    };
  }, []);

  useEffect(() => {
    const messaging = getMessaging(Firebase);
    messaging
      .requestPermission()
      .then(() => messaging.getToken())
      .then((token) => {
        console.log("Token: ", token);
        firebase.database().ref("fcmTokens").child(user.uid).set({
          token: token,
        });
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  return (
    <div>
      <h1>Video Call</h1>
      <div>
        <video ref={localVideoRef} autoPlay muted />
      </div>
      <div id="remote-videos-container">
        {participants.map((participant) => (
          <video key={participant.id} autoPlay />
        ))}
      </div>
    </div>
  );
}

export default VideoCall;
