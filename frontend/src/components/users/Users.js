import React from "react";
import "./styles/Users.css";
import { useQuery } from "@apollo/react-hooks";
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

function Users({ refreshCount, handleSelectedUser, DeleteUser }) {

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
            <DeleteUser userId={user.id} refetchUserList={refetchUserList} />
          </div>
        ))}
      </div>

    </div>
  );
}

export default Users;