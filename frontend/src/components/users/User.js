import React from "react";
import "./styles/User.css";
import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";
import BlankAvatar from "./styles/Avatar.svg";
import UpdateIcon from "./styles/Pencil.svg";
import BackIcon from "./styles/Back.svg";

const GET_USER = gql`
  query User($id: ID!) {
    user(id: $id) {
      id
      name
      email
      avatar
      posts {
        id
        title
      }
    }
  }
`;

function User({ user, handleSelectedUser, forceRefresh, UpdateUser, DeleteUser }) {

  const refetchUserList = () => {
    handleSelectedUser(null)
    forceRefresh();
  };

  const handleUpdate = () => {
    refetch();
  };

  const ToggleUpdatePanel = (userId) => {
    if (
      document
        .getElementById(`user-${userId}-update-box`)
        .classList.contains("hidden")
    ) {
      document
        .getElementById(`user-${userId}-update-box`)
        .classList.remove("hidden");
      document
        .getElementById(`user-${userId}-info`)
        .classList.add("hidden");
    } else {
      document
        .getElementById(`user-${userId}-update-box`)
        .classList.add("hidden");
      document
        .getElementById(`user-${userId}-info`)
        .classList.remove("hidden");
    }
  };

  const { loading, error, data, refetch, networkStatus } = useQuery(GET_USER, {
    variables: { id: user.id },
  });

  if (networkStatus === 4) return "Refetching!";
  if (loading) return "Loading...";
  if (error) return `Error ${error.message}`;
  if (!data) return "Data not found."

  return (
    <div className="user-wrapper">
      <div className="user-alteration-buttons">
        <img
          src={UpdateIcon}
          alt="Update"
          className="user-alteration-button"
          onClick={() => {
            ToggleUpdatePanel(user.id);
          }}
        />
        <DeleteUser userId={data.user.id} refetchUserList={refetchUserList} />
        <img
          src={BackIcon}
          alt="Back"
          className="user-alteration-button"
          onClick={handleSelectedUser.bind(this, null)}
        />
      </div>

      <div className="user-information-container">
        {user.avatar ? (
          <img className="user-avatar" src={user.avatar} alt="Avatar" />
        ) : (
          <img className="user-avatar" src={BlankAvatar} alt="Avatar" />
        )}

        <div
          id={`user-${user.id}-update-box`}
          className="user-update-box hidden"
        >
          <UpdateUser
            user={data.user}
            handleUpdate={handleUpdate}
            ToggleUpdatePanel={ToggleUpdatePanel}
          />
        </div>
        <div id={`user-${data.user.id}-info`} className="user-info">
          <h1 className="user-title">{data.user.name}</h1>
          <p className="user-text">{data.user.email}</p>
        </div>
      </div>
      <div className="user-posts-container">
        <h3 className="user-posts-title">Posts by {data.user.name}</h3>
        {data.user.posts.map((post) => (
          <div className="user-post" key={post.id}>
            <p className="user-post-title">{post.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default User;
