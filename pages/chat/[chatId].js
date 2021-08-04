import styled from "styled-components";
import Head from "next/head";
import Sidebar from "../../components/Sidebar";
import ChatScreen from "../../components/ChatScreen";
import { auth, db } from "../../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import getReceipientEmail from "../../utils/getReceipientEmail";

function Chat({ chat, messages }) {
  const [user] = useAuthState(auth);
  return (
    <Container>
      <Head>
        <title>Chat with {getReceipientEmail(chat.users, user)}</title>
      </Head>
      <SidebarWrapper>
        <Sidebar />
      </SidebarWrapper>
      <ChatContainer>
        <ChatScreen chat={chat} messages={messages} />
      </ChatContainer>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
`;

const SidebarWrapper = styled.div`
  flex: 0.45;
  min-width: 300px;
  height: 100vh;
  @media (max-width: 650px) {
    flex: 0;
    display: none;
  }
`;

const ChatContainer = styled.div`
  flex: 1;
  height: 100vh;
  overflow: scroll;
  ::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none;
  scrollbar-width: none;
  @media (max-width: 650px) {
  }
`;

export default Chat;

export async function getServerSideProps(context) {
  const ref = db.collection("chats").doc(context.query.chatId);

  const messagesRes = await ref
    .collection("messages")
    .orderBy("timestamp", "asc")
    .get();

  const messages = messagesRes.docs
    .map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }))
    .map((message) => ({
      ...message,
      timestamp: message.timestamp.toDate().getTime(),
    }));

  const chatRes = await ref.get();
  const chat = {
    id: chatRes.id,
    ...chatRes.data(),
  };
  return {
    props: {
      messages: JSON.stringify(messages),
      chat,
    },
  };
}
