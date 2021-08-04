import styled from "styled-components";
import moment from "moment";

function Status({ title, description, date }) {
  console.log(date, "date");
  const displayDate = new Date(date);

  return (
    <Container>
      <Title>{title}</Title>
      <Description>{description}</Description>
      <DateContainer>
        {moment(displayDate).format("MMMM Do YYYY")}
      </DateContainer>
    </Container>
  );
}

const Container = styled.div`
  padding: 20px;
  margin: 20px 10px;
  background: whitesmoke;
  padding-bottom: 50px;
  position: relative;
  margin-bottom: 30px;
`;

const Title = styled.h3``;

const Description = styled.p`
  margin: 10px 0px;
`;

const DateContainer = styled.div`
  float: right;
  position: absolute;
  bottom: 10px;
  right: 30px;
`;

export default Status;
