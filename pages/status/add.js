import React, { useState } from "react";
import styled from "styled-components";

import "@syncfusion/ej2-base/styles/material.css";
import "@syncfusion/ej2-buttons/styles/material.css";
import "@syncfusion/ej2-inputs/styles/material.css";
import "@syncfusion/ej2-popups/styles/material.css";
import "@syncfusion/ej2-react-calendars/styles/material.css";
import { DatePickerComponent } from "@syncfusion/ej2-react-calendars";

import StatusContainer from "../../components/StatusContainer";
import { useAuthState } from "react-firebase-hooks/auth";
import { db, auth } from "../../firebase";

function Add() {
  const [status, setStatus] = useState({
    title: "",
    description: "",
    date: new Date(new Date().getTime() + 24 * 60 * 60 * 1000).toISOString(),
  });
  const [user] = useAuthState(auth);

  const tommorrowDate = new Date(new Date().getTime() + 24 * 60 * 60 * 1000);
  const maxStatusDate = new Date(
    new Date().getTime() + 7 * 24 * 60 * 60 * 1000
  );

  const handleChange = (event) => {
    const { name, value } = event.target;
    setStatus((prevStatus) => ({ ...prevStatus, [name]: value }));
  };

  const handleDateChange = (event) => {
    let { value } = event.target;
    value = new Date(value);
    value = value.toISOString();
    setStatus((prevStatus) => ({ ...prevStatus, date: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    db.collection("users").doc(user.uid).collection("status").add(status);
    setStatus({
      title: "",
      description: "",
      date: tommorrowDate,
    });
  };

  return (
    <StatusContainer>
      <Container>
        <Form onSubmit={handleSubmit}>
          <FormGroup>
            <Label>Title</Label>
            <Input
              type="text"
              name="title"
              value={status.title}
              onChange={handleChange}
              placeholder="enter status title here"
              required
            />
          </FormGroup>
          <FormGroup>
            <Label>Description</Label>
            <TextArea
              rows={4}
              name="description"
              value={status.description}
              onChange={handleChange}
              placeholder="elobarate your status here"
              required
            />
          </FormGroup>
          <FormGroup>
            <Label>Date of Status Disappearing</Label>
            <DatePickerComponent
              name="date"
              value={status.date}
              onChange={handleDateChange}
              placeholder="Select date"
              format="dd-MMM-yy"
              min={tommorrowDate}
              max={maxStatusDate}
            />
          </FormGroup>
          <SubmitButton>Add Status</SubmitButton>
        </Form>
      </Container>
    </StatusContainer>
  );
}

const Container = styled.div`
  width: 90%;
  margin: 0 auto;
  margin-top: 50px;
  max-width: 600px;
  background: whitesmoke;
`;

const Form = styled.form`
  background: whitesmoke;
  padding-bottom: 100px;
  position: relative;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px 20px;
`;

const Label = styled.label``;

const Input = styled.input`
  padding: 6px 10px;
  font-size: 0.9rem;
  font-family: inherit;
`;

const TextArea = styled.textarea`
  padding: 5px 10px;
  padding: 6px 10px;
  font-family: inherit;
  font-size: 0.9rem;
`;

const SubmitButton = styled.button`
  position: absolute;
  right: 20px;
  bottom: 20px;
  width: 100px;
  padding: 5px 10px;
  font-family: inherit;
  background-color: var(--main-bg-medium);
  color: white;
  &:hover {
    background-color: var(--main-bg-hover);
    cursor: pointer;
  }
`;

export default Add;
