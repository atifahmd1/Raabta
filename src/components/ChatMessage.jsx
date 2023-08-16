// import React from "react";
// import {Box} from "@mui/material";

// const ChatMessage = ({message, sender, timestamp, isSent}) => {
//   return (
//     <Box
//       sx={{
//         display: "flex",
//         flexDirection: isSent ? "row-reverse" : "row",
//         alignItems: "flex-start",
//         margin: "8px 0",
//       }}>
//       <Box
//         sx={{
//           backgroundColor: isSent ? "#DCF8C6" : "#ECE5DD",
//           borderRadius: "15px",
//           padding: "8px 12px",
//           maxWidth: "70%",
//         }}>
//         <p style={{margin: 0}}>{message}</p>
//         <Box
//           sx={{
//             fontSize: "12px",
//             color: "#888",
//             textAlign: isSent ? "right" : "left",
//           }}>
//           {timestamp}
//         </Box>
//       </Box>
//     </Box>
//   );
// };

// export default ChatMessage;

import React from "react";
import styled from "styled-components";
import {Box} from "@mui/material";

const ChatBubble = styled(Box)`
  max-width: 70%;
  margin: 8px 0;
  padding: 8px;
  border-radius: 20px;
  font-size: 14px;
  position: relative;
  clear: both;
  overflow-wrap: break-word;

  background: ${(props) =>
    props.is_sent
      ? "linear-gradient(45deg, #DCF8C6, #B5E88E)"
      : "linear-gradient(45deg, #ECE5DD, #D8CAB4)"};

  float: ${(props) => (props.isSent ? "right" : "left")};

  &::before {
    content: "";
    width: 0;
    height: 0;
    border-style: solid;
    position: absolute;

    ${(props) =>
      props.isSent
        ? `
      top: 50%;
      right: -15px;
      border-width: 8px 0 8px 10px;
      border-color: transparent transparent transparent #DCF8C6;
    `
        : `
      top: 50%;
      left: -15px;
      border-width: 8px 10px 8px 0;
      border-color: transparent #ECE5DD transparent transparent;
    `}
  }
`;

const MessageText = styled.p`
  margin: 0;
  color: #333;
`;

const MessageDetails = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 12px;
  color: #888;
`;

const Sender = styled.span`
  font-weight: bold;
`;

const Timestamp = styled.span`
  margin-left: 8px;
`;

const ChatMessage = ({message, sender, timestamp, is_sent}) => {
  return (
    <ChatBubble is_sent={is_sent}>
      <MessageText>{message}</MessageText>
      <MessageDetails>
        <Sender>{sender}</Sender>
        <Timestamp>{timestamp}</Timestamp>
      </MessageDetails>
    </ChatBubble>
  );
};

export default ChatMessage;
