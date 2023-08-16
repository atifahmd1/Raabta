import React, {useState} from "react";
import CallEndIcon from "@mui/icons-material/CallEnd";
import VideocamIcon from "@mui/icons-material/Videocam";
import VideocamOffIcon from "@mui/icons-material/VideocamOff";
import ScreenShareIcon from "@mui/icons-material/ScreenShare";
import StopScreenShareIcon from "@mui/icons-material/StopScreenShare";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import {Box} from "@mui/material";

const CallFooter = ({videoOn, setVideoOn}) => {
  const [screenShareOn, setScreenShareOn] = useState(false);
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-evenly",
        alignItems: "center",
        height: "10vh",
      }}>
      <CallEndIcon
        sx={{fontSize: "2rem", bgcolor: "red", borderRadius: "50px"}}
      />
      <PersonAddIcon sx={{fontSize: "2rem"}} />
      {videoOn ? (
        <VideocamOffIcon
          sx={{fontSize: "2rem"}}
          onClick={() => setVideoOn(!videoOn)}
        />
      ) : (
        <VideocamIcon
          sx={{fontSize: "2rem"}}
          onClick={() => setVideoOn(!videoOn)}
        />
      )}
      {screenShareOn ? (
        <StopScreenShareIcon
          sx={{fontSize: "2rem"}}
          onClick={() => setScreenShareOn(!screenShareOn)}
        />
      ) : (
        <ScreenShareIcon
          sx={{fontSize: "2rem"}}
          onClick={() => setScreenShareOn(!screenShareOn)}
        />
      )}
    </Box>
  );
};

export default CallFooter;
