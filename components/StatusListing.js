import { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollection } from "react-firebase-hooks/firestore";
import styled from "styled-components";
import { auth, db } from "../firebase";
import getReceipientEmail from "../utils/getReceipientEmail";
import Status from "./Status";

function StatusListing({ users }) {
  const [user] = useAuthState(auth);
  const recepientEmail = getReceipientEmail(users, user);
  const [recepientSnapShot] = useCollection(
    db.collection("users").where("email", "==", recepientEmail)
  );
  const recepientId = recepientSnapShot?.docs[0]?.id;

  const [statusSnapshot] = useCollection(
    db.collection("users").doc(recepientId).collection("status")
  );

  return (
    <Container>
      <div>
        {statusSnapshot?.docs?.length ? (
          <UserName>{recepientEmail}</UserName>
        ) : null}
      </div>
      {statusSnapshot &&
        statusSnapshot.docs.map((status) => {
          return <Status key={status.id} {...status.data()} />;
        })}
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 5px;
  word-break: break-word;
`;

const UserName = styled.h2``;

export default StatusListing;
