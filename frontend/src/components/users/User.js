import React from "react";
import "./User.css";
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

function User({ user, selectUser }) {
  const { loading, error, data } = useQuery(GET_USER, {
    variables: { id: user.id },
  });

  if (loading) return "Loading...";
  if (error) return `Error ${error.message}`;

  return (
    <React.Fragment>
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
        <button onClick={selectUser.bind(this, null)}>
          Back
        </button>
      </div>
    </React.Fragment>
  );
}

export default User;
