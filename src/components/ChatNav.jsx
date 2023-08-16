import React from "react";
import {Box, Typography} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import SearchIcon from "@mui/icons-material/Search";
import CallIcon from "@mui/icons-material/Call";
import VideocamIcon from "@mui/icons-material/Videocam";
//useParams
import {useParams} from "react-router-dom";
// import firebase from "../lib/firebase";
// import VideoCall from "./VideoCall";
// import Call from "./Call";
// useNavigate
import {useNavigate} from "react-router-dom";

const ChatNav = ({dp, name, status}) => {
  const navigate = useNavigate();
  const {emailId} = useParams();

  //handle audio call using webRTC
  const handleCall = () => {
    navigate(`/call/${emailId}`);
  };

  //handle video call using webRTC
  const handleVideoCall = () => {
    navigate(`/video-call/${emailId}`);
  };
  return (
    <Box
      sx={{
        bgcolor: "#F0F2F5",
        height: "10vh",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "20px",
        borderLeft: "1px solid lightgray",
        borderBottom: "1px solid lightgray",
      }}>
      <Box display={"flex"}>
        <img
          src={dp}
          alt="profile pic"
          style={{
            height: "45px",
            width: "45px",
            borderRadius: "50%",
            alignSelf: "center",
          }}
        />
        <Box ml={"1rem"} flexGrow={1}>
          <Typography variant="h6"> {name} </Typography>
          <Typography variant="caption"> {status} </Typography>
        </Box>
      </Box>
      <Box>
        <SearchIcon sx={{mr: 5}} />
        <div
          onClick={handleCall}
          style={{
            display: "inline",
            marginRight: "2rem",
          }}>
          <CallIcon />
        </div>
        <div
          onClick={handleVideoCall}
          style={{
            display: "inline",
            marginRight: "2rem",
          }}>
          <VideocamIcon />
        </div>
        <MoreVertIcon />
      </Box>
    </Box>
  );
};

export default ChatNav;
