import { Avatar, IconButton } from "@material-ui/core";
import { useRouter } from "next/dist/client/router";
import { useAuthState } from "react-firebase-hooks/auth";
import styled from "styled-components";
import { auth, db } from "../firebase";
import getReceipientEmail from "../utils/getReceipientEmail";
import { useCollection } from "react-firebase-hooks/firestore";
import Message from "./Message";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import { useState, useRef, useEffect } from "react";
import firebase from "firebase";
import TimeAgo from "timeago-react";
import HomeIcon from "@material-ui/icons/Home";

function ChatScreen({ chat, messages }) {
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

  function showMessages() {
    if (messagesSnapshot) {
      return messagesSnapshot.docs.map((message) => (
        <Message
          key={message.id}
          user={message.data().user}
          message={{
            ...message.data(),
            timestamp: message.data().timestamp?.toDate().getTime(),
          }}
        />
      ));
    } else {
      return JSON.parse(messages).map((message) => (
        <Message
          key={message.id}
          user={message.user}
          message={{
            ...message,
            // timestamp: message.timestamp?.toDate().getTime(),
          }}
        />
      ));
    }
  }

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

    // Update the last seen...
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

    setInput("");
    scrollToBottom();
  }

  useEffect(() => {
    scrollToBottom();
  }, []);

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
          {recepientSnapShot ? (
            <span>
              last active:{" "}
              {receipentObj?.lastSeen?.toDate() ? (
                <TimeAgo datetime={receipentObj?.lastSeen?.toDate()} />
              ) : (
                "unavailable"
              )}
            </span>
          ) : (
            <span>Loading last active ...</span>
          )}
        </HeaderInformation>
        <IconButton>
          <StyledHomeIcon onClick={redirectToHomePage} />
        </IconButton>
      </Header>

      <MessageContainer>
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
          <SendButton disabled={!input} type="submit" onClick={sendMessage} />
        </IconButton>
      </InputContainer>
    </Container>
  );
}
const Container = styled.div``;

const Header = styled.div`
  padding: 10px;
  background-color: #006aff;
  position: sticky;
  color: white;
  z-index: 100;
  display: flex;
  align-items: center;
  top: 0;
  border-bottom: 1px solid whitesmoke;
`;

const HeaderInformation = styled.div`
  margin-left: 25px;
  flex: 1;

  > h3 {
    margin-bottom: 3px;
  }
  > p {
    font-size: 14px;
    color: gray;
  }
`;

const Heading = styled.span`
  font-size: 1.1rem;
  font-weight: bold;
`;

const StyledHomeIcon = styled(HomeIcon)`
  color: white;
`;

const MessageContainer = styled.div`
  padding: 30px;
  min-height: 90vh;
`;

const EndOfMessage = styled.div`
  margin-bottom: 50px;
`;

const InputContainer = styled.form`
  display: flex;
  align-items: center;
  padding: 5px 10px;
  position: sticky;
  bottom: 0;
  background-color: pink;
  z-index: 100;
  background-color: #006aff;
`;

const Input = styled.input`
  flex: 1;
  outline: 0;
  border: none;
  border-radius: 10px;
  background-color: whitesmoke;
  padding: 15px;
`;

const SendButton = styled(ExitToAppIcon)`
  color: #006aff;
  color: white;
  &&& {
    font-size: 2rem;
  }
`;

export default ChatScreen;
