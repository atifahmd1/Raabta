import {Box} from "@mui/material";
import React from "react";
import ContactCard from "./ContactCard";
import demoProfilePic from "../assets/images/demo-image.jpg";

const MsgList = ({users}) => {
  return (
    <Box sx={{height: "77vh", overflow: "auto"}}>
      {users.map((user, index) => {
        return (
          <ContactCard
            key={index}
            dp={user?.photo ? user.photo : demoProfilePic}
            name={user.name}
            emailID={user.email}
            lastMsg={user.lastMsg}
          />
        );
      })}
    </Box>
  );
};

export default MsgList;
