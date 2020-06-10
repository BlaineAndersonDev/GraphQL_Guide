import React from "react";
import "../users/User.css";
import { useQuery, useMutation } from "@apollo/react-hooks";
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

function User({ user, handleSelectedUser, forceRefresh }) {

  const refetchUserList = () => {
    handleSelectedUser(null)
    forceRefresh();
  };
  
  const { loading, error, data } = useQuery(GET_USER, {
    variables: { id: user.id },
  });

  const [deleteUser] = useMutation(DELETE_USER, {
    onCompleted: refetchUserList
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
      <button onClick={() => { deleteUser({ variables: { id: user.id } }); }}>
        Delete
            </button>
      <button onClick={handleSelectedUser.bind(this, null)}>Back</button>
    </div>
  );
}

export default User;
