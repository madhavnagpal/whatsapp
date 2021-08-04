import { useRouter } from "next/router";
import HomeIcon from "@material-ui/icons/Home";
import { IconButton } from "@material-ui/core";
import styled from "styled-components";

function StatusContainer({ children }) {
  const router = useRouter();
  return (
    <Container>
      <Header>
        <span>
          <NavLink onClick={() => router.push("/status/add")}>
            Add Status
          </NavLink>
          <NavLink onClick={() => router.push("/status/list")}>Listing</NavLink>
        </span>
        <IconButton>
          <StyledHomeIcon onClick={() => router.push("/")} />
        </IconButton>
      </Header>
      <ContentContainer>{children}</ContentContainer>
    </Container>
  );
}

const Container = styled.div``;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: var(--main-bg-medium);
  color: white;
`;

const NavLink = styled.button`
  margin: 5px 20px;
  padding: 5px 10px;
  background-color: var(--main-bg-medium);
  color: white;
  border: none;
  font: inherit;
  font-size: 1rem;

  &:hover {
    cursor: pointer;
    background-color: var(--main-bg-hover);
  }
`;

const StyledHomeIcon = styled(HomeIcon)`
  color: white;
`;

const ContentContainer = styled.div`
  padding: 10px;
`;

export default StatusContainer;
