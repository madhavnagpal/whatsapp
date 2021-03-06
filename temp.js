import { Avatar, IconButton } from "@material-ui/core";
import { useRouter } from "next/dist/client/router";
import { useAuthState } from "react-firebase-hooks/auth";
import styled from "styled-components";
import { auth, db } from "../firebase";
import getReceipientEmail from "../utils/getReceipientEmail";
import { useCollection } from "react-firebase-hooks/firestore";
import Message from "./Message";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import { useState, useRef } from "react";
import firebase from "firebase";
import HomeIcon from "@material-ui/icons/Home";

function ChatScreen({ chat }) {
  const counter = useRef(0);
  console.log("chat screen running", counter.current++);
  const [user] = useAuthState(auth);
  const [input, setInput] = useState("");
  const router = useRouter();
  const endOfMessageRef = useRef(null);
  const recepientEmail = getReceipientEmail(chat.users, user);
  const [recepientSnapShot] = useCollection(
    db.collection("users").where("email", "==", recepientEmail)
  );

  const [messagesSnapshot] = useCollection(
    db
      .collection("chats")
      .doc(router.query.id)
      .collection("messages")
      .orderBy("timestamp", "asc")
  );

  const showMessages = () => {
    try {
      const temp = messagesSnapshot?.docs?.map((message) => (
        <Message
          key={message.id}
          user={message.data().user}
          message={{
            ...message.data(),
            timestamp: message.data().timestamp?.toDate().getTime(),
          }}
        />
      ));
      return temp;
    } catch (err) {
      return <p>Error while fetching messages</p>;
    }
  };

  function scrollToBottom() {
    endOfMessageRef.current.scrollIntoView({
      behaviour: "smooth",
      block: "start",
    });
  }

  function redirectToHomePage() {
    router.push(`/`);
  }

  function sendMessage(event) {
    event.preventDefault();
    try {
      db.collection("users").doc(user.uid).set(
        {
          lastSeen: firebase.firestore.FieldValue.serverTimestamp(),
        },
        { merge: true }
      );

      db.collection("chats").doc(router.query.id).collection("messages").add({
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        message: input,
        user: user.email,
        photoURL: user.photoURL,
      });
    } catch (error) {
      alert("error while sending msg", error);
    }
  }

  const receipentObj = recepientSnapShot?.docs?.[0]?.data();

  return (
    <Container>
      <Header>
        {receipentObj ? (
          <Avatar src={receipentObj.photoURL} />
        ) : (
          <Avatar>{recepientEmail[0]}</Avatar>
        )}

        <HeaderInformation>
          <Heading>{recepientEmail}</Heading>
          <br />
        </HeaderInformation>
        <IconButton>
          <StyledHomeIcon onClick={redirectToHomePage} />
        </IconButton>
      </Header>

      <MessageContainer id="MessageContainer">
        {showMessages()}
        <EndOfMessage ref={endOfMessageRef} />
      </MessageContainer>

      <InputContainer>
        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message here ..."
        />
        <button hidden disabled={!input} type="submit" onClick={sendMessage}>
          Send Message
        </button>
        <IconButton>
          <SendButton disabled={!input} type="submit" onClick={sendMessage}>
            <SendMessageIcon />
          </SendButton>
        </IconButton>
      </InputContainer>
    </Container>
  );
}
const Container = styled.div`
  background-color: var(--main-bg-medium);
  height: 100vh;
`;

const Header = styled.div`
  background-color: var(--main-bg-medium);
  color: white;
  padding: 5px;
  font-size: 0.8rem;
  position: sticky;
  z-index: 101;
  display: flex;
  align-items: center;
  height: 10vh;
  top: 0;
`;

const HeaderInformation = styled.div`
  margin-left: 25px;
  flex: 1;
`;

const Heading = styled.span`
  font-weight: bold;
  font-size: 1rem;
  display: inline-block;
  margin-bottom: 3px;
`;

const StyledHomeIcon = styled(HomeIcon)`
  color: white;
`;

const MessageContainer = styled.div`
  padding: 30px;
  height: 80vh;
  overflow-y: auto;
  padding-top: 100px;
  ::-webkit-scrollbar {
    width: 15px;
    background-color: white;
  }
  ::-webkit-scrollbar-track {
    background-color: white;
  }
  ::-webkit-scrollbar-thumb {
    border-radius: 10px;
    background-color: #555;
  }
`;

const EndOfMessage = styled.div`
  margin-bottom: 50px;
`;

const InputContainer = styled.form`
  display: flex;
  background-color: var(--main-bg-medium);
  height: 10vh;
  align-items: center;
  padding: 5px 10px;
  position: sticky;
  bottom: 0;
  z-index: 100;
`;

const Input = styled.input`
  flex: 1;
  outline: 0;
  border: none;
  border-radius: 10px;
  background-color: whitesmoke;
  padding: 15px;
`;

const SendButton = styled.button`
  border: none;
  color: white;
  background-color: var(--main-bg-medium);
`;

const SendMessageIcon = styled(ExitToAppIcon)`
  &&& {
    font-size: 2rem;
  }
`;

export default ChatScreen;
