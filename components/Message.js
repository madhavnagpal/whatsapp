import moment from "moment";
import { useAuthState } from "react-firebase-hooks/auth";
import styled from "styled-components";
import { auth } from "../firebase";

function Message({ user, message }) {
  const [userLoggedIn] = useAuthState(auth);

  const TypeOfMessage = user === userLoggedIn?.email ? Sender : Receiver;

  return (
    <Container>
      <TypeOfMessage>
        {message.message}
        <TimeStamp>
          {message.timestamp ? moment(message.timestamp).format("LT") : "..."}
        </TimeStamp>
      </TypeOfMessage>
    </Container>
  );
}

const Container = styled.div``;

const MessageElement = styled.div`
  width: fit-content;
  display: flex;
  padding: 5px 10px;
  border-radius: 8px;
  min-width: 120px;
  margin: 10px 0;
  position: relative;
  padding-bottom: 17px;
  word-break: break-all;
  font-size: 0.9rem;
`;

const Sender = styled(MessageElement)`
  margin-left: auto;
  background-color: var(--main-bg-color);
  color: white;
`;

const Receiver = styled(MessageElement)`
  text-align: left;
  background-color: whitesmoke;
`;

const TimeStamp = styled.span`
  padding: 5px;
  font-size: 0.6rem;
  position: absolute;
  bottom: 0;
  /* text-align: right; */
  right: 0;
`;

export default Message;
