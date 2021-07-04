import styled from "styled-components";
import { Avatar, IconButton, Button } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import * as EmailValidator from "email-validator";
import { auth, db } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollection } from "react-firebase-hooks/firestore";
import PowerSettingsNewIcon from "@material-ui/icons/PowerSettingsNew";
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
          <LogoutIcon onClick={() => auth.signOut()} />
        </IconButton>
      </Header>

      {/* <SearchContainer>
        <SearchIcon />
        <SearchInput placeholder="Search in chats" />
      </SearchContainer> */}
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
  background-color: var(--main-bg-medium);
  color: white;
  min-width: 300px;
  max-width: 350px;
  height: 100vh;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: var(--main-bg-medium);
  align-items: center;
  position: sticky;
  top: 0;
  z-index: 1;
  padding: 5.2px 10px;
`;

const UserAvatar = styled(Avatar)`
  :hover {
    opacity: 0.8;
  }
`;

const LogoutIcon = styled(PowerSettingsNewIcon)`
  color: white;
`;

const SearchContainer = styled.div`
  background-color: whitesmoke;
  display: flex;
  align-items: center;
  padding: 20px;
  > input {
    background-color: whitesmoke;
  }
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
    background-color: var(--main-bg-dark);
    color: white;
    :hover {
      background-color: var(--main-bg-light);
    }
  }
`;
