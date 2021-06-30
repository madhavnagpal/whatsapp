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
  padding: 2px 20px;
  padding-bottom: 20px;
  border-radius: 8px;
  margin: 10px;
  min-width: 60px;
  position: relative;
  text-align: left;
`;

const Sender = styled(MessageElement)`
  margin-left: auto;
  background-color: #006aff;
  color: white;
`;

const Receiver = styled(MessageElement)`
  text-align: left;
  background-color: #fff5b7;
`;

const TimeStamp = styled.span`
  padding: 5px;
  font-size: 0.6rem;
  position: absolute;
  bottom: 0;
  text-align: right;
  right: 0;
`;

export default Message;
