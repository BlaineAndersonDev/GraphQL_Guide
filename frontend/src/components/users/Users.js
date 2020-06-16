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
      postsCount
    }
  }
`;

function Users({ refreshCount, handleSelectedUser, UpdateUser, DeleteUser }) {

  const refetchUserList = () => {
    refetch()
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
      {data.users.map((user) => (
        <div className="users-container" key={user.id}>

          <div className="users-alterations-container">
            <div id="users-update-button">
              <img
                src={UpdateIcon}
                alt="Update"
                className="users-alterations-button"
                onClick={() => { ToggleUpdatePanel(user.id) } }
              />
            </div>
            <div id="users-delete-button">
              <DeleteUser userId={user.id} refetchUserList={refetchUserList} />
            </div>
          </div>

          <div className="users-box">
            <img 
              onClick={() => { handleSelectedUser(user); }}
              className="users-avatar"
              src={BlankAvatar}
              alt="Avatar" />
            <h3 className="users-title">{user.name}</h3>
            <p className="users-text">Contributed {user.postsCount} posts</p>
          </div>

          <div id={`users-${user.id}-update-box`} className="users-update-box hidden">
            <UpdateUser 
              userId={user.id} 
              refetchUserList={refetchUserList} 
              ToggleUpdatePanel={ToggleUpdatePanel} 
            />
          </div>

        </div>
      ))}
    </div>
  );
}

export default Users;