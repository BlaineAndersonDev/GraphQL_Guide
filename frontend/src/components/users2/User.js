import React from "react";
import "../users/User.css";
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
  
  const { loading, error, data } = useQuery(GET_USER, {
    variables: { id: user.id },
  });

  if (loading) return "Loading...";
  if (error) return `Error ${error.message}`;

  return (
    <div className="user-wrapper">
      <h1>{data.user.name}</h1>
      <p>{data.user.email}</p>
      <div className="user-posts-container">
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
