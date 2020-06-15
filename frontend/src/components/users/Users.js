import React from "react";
import "./styles/Users.css";
import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";
import BlankAvatar from './styles/Avatar.svg';

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

function Users({ refreshCount, handleSelectedUser, UpdateUser, DeleteUser }) {

  const refetchUserList = () => {
    refetch()
  };

  const { loading, error, data, refetch, networkStatus } = useQuery(GET_USERS);

  if (networkStatus === 4) return "Refetching!";
  if (loading) return "Loading...";
  if (error) return `Error ${error.message}`;
  if (!data) return "Data not found."
  if (refreshCount) {
    refetch();
  };

  return (
    <div id="users-wrapper">
      {data.users.map((user) => (
        <div className="users-container" key={user.id} >
          <div className="users-first-box users-box">
            <img 
              className="users-avatar"
              src={BlankAvatar}
              alt="Avatar"/>
          </div>
          <div className="users-second-box users-box">
            <h3 className="users-title">{user.name}</h3>
            <p className="users-text">Contributed {user.postsCount} posts</p>
          </div>
          <div className="users-third-box users-box">
            <button
              className="u-users-button"
              onClick={() => { handleSelectedUser(user); }}>
              Select
            </button>
            <UpdateUser userId={user.id} refetchUserList={refetchUserList} />
            <DeleteUser userId={user.id} refetchUserList={refetchUserList} />
          </div>
        </div>
      ))}
    </div>
  );
}

export default Users;