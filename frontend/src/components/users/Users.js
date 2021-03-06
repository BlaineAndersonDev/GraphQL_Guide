import React from "react";
import "./styles/Users.css";
import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";
import BlankAvatar from './styles/Avatar.svg';
import UpdateIcon from './styles/Pencil.svg';

const GET_USERS = gql`
  query {
    users {
      id
      name
      email
      avatar
      postsCount
    }
  }
`;

function Users({ refreshCount, handleSelectedUser, forceRefresh, CreateUser, UpdateUser, DeleteUser }) {

  const refetchUserList = () => {
    refetch()
  };

  const handleUpdate = () => {
    refetchUserList();
  };

  const ToggleUpdatePanel = (userId) => {
    if (document.getElementById(`users-${userId}-update-box`).classList.contains('hidden')) {
      document.getElementById(`users-${userId}-update-box`).classList.remove('hidden');
    } else {
      document.getElementById(`users-${userId}-update-box`).classList.add('hidden');
    };
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
      <h1 className="users-header">Users</h1>
      {data.users.map((user) => (
        <div className="users-container" key={user.id}>
          <div className="users-alterations-container">
            <img
              src={UpdateIcon}
              alt="Update"
              className="users-alterations-button"
              onClick={() => {
                ToggleUpdatePanel(user.id);
              }}
            />
            <DeleteUser userId={user.id} refetchUserList={refetchUserList} />
          </div>

          <div className="users-box">
            {user.avatar ? (
              <img
                onClick={() => {
                  handleSelectedUser(user);
                }}
                className="users-avatar"
                src={user.avatar}
                alt="Avatar"
              />
            ) : (
              <img
                onClick={() => {
                  handleSelectedUser(user);
                }}
                className="users-avatar"
                src={BlankAvatar}
                alt="Avatar"
              />
            )}
            <h3
              onClick={() => {
                handleSelectedUser(user);
              }}
              className="users-title"
            >
              {user.name}
            </h3>
            <p className="users-text">Contributed {user.postsCount} posts</p>
          </div>

          <div
            id={`users-${user.id}-update-box`}
            className="users-update-box hidden"
          >
            <UpdateUser
              user={user}
              handleUpdate={handleUpdate}
              ToggleUpdatePanel={ToggleUpdatePanel}
            />
          </div>
        </div>
      ))}
      <CreateUser forceRefresh={forceRefresh} />
    </div>
  );
}

export default Users;