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

function UpdateUser({ userId, refetchUserList, focusUpdateUser }) {
  const updateState = () => {
    setName("");
    setEmail("");
  };

  const updateParent = () => {
    refetchUserList();
  };

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [updateUser, { loading, error, networkStatus }] = useMutation(UPDATE_USER, {
    update: updateState,
    onCompleted: updateParent
  });

  const toggleDropdown = () => {
    focusUpdateUser();
    if (document.getElementById(`u-user-form-${userId}`).classList.contains('u-user-form-dropdown')) {
      document.getElementById(`u-user-form-${userId}`).classList.remove('u-user-form-dropdown');
      document.getElementById(`u-user-title-${userId}`).classList.add('title-button');
    } else {
      document.getElementById(`u-user-form-${userId}`).classList.add('u-user-form-dropdown');
      document.getElementById(`u-user-title-${userId}`).classList.remove('title-button');
    };
  };

  if (networkStatus === 4) return "Refetching!";
  if (loading) return "Loading...";
  if (error) return `Error ${error.message}`;

  return (
    <div className="u-user-wrapper">
      <div>
        <h3 id={`u-user-title-${userId}`} className="u-user-title-closed title-button" onClick={toggleDropdown}>Update</h3>
        {/* <h3 id={`u-user-title-${userId}`} className="u-user-title-open title-button" onClick={toggleDropdown}>Update Existing User  ▼ ✖</h3> */}
      </div>
      <form id={`u-user-form-${userId}`} className="u-user-form expandable" onSubmit={e => {
        e.preventDefault();
        updateUser({
          variables: { id: userId, name: name, email: email }
        });
      }}>
        <input className="u-user-input" type="text" value={name} placeholder="Name" onChange={(e) => setName(e.target.value)} />
        <input className="u-user-input" type="text" value={email} placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
        <button className="u-user-button" type="submit">Update User</button>
        <h3 id={`u-user-title-${userId}`} className="u-user-title-closed title-button" onClick={toggleDropdown}>✖</h3>
      </form>
    </div>
  );
};

export default UpdateUser;
