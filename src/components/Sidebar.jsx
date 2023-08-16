import {Box, Paper} from "@mui/material";
import SideNav from "./SideNav";
import SearchIcon from "@mui/icons-material/Search";
import FilterListIcon from "@mui/icons-material/FilterList";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import {useState, useEffect} from "react";
import MsgList from "./MsgList";
import firebase from "../lib/firebase";
import {getFirestore, collection, getDocs} from "firebase/firestore";

const Sidebar = ({user}) => {
  const [inputFocused, setInputFocused] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [messagedUsers, setMessagedUsers] = useState([]);
  const [userList, setUserList] = useState([]);

  const db = getFirestore(firebase);

  useEffect(() => {
    const fetchAllMessagedUsers = async () => {
      const messagedUsersRef = collection(db, "users", user.email, "chats");
      const messagedUsersSnapshot = await getDocs(messagedUsersRef);
      // console.log(messagedUsersSnapshot.docs);

      //fetch msgd users details from users collection
      const messagedUsers = messagedUsersSnapshot.docs.map((doc) => {
        return doc.id;
      });
      // console.log(messagedUsers);

      const usersRef = collection(db, "users");
      const usersSnapshot = await getDocs(usersRef);
      const users = usersSnapshot.docs.map((doc) => {
        return doc.data();
      });

      const messagedUsersDetails = users.filter((user) => {
        return messagedUsers.includes(user.email);
      });

      setMessagedUsers(messagedUsersDetails);
      setUserList(messagedUsers);

      console.log(messagedUsers);
    };
    fetchAllMessagedUsers();
  }, [db, user.email]);

  useEffect(() => {
    if (searchInput === "") {
      setUserList(messagedUsers);
      return;
    } else {
      const filteredUsers = messagedUsers.filter((user) => {
        return user.name.toLowerCase().includes(searchInput.toLowerCase());
      });
      setUserList(filteredUsers);
    }
  }, [searchInput, messagedUsers]);

  console.log(messagedUsers);

  return (
    <Box sx={{minWidth: "330px", width: "30vw", maxHeight: "100vh"}}>
      <SideNav user={user} />
      <Box sx={{height: "7vh", display: "flex", margin: "0.5em"}}>
        <Paper
          sx={{
            bgcolor: "#F0F2F5",
            display: "flex",
            alignItems: "center",
            width: "90%",
            borderRadius: "10px",
            // border: "2px solid black",
          }}>
          <div style={{padding: "0.5em"}}>
            {inputFocused ? <ArrowBackIcon /> : <SearchIcon />}
          </div>
          <input
            placeholder="search or start new chat"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            onFocus={() => setInputFocused(true)}
            onBlur={() => setInputFocused(false)}
            style={{
              fontSize: "1.2rem",
              backgroundColor: "#F0F2F5",
              height: "30px",
              width: "100%",
              border: "none",
              outline: "none",
              // borderColor: inputFocused ? "transparent" : "transparent",
            }}
          />
        </Paper>
        <FilterListIcon sx={{m: "0.5em"}} />
      </Box>

      <MsgList users={userList} />
    </Box>
  );
};

export default Sidebar;
