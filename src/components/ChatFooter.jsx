import {Box, Paper} from "@mui/material";
// import React, {useState} from "react";
import InsertEmoticonIcon from "@mui/icons-material/InsertEmoticon";
import AddIcon from "@mui/icons-material/Add";
import SendIcon from "@mui/icons-material/Send";
import KeyboardVoiceIcon from "@mui/icons-material/KeyboardVoice";

const ChatFooter = ({
  msg,
  setMsg,
  openEmojiPicker,
  setOpenEmojiPicker,
  sendMessage,
}) => {
  return (
    <Box
      height={"10vh"}
      display={"flex"}
      bgcolor={"#F0F2F5"}
      gap={"1rem"}
      alignItems={"center"}>
      <InsertEmoticonIcon
        sx={{fontSize: "2rem", ml: "1rem"}}
        onClick={() => setOpenEmojiPicker(!openEmojiPicker)}
      />
      <AddIcon sx={{fontSize: "2rem"}} />
      <Paper sx={{flexGrow: 1, borderRadius: "10px"}}>
        <input
          placeholder="Type a message..."
          type="text"
          value={msg}
          onChange={(e) => setMsg(e.target.value)}
          style={{
            fontSize: "1.2rem",
            borderRadius: "10px",
            width: "100%",
            padding: "0.5em 1em",
            border: "none",
            outline: "none",
          }}
        />
      </Paper>
      {msg ? (
        <SendIcon sx={{fontSize: "2rem", mr: "1rem"}} onClick={sendMessage} />
      ) : (
        <KeyboardVoiceIcon sx={{fontSize: "2rem", mr: "1rem"}} />
      )}
    </Box>
  );
};

export default ChatFooter;
