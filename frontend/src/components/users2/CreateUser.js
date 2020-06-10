import React, { useState } from "react";
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
  const [createUser, { loading, error }] = useMutation(CREATE_USER, {
    update: updateState,
    onCompleted: updateParent
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return (
    <div id="create-user-wrapper">
      <h3>Create New User</h3>
      <form onSubmit={e => {
        e.preventDefault();
        createUser({
          variables: { name: name, email: email }
        });
        setName("");
        setEmail("");
      }}>
        <input type="text" value={name} placeholder="Name" onChange={(e) => setName(e.target.value)} />
        <input type="text" value={email} placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
        <button type="submit">Create User</button>
      </form>
    </div>
  );
};

export default CreateUser;
