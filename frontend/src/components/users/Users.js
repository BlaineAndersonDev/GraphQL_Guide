import React from 'react';
import "./Users.css";
import { useQuery } from "@apollo/react-hooks";
import gql from 'graphql-tag';

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

function Users({ selectUser }) {
  const { loading, error, data } = useQuery(GET_USERS);

  if (loading) return "Loading...";
  if (error) return `Error ${error.message}`;

  return (
    <React.Fragment>
      <div id="users-wrapper">
        {data.users.map((user) => (
          <div
            className="users-container"
            key={user.id}
            onClick={selectUser.bind(this, user)}
          >
            <h3>{user.name}</h3>
            <p>{user.email}</p>
            <p>{user.postsCount} posts</p>
          </div>
        ))}
      </div>
    </React.Fragment>
  );
}

export default Users;