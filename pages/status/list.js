import { useAuthState } from "react-firebase-hooks/auth";
import { useCollection } from "react-firebase-hooks/firestore";
import StatusListing from "../../components/StatusListing";
import StatusContainer from "../../components/StatusContainer";
import { db, auth } from "../../firebase";
import Status from "../../components/Status";

function List() {
  const [user] = useAuthState(auth);
  const userChatRef = db
    .collection("chats")
    .where("users", "array-contains", user.email);
  const [chatsSnapShot] = useCollection(userChatRef);

  const [myStatusSnapShot] = useCollection(
    db.collection("users").doc(user.uid).collection("status")
  );

  return (
    <StatusContainer>
      <div>
        <h1>Your Status</h1>
        {myStatusSnapShot &&
          myStatusSnapShot.docs.map((status) => (
            <Status key={status.id} {...status.data()} />
          ))}
      </div>
      <div>
        <h1>{"Friends' Status"}</h1>
        {chatsSnapShot?.docs.map((status) => (
          <StatusListing key={status.id} users={status.data().users} />
        ))}
      </div>
    </StatusContainer>
  );
}

export default List;
