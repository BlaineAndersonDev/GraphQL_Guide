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

function CreateUser({ onRefetchUsers, onUserSelected }) {
  const updateState = () => {
    setName("");
    setEmail("");
  };

  const updateParent = (data) => {
    // Use "onRefetchUsers" to create user and update the users page.
    onRefetchUsers(true)
    // Use "onUserSelected" to create user and load the show page.
    // onUserSelected(data.createUser.user)
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
    <div>
      <div>State - Name: {name}</div>
      <div>State - Email: {email}</div>
      <form
        onSubmit={e => {
          e.preventDefault();
          createUser({ 
            variables: { 
              name: name,
              email: email
             } 
          });
        }}
      >
      <div>
        <input
          type="text"
          value={name}
          placeholder="Name"
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div>
        <input
          type="text"
          value={email}
          placeholder="Name"
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
        <button type="submit">Add Todo</button>
      </form>
    </div>
  );
};

export default CreateUser;
