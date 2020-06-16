import React from "react";
import "./styles/DeleteUser.css";
import gql from "graphql-tag";
import { useMutation } from "react-apollo";
import DeleteIcon from './styles/Trash.svg';

const DELETE_USER = gql`
  mutation DeleteUser($id: ID!) {
    deleteUser(input: { id: $id }) {
      user {
        id
      }
      errors
    }
  }
`;

function DeleteUser({ userId, refetchUserList }) {

  const updateParent = () => {
    refetchUserList();
  };

  const [deleteUser, { loading, error, networkStatus }] = useMutation(DELETE_USER, {
    onCompleted: updateParent,
  });

  if (networkStatus === 4) return "Refetching!";
  if (loading) return "Loading...";
  if (error) return `Error ${error.message}`;

  return (
    <div id="delete-user-wrapper">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          deleteUser({
            variables: {
              id: userId,
            },
          });
        }}
      >
        <button className="delete-user-button" type="submit">
          <img
            src={DeleteIcon}
            alt="Delete"
          />
        </button>
      </form>
    </div>
  );
};

export default DeleteUser;
