import {Box} from "@mui/material";
import React from "react";
import {Link} from "react-router-dom";

const ContactCard = ({dp, name, emailID, lastMsg}) => {
  return (
    <Box
      sx={{
        "&:hover": {
          backgroundColor: "#ebebeb",
        },
        "&:active": {
          backgroundColor: "#ebebeb",
        },
      }}>
      <Link
        to={`/chat/${emailID}`}
        style={{
          display: "flex",
          gap: "1rem",
          alignItems: "center",
          width: "100%",
          color: "black",
          textDecoration: "none",
          textAlign: "left",
          border: "none",
          outline: "none",
          backgroundColor: "transparent",
          cursor: "pointer",
        }}>
        <img
          src={dp}
          alt="profile pic"
          style={{
            height: "45px",
            width: "55px",
            borderRadius: "50%",
            margin: "0.5rem",
          }}
        />
        <Box
          borderBottom={"1px solid lightgray"}
          width={"100%"}
          padding={"1rem"}>
          <h3> {name} </h3>
          <p> {lastMsg} </p>
        </Box>
      </Link>
    </Box>
  );
};

export default ContactCard;
