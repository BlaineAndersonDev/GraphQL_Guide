import React, { useState } from "react";
import "./styles/UpdateUser.css";
import gql from "graphql-tag";
import { useMutation } from "react-apollo";

const UPDATE_USER = gql`
  mutation UpdateUser($id: ID!, $name: String!, $email: String!) {
    updateUser(input: { id: $id, name: $name, email: $email }) {
      user {
        id
        name
        email
      }
      errors
    }
  }
`;

function UpdateUser({ userId, refetchUserList }) {
  const updateState = () => {
    setName("");
    setEmail("");
  };

  const updateParent = () => {
    refetchUserList();
  };

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [createUser, { loading, error, networkStatus }] = useMutation(UPDATE_USER, {
    update: updateState,
    onCompleted: updateParent
  });

  if (networkStatus === 4) return "Refetching!";
  if (loading) return "Loading...";
  if (error) return `Error ${error.message}`;

  return (
    <div id="update-user-wrapper">
      <h3>Update Existing User</h3>
      <form onSubmit={e => {
        e.preventDefault();
        createUser({
          variables: { id: userId, name: name, email: email }
        });
      }}>
        <input type="text" value={name} placeholder="Name" onChange={(e) => setName(e.target.value)} />
        <input type="text" value={email} placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
        <button type="submit">Create User</button>
      </form>
    </div>
  );
};

export default UpdateUser;
