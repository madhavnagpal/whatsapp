import styled from "styled-components";
import { Avatar, IconButton, Button } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import HttpsIcon from "@material-ui/icons/Https";
import * as EmailValidator from "email-validator";
import { auth, db } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollection } from "react-firebase-hooks/firestore";
import Chat from "./Chat";

export default function Sidebar() {
  const [user] = useAuthState(auth);
  const userChatRef = db
    .collection("chats")
    .where("users", "array-contains", user.email);
  const [chatsSnapShot] = useCollection(userChatRef);

  function createChatHandler() {
    const input = prompt(
      "Please enter an email address for the user you wish to chat with"
    );
    if (!input || !EmailValidator.validate(input)) {
      alert("Please enter a valid email address");
      return;
    }
    if (input !== user.email && !chatAlreadyExists(input)) {
      db.collection("chats").add({
        users: [user.email, input],
      });
    }
  }

  function chatAlreadyExists(recepientEmail) {
    return !!chatsSnapShot?.docs.find(
      (chat) =>
        chat.data().users.find((user) => user === recepientEmail)?.length > 0
    );
  }

  return (
    <Container>
      <Header>
        <UserAvatar src={user.photoURL} />
        <IconButton>
          <LogoutButton onClick={() => auth.signOut()}>
            Sign Out <LogoutIcon />
          </LogoutButton>
        </IconButton>
      </Header>

      <SearchContainer>
        <SearchIcon />
        <SearchInput placeholder="Search in chats" />
      </SearchContainer>

      <SidebarButton onClick={createChatHandler}>
        Start a new chat
      </SidebarButton>

      {chatsSnapShot?.docs.map((chat) => (
        <Chat key={chat.id} id={chat.id} users={chat.data().users} />
      ))}
    </Container>
  );
}

const Container = styled.div`
  flex: 0.45;
  border-radius: 1px solid whitesmoke;
  height: 100vh;
  min-width: 300px;
  max-width: 350px;
  overflow-y: scroll;
  ::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none;
  scrollbar-width: none;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: #006aff;
  align-items: center;
  position: sticky;
  top: 0;
  z-index: 1;
  padding: 5.5px 10px;
`;

const UserAvatar = styled(Avatar)`
  :hover {
    opacity: 0.8;
  }
`;

const LogoutButton = styled.button`
  background-color: #fff5b7;
  border-radius: 10px;
  padding: 7px 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-weight: bold;
  :hover {
    cursor: pointer;
    color: black;
    background-color: white;
  }
`;

const LogoutIcon = styled(HttpsIcon)`
  &&& {
    font-size: 0.95rem;
    margin-left: 5px;
  }
`;

const SearchContainer = styled.div`
  background-color: white;
  display: flex;
  align-items: center;
  padding: 20px;
  border-right: 1px solid black;
`;

const SearchInput = styled.input`
  outline-width: 0;
  border: none;
  flex: 1;
  padding-left: 10px;
`;

const SidebarButton = styled(Button)`
  width: 100%;

  &&& {
    background-color: #006aff;
    color: white;
    border-top: 1px solid whitesmoke;
    border-bottom: 1px solid whitesmoke;
    :hover {
      background-color: #fff5b7;
      color: black;
    }
  }
`;
