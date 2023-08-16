import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Home from "./components/Home";
import Chat from "./components/Chat";
import {useState, useEffect} from "react";
import Login from "./components/Login";
import VideoCall from "./components/VideoCall";
import Call from "./components/Call";

import "./App.css";
import CallUI from "./components/CallUI";

function App() {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
  // console.log(user);
  const [isIncomingCall, setIsIncomingCall] = useState(false);
  const [incomingCallData, setIncomingCallData] = useState(null);

  useEffect(() => {
    const messaging = firebase.messaging();

    // Handle incoming FCM notifications
    messaging.onMessage((payload) => {
      if (
        payload.notification &&
        payload.notification.title === "Incoming Call"
      ) {
        const callerEmail = payload.notification.body.split(" ")[0];
        const callId = payload.data.callId; // Assuming you include the call ID in the payload

        // Update state to show the CallUI component
        setIsIncomingCall(true);
        setIncomingCallData({
          callerEmail: callerEmail,
          callId: callId,
        });
      }
    });
  }, []);

  return (
    <>
      <Router>
        {user ? (
          <Routes>
            <Route path="/" element={<Home user={user} />} />
            <Route path="/chat/:emailId" element={<Chat user={user} />} />
            <Route path="/call-ui" element={<CallUI user={user} />} />
            <Route
              path="/video-call/:emailId"
              element={<VideoCall user={user} />}
            />
            <Route path="/call/:emailId" element={<Call user={user} />} />
          </Routes>
        ) : (
          <Login setUser={setUser} />
        )}
      </Router>
    </>
  );
}

export default App;
