import React from "react";
import gql from "graphql-tag";
import { useMutation } from "react-apollo";

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


function DeleteUser({ userId, refreshUsersList }) {

  const updateParent = () => {
    refreshUsersList();
  };

  const [deleteUser, { loading, error }] = useMutation(DELETE_USER, {
    onCompleted: updateParent,
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return (
    <div>
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
        <button type="submit">Delete</button>
      </form>
    </div>
  );
};

export default DeleteUser;
