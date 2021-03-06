import { Avatar } from "@material-ui/core";
import { useRouter } from "next/dist/client/router";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollection } from "react-firebase-hooks/firestore";
import styled from "styled-components";
import { auth, db } from "../firebase";
import getReceipientEmail from "../utils/getReceipientEmail";

function Chat({ id, users }) {
  const router = useRouter();
  const [user] = useAuthState(auth);
  const recepientEmail = getReceipientEmail(users, user);
  const [recepientSnapShot] = useCollection(
    db.collection("users").where("email", "==", recepientEmail)
  );
  const recepientData = recepientSnapShot?.docs[0]?.data();

  function enterChat() {
    router.push(`/chat/${id}?users=${users}`);
  }

  return (
    <Container onClick={enterChat}>
      {recepientData ? (
        <UserAvatar src={recepientData.photoURL} />
      ) : (
        <UserAvatar>{recepientEmail[0]}</UserAvatar>
      )}

      <span>{recepientEmail}</span>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  padding: 5px;
  word-break: break-word;
  font-size: 0.9rem;
  :hover {
    background-color: #444;
  }
`;

const UserAvatar = styled(Avatar)`
  margin: 5px;
  margin-right: 15px;
`;

export default Chat;
