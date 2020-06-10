import React, { useState } from "react";
import { useQuery, useMutation } from "@apollo/react-hooks";
import "../users/Users.css";
import gql from "graphql-tag";

const GET_USERS = gql`
  query {
    users {
      id
      name
      email
      postsCount
    }
  }
`;

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

function Users({ refreshCount, handleSelectedUser }) {

  const refetchUserList = () => {
    refetch()
  };

  const { loading, error, data, refetch, networkStatus } = useQuery(GET_USERS);

  const [deleteUser] = useMutation(DELETE_USER, {
    onCompleted: refetchUserList
  });

  if (networkStatus === 4) return "Refetching!";
  if (loading) return <p>loading...</p>;
  if (error) return <p>ERROR</p>;
  if (!data) return <p>Not found</p>;
  if (refreshCount) {
    refetch();
  };

  return (
    <div id="users-wrapper">
      <div id="users-wrapper">
        {data.users.map((user) => (
          <div className="users-container" key={user.id} >
            <h3>{user.name}</h3>
            <p>{user.email}</p>
            <p>{user.postsCount} posts</p>
            {/* GET USER */}
            <button onClick={() => { handleSelectedUser(user); }}>
              Select
            </button>
            {/* DELETE */}
            <button onClick={() => { deleteUser({ variables: { id: user.id } }); }}>
              Delete
            </button>
          </div>
        ))}
      </div>

    </div>
  );
}

export default Users;