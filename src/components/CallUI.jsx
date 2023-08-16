import React, {useState} from "react";
import firebase from "firebase/compat/app";
import "firebase/compat/database";

const CallUI = ({user, receiver, initiateCall}) => {
  const [isCalling, setIsCalling] = useState(false);
  const [isIncomingCall, setIsIncomingCall] = useState(false);
  const [callId, setCallId] = useState("");

  // Handle initiating a call
  const handleCallInitiation = async () => {
    setIsCalling(true);
    const callRef = firebase.database().ref("calls").push({
      callerId: user.email,
      receiverId: receiver.email,
      status: "initiating",
      timestamp: firebase.database.ServerValue.TIMESTAMP,
    });
    setCallId(callRef.key);
    initiateCall(callRef.key);
  };

  // Handle answering an incoming call
  const handleAnswerCall = () => {
    setIsIncomingCall(false);
    // Call your WebRTC logic to establish the call
  };

  // Handle rejecting an incoming call
  const handleRejectCall = () => {
    setIsIncomingCall(false);
    // Handle call rejection
  };

  return (
    <div className="call-ui">
      <div className="user-status">
        {receiver.isOnline ? (
          <span className="online">Online</span>
        ) : (
          <span className="offline">Offline</span>
        )}
      </div>
      {isCalling && (
        <div className="calling">
          Calling {receiver.email}...
          <button onClick={() => setIsCalling(false)}>Cancel</button>
        </div>
      )}
      {!isCalling && <button onClick={handleCallInitiation}>Call</button>}
      {isIncomingCall && (
        <div className="incoming-call">
          Incoming call from {receiver.email}
          <button onClick={handleAnswerCall}>Answer</button>
          <button onClick={handleRejectCall}>Reject</button>
        </div>
      )}
    </div>
  );
};

export default CallUI;
