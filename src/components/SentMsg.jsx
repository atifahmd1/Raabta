import {Box} from "@mui/material";
import React from "react";

const SentMsg = ({msg, time}) => {
  return (
    <Box
      sx={{
        fontSize: "1rem",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        flexWrap: "wrap",
        // alignItems: "flex-end",
        gap: "0.5rem",
        marginTop: "8px",
        marginRight: "20px",
        backgroundColor: "#DCF8C6", // Light green background color for sent messages
        borderRadius: "10px",
        padding: "8px",
        width: "fit-content",
        maxWidth: "50%", // Adjust this value as needed to control the width of the message bubble
      }}>
      {msg}
      <Box
        sx={{
          fontSize: "0.8rem",
          alignSelf: "flex-end",
          alignItems: "flex-end",
          marginBottom: "-0.5rem",
          color: "#888",
        }}>
        {time}
      </Box>
    </Box>
  );
};

export default SentMsg;
