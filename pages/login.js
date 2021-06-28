import Head from "next/head";
import styled from "styled-components";
import { Button } from "@material-ui/core";
import { auth, provider } from "../firebase";

function login() {
  function handleSignInWithGoogle() {
    auth.signInWithPopup(provider).catch(alert);
  }

  return (
    <Container>
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
  background-image: linear-gradient(to left top, aqua, blue);
  display: grid;
  place-items: center;
  height: 100vh;
  width: 100vw;
`;

const LoginCard = styled.div`
  padding-top: 26px;
  padding-bottom: 66px;
  width: 420px;
  background-color: white;
  border-radius: 22px;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-shadow: 0px 4px 14px -3px blue;
`;

const LoginButton = styled(Button)`
  width: 300px;
  &&& {
    background-color: #4285f4;
    color: white;
    margin-top: 20px;
  }
  :hover {
    &&& {
      background-color: blue;
    }
  }
`;
