import React, { useState } from "react";
import "./styles/CreateUser.css";
import gql from "graphql-tag";
import { useMutation } from "react-apollo";

const CREATE_USER = gql`
  mutation CreateUser($name: String!, $email: String!) {
    createUser(input: { name: $name, email: $email }) {
      user {
        id
        name
        email
        postsCount
      }
      errors
    }
  }
`;

function CreateUser({ forceRefresh }) {
  const updateState = () => {
    setName("");
    setEmail("");
  };

  const updateParent = () => {
    forceRefresh();
  };

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [createUser, { loading, error, networkStatus }] = useMutation(CREATE_USER, {
    update: updateState,
    onCompleted: updateParent
  });

  if (networkStatus === 4) return "Refetching!";
  if (loading) return "Loading...";
  if (error) return `Error ${error.message}`;

  return (
    <div id="create-user-wrapper">
      <h3 id="create-user-title">Create New User</h3>
      <form id="create-user-form" onSubmit={e => {
        e.preventDefault();
        createUser({
          variables: { name: name, email: email }
        });
        setName("");
        setEmail("");
      }}>
        <input className="create-user-input" type="text" value={name} placeholder="Name" onChange={(e) => setName(e.target.value)} />
        <input className="create-user-input" type="text" value={email} placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
        <button className="create-user-button" type="submit">Create User</button>
      </form>
    </div>
  );
};

export default CreateUser;
