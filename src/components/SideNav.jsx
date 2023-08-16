import React from "react";
import {Box} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import ChatIcon from "@mui/icons-material/Chat";
import demoProfilePic from "../assets/images/demo-image.jpg";
import firebase from "../lib/firebase";
import {getFirestore, doc, getDoc, setDoc} from "firebase/firestore";
//usenavigate
import {useNavigate} from "react-router-dom";

const SideNav = ({user}) => {
  const [openMore, setOpenMore] = React.useState(false);
  const [openChatIcon, setOpenChatIcon] = React.useState(false);
  // console.log(user.photo);
  const db = getFirestore(firebase);
  const navigate = useNavigate();
  const handleNewChat = async () => {
    const newChatEmail = prompt(
      "Enter email of the user you want to chat with"
    );
    if (newChatEmail) {
      try {
        //check if user account exists
        const userDocRef = doc(db, "users", newChatEmail);
        const userDocSnap = await getDoc(userDocRef);
        if (userDocSnap.exists()) {
          //check if chat already exists
          const chatDocRef = doc(
            db,
            "users",
            user.email,
            "chats",
            newChatEmail
          );
          const chatDocSnap = await getDoc(chatDocRef);
          if (!chatDocSnap.exists()) {
            //create new chat
            await setDoc(chatDocRef, {
              messages: [],
            });
          }
          //navigate to chat
          navigate(`/chat/${newChatEmail}`);
        } else {
          alert("User does not exist");
        }
      } catch (error) {
        console.error("Error adding new chat:", error);
      }
    }
  };
  return (
    <Box
      sx={{
        height: "10vh",
        bgcolor: "#F0F2F5",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "20px",
        borderBottom: "1px solid lightgray",
      }}>
      <img
        src={user?.photo ? user.photo : demoProfilePic}
        alt="profile pic"
        style={{height: "45px", width: "45px", borderRadius: "50%"}}
      />
      <Box>
        <div
          onClick={() => setOpenChatIcon(!openChatIcon)}
          style={{
            display: "inline",
            marginRight: "1rem",
          }}>
          <ChatIcon />
          {openChatIcon && <div style={{position: "relative"}}></div>}
        </div>

        <div
          style={{display: "inline", cursor: "pointer"}}
          onClick={() => setOpenMore(!openMore)}>
          <MoreVertIcon />

          {openMore && (
            <div style={{position: "relative"}}>
              <Box
                sx={{
                  position: "absolute",
                  // top: "-2vh",
                  right: "0",
                  width: "200px",
                  height: "200px",
                  backgroundColor: "white",
                  boxShadow: "0 0 10px rgba(0,0,0,0.2)",
                  zIndex: 1,
                }}>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    height: "100%",
                    width: "100%",
                    gap: "1rem",
                  }}>
                  <Box
                    onClick={handleNewChat}
                    sx={{
                      borderBottom: "1px solid lightgray",
                      cursor: "pointer",
                      padding: "0.3rem",
                      "&:hover": {
                        backgroundColor: "#ebebeb",
                      },
                      "&:active": {
                        backgroundColor: "#ebebeb",
                      },
                    }}>
                    Send Msg To New
                  </Box>
                  <Box
                    sx={{
                      borderBottom: "1px solid lightgray",
                      cursor: "pointer",
                      padding: "0.3rem",
                      "&:hover": {
                        backgroundColor: "#ebebeb",
                      },
                      "&:active": {
                        backgroundColor: "#ebebeb",
                      },
                    }}>
                    Profile
                  </Box>
                  <Box
                    sx={{
                      borderBottom: "1px solid lightgray",
                      cursor: "pointer",
                      padding: "0.3rem",
                      "&:hover": {
                        backgroundColor: "#ebebeb",
                      },
                      "&:active": {
                        backgroundColor: "#ebebeb",
                      },
                    }}>
                    Settings
                  </Box>
                  <Box
                    sx={{
                      borderBottom: "1px solid lightgray",
                      cursor: "pointer",
                      padding: "0.3rem",
                      "&:hover": {
                        backgroundColor: "#ebebeb",
                      },
                      "&:active": {
                        backgroundColor: "#ebebeb",
                      },
                    }}>
                    LogOut
                  </Box>
                </Box>
              </Box>
            </div>
          )}
        </div>
      </Box>
    </Box>
  );
};

export default SideNav;
