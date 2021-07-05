import Head from "next/head";
import styled from "styled-components";
import { Button } from "@material-ui/core";
import { auth, provider } from "../firebase";

function login() {
  function handleSignInWithGoogle() {
    auth.signInWithPopup(provider).catch(alert);
  }

  return (
    <Container id="MessageContainer">
      <Head>
        <title>Login</title>
      </Head>

      <LoginCard>
        <h1>Chit-Chat</h1>
        <LoginButton variant="outlined" onClick={handleSignInWithGoogle}>
          SignIn with Google
        </LoginButton>
      </LoginCard>
    </Container>
  );
}

export default login;

const Container = styled.div`
  display: grid;
  place-items: center;
  height: 100vh;
  width: 100vw;
`;

const LoginCard = styled.div`
  padding-top: 26px;
  padding-bottom: 66px;
  max-width: 420px;
  width: 80%;
  margin: 0 auto;
  background-color: white;
  border-radius: 22px;
  display: flex;
  flex-direction: column;
  align-items: center;

  h1 {
    text-align: center;
  }
`;

const LoginButton = styled(Button)`
  max-width: 300px;
  width: 80%;
  margin: 0 auto;
  &&& {
    background-color: var(--main-bg-dark);
    color: white;
    margin-top: 20px;
  }
  :hover {
    &&& {
      background-color: var(--main-bg-light);
    }
  }
`;
