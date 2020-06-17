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

function UpdateUser({ user, handleUpdate, ToggleUpdatePanel }) {
  const updateState = () => {
    setName(user.name);
    setEmail(user.email);
  };

  const updateParent = () => {
    ToggleUpdatePanel(user.id)
    handleUpdate();
  };

  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [updateUser, { loading, error, networkStatus }] = useMutation(UPDATE_USER, {
    update: updateState,
    onCompleted: updateParent
  });

  if (networkStatus === 4) return "Refetching!";
  if (loading) return "Loading...";
  if (error) return `Error ${error.message}`;

  return (
    <div className="update-user-wrapper">
      <form className="update-user-form"onSubmit={e => {
        e.preventDefault();
        updateUser({
          variables: { id: user.id, name: name, email: email }
        });
      }}>
        <h3 className="update-user-title">Update User</h3>
        <input 
          className="update-user-input" 
          type="text" 
          value={name} 
          placeholder="Name" 
          onChange={(e) => setName(e.target.value)} 
        />
        <input 
          className="update-user-input" 
          type="text" 
          value={email} 
          placeholder="Email" 
          onChange={(e) => setEmail(e.target.value)} 
        />
        <button className="update-user-button" type="submit">Submit</button>
      </form>
      <button className="update-user-button cancel-button" onClick={() => { ToggleUpdatePanel(user.id) }}>✖</button>
    </div>
  );
};

export default UpdateUser;
