import React from "react";
import "./styles/User.css";
import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";

const GET_USER = gql`
  query User($id: ID!) {
    user(id: $id) {
      id
      name
      email
      posts {
        id
        title
      }
    }
  }
`;

function User({ user, handleSelectedUser, forceRefresh, DeleteUser }) {

  const refetchUserList = () => {
    handleSelectedUser(null)
    forceRefresh();
  };

  const { loading, error, data, networkStatus } = useQuery(GET_USER, {
    variables: { id: user.id },
  });

  if (networkStatus === 4) return "Refetching!";
  if (loading) return "Loading...";
  if (error) return `Error ${error.message}`;
  if (!data) return "Data not found."

  return (
    <div id="user-wrapper">
      <h1>{data.user.name}</h1>
      <p>{data.user.email}</p>
      <div id="user-posts-container">
        {data.user.posts.map((post) => (
          <div className="user-post" key={post.id}>
            <p>{post.title}</p>
          </div>
        ))}
      </div>
      {/* DELETE */}
      <DeleteUser userId={data.user.id} refetchUserList={refetchUserList}/>
      <button onClick={handleSelectedUser.bind(this, null)}>Back</button>
    </div>
  );
}

export default User;
