import React from "react";
//import from div from mui
import {Box} from "@mui/material";
import Sidebar from "./Sidebar";
// import Chat from "./Chat";
import firebase from "../lib/firebase";
import {messaging} from "../lib/firebase";
import {getToken} from "@firebase/messaging";
import {useEffect} from "react";
import {getFirestore, doc, updateDoc} from "firebase/firestore";

const Home = ({user}) => {
  const db = getFirestore(firebase);
  // console.log(user);
  async function requestPermission() {
    const permission = await Notification.requestPermission();
    console.log(permission);
    if (permission === "granted") {
      const token = await getToken(messaging, {
        vapidKey:
          "BDmUd0kgvn88-iv4m2mJLGsgKjZclGpIMGeZ_5fmkR_rou6Bbiun_Z8kOu5y59nqyvG0aP7BbmZLK1g5xjAU1q8",
      });

      //save this token to firebase
      const docRef = doc(db, "users", user.email);
      await updateDoc(docRef, {
        token: token,
      });
    } else if (permission === "denied") {
      alert("Please Allow Notification Permission");
    }
  }

  useEffect(() => {
    requestPermission();
  }, []);
  return (
    <Box sx={{display: "flex"}}>
      <Sidebar user={user} />
      {/* <Chat /> */}
    </Box>
  );
};

export default Home;
