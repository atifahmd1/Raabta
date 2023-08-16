import {Box} from "@mui/material";
import React, {useState} from "react";
import ChatNav from "./ChatNav";
import ChatFooter from "./ChatFooter";
import ChatMessage from "./ChatMessage";
import EmojiPicker from "emoji-picker-react";
import {useParams} from "react-router-dom";
import Sidebar from "./Sidebar";
import {useEffect} from "react";
import firebase from "../lib/firebase";
import {
  getFirestore,
  collection,
  doc,
  setDoc,
  getDocs,
} from "firebase/firestore";

const Chat = ({user}) => {
  const {emailId} = useParams();
  const [msg, setMsg] = useState("");
  const [openEmojiPicker, setOpenEmojiPicker] = useState(false);
  const [chatUser, setChatUser] = useState(null);
  // console.log(emailId);

  const db = getFirestore(firebase);

  // const messages = [
  //   {
  //     message: "Hello!",
  //     sender: "John",
  //     timestamp: "10:00 AM",
  //     is_sent: false,
  //   },
  //   {
  //     message: "Hi John! How are you?",
  //     timestamp: "10:02 AM",
  //     is_sent: true,
  //   },
  //   // Add more messages as needed
  // ];

  //fetch chat with the user
  const [messages, setMessages] = useState([]);

  // console.log(messages);

  //send message to the database
  useEffect(() => {
    if (emailId) {
      const getUser = async () => {
        const querySnapshot = await getDocs(collection(db, "users"));
        querySnapshot.forEach((doc) => {
          if (doc.id === emailId) {
            setChatUser(doc.data());
            // console.log(chatUser);
          }
        });
      };
      getUser();
    }
  }, [emailId, db]);

  const sendMessage = (e) => {
    e.preventDefault();
    if (msg === "") return;
    //send to both users chats
    const senderRef = doc(
      db,
      "users",
      user.email,
      "chats",
      emailId,
      "messages",
      new Date().getTime().toString()
    );
    const receiverRef = doc(
      db,
      "users",
      emailId,
      "chats",
      user.email,
      "messages",
      new Date().getTime().toString()
    );

    setDoc(senderRef, {
      name: chatUser.name,
      photo: chatUser.photo,
      email: emailId,
      last_message: msg,
      time: new Date().toLocaleTimeString(),
      date: new Date().toLocaleDateString(),
    });

    setDoc(receiverRef, {
      name: user.name,
      photo: user.photo,
      email: user.email,
      last_message: msg,
      time: new Date().toLocaleTimeString(),
      date: new Date().toLocaleDateString(),
    });

    setMsg("");
  };

  // console.log(chatUser.name);

  useEffect(() => {
    if (emailId) {
      const getMessages = async () => {
        const querySnapshot = await getDocs(
          collection(db, "users", user.email, "chats", emailId, "messages")
        );
        const messages = querySnapshot.docs.map((doc) => {
          return doc.data();
        });

        setMessages(messages);
      };
      getMessages();
    }
  }, [emailId, db, user.email]);

  return (
    <Box display={"flex"}>
      <Sidebar user={user} />
      <Box width={"70%"}>
        <ChatNav dp={chatUser?.photo} name={chatUser?.name} status={"active"} />
        <Box height={"77vh"} width={"100%"} bgcolor={"gray"}>
          {messages.map((msg, index) => (
            <ChatMessage
              key={index}
              message={msg.last_message}
              sender={msg.sender}
              timestamp={msg.timestamp}
              is_sent={msg.is_sent}
            />
          ))}
          <Box position={"absolute"} bottom={"10vh"}>
            {openEmojiPicker && (
              <EmojiPicker
                onEmojiClick={(emojiObject, e) =>
                  setMsg(msg + emojiObject.emoji)
                }
              />
            )}
          </Box>
        </Box>

        <ChatFooter
          msg={msg}
          setMsg={setMsg}
          openEmojiPicker={openEmojiPicker}
          setOpenEmojiPicker={setOpenEmojiPicker}
          sendMessage={sendMessage}
        />
      </Box>
    </Box>
  );
};

export default Chat;
