import React from "react";
import "../users/Users.css";
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';

const GET_USERS = gql`
  {
    users {
      id
      name
      email
      postsCount
    }
  }
`;

function Users({ refetchUsers, onRefetchUsers, onUserSelected }) { //Props
  const { loading, error, data, refetch, networkStatus } = useQuery(GET_USERS, {
    // variables: { id },
    // skip: !id, // Skip if no user is selected
    // pollInterval: 500, // automatically re-fetch data (500 = 0.5s)
  });

  if (networkStatus === 4) return 'Refetching!';
  if (loading) return 'Loading...';
  if (error) return `Error! ${error.message}`;
  if (refetchUsers) {
    refetch()
  };

  return (
    <div id="users-wrapper">
      {data.users.map((user) => (
        <div
          className="users-container"
          key={user.id}
          onClick={onUserSelected.bind(this, user)}
        >
          <h3>{user.name}</h3>
          <p>{user.email}</p>
          <p>{user.postsCount} posts</p>
        </div>
      ))}
    </div>
  );
}

export default Users;
