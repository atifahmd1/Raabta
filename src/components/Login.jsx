import {Box, Button} from "@mui/material";
import React from "react";
import logo from "../assets/images/logo.png";
import googleLogo from "../assets/images/google-logo.png";
import firebase from "../lib/firebase";
import {signInWithPopup, getAuth, GoogleAuthProvider} from "firebase/auth";
import {getFirestore, doc, setDoc} from "firebase/firestore";

import {useNavigate} from "react-router-dom";

const Login = ({setUser}) => {
  const navigate = useNavigate();
  const auth = getAuth(firebase);
  const googleProvider = new GoogleAuthProvider();

  const db = getFirestore(firebase);

  const handleLoginWithGoogle = async () => {
    await signInWithPopup(auth, googleProvider)
      .then((result) => {
        const user = {
          name: result.user.displayName,
          email: result.user.email,
          photo: result.user.photoURL,
        };
        localStorage.setItem("user", JSON.stringify(user));
        navigate("/");
        setUser(user);

        // db.collection("users").doc(result.user.email).set(user, {merge: true});
        setDoc(doc(db, "users", result.user.email), user, {merge: true});
      })
      .catch((error) => {
        alert(error.message);
      });
  };
  return (
    <Box
      sx={{
        background:
          "linear-gradient(145deg, rgba(0,0,0,1) 0%, rgba(89,165,44,1) 100%)",
        width: "100vw",
        height: "222px",
        zIndex: -1,
      }}>
      <Box
        sx={{
          position: "absolute",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "400px",
          height: "400px",
          margin: "150px 35%",
          //   marginTop: "150px",
          background: "#fff",
          flexDirection: "column",
          borderRadius: "10px",
          zIndex: 1,
          boxShadow:
            "0 17px 50px 0 rgb(0 0 0 / 19%), 0 12px 15px 0 rgb(0 0 0 / 24%)",
        }}>
        <img
          src={logo}
          alt="raabta-logo"
          style={{
            width: "200px",
            height: "200px",
            // marginBottom: "20px",
          }}
        />
        <p
          style={{
            fontSize: "3rem",
            fontWeight: "bold",
            color: "#59a52c",
            marginTop: "-40px",
            marginBottom: "20px",
          }}>
          Raabta
        </p>

        <Button
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: "40px",
            width: "200px",
            border: "none",
            outline: "none",
            cursor: "pointer",
            fontSize: "18px",
            borderRadius: "5px",
            textTransform: "none",
            "&:hover": {
              backgroundColor: "#59a52c",
              color: "#fff",
            },
          }}
          onClick={() => {
            console.log("clicked");
            handleLoginWithGoogle();
          }}>
          <img
            src={googleLogo}
            alt="login with google"
            style={{
              width: "20px",
              height: "20px",
              marginRight: "10px",
            }}
          />
          <span
            style={{
              color: "#000",
              FontFace: "Roboto",
              fontSize: "18px",
            }}>
            Login with Google
          </span>
        </Button>
      </Box>
    </Box>
  );
};

export default Login;
