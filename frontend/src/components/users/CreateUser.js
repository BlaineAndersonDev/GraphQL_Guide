import React, { Component } from "react";
import gql from "graphql-tag";
import { Mutation } from "react-apollo";

const CREATE_USER = gql`
  mutation CreateUser($name: String!, $email: String!) {
    createUser(input: { name: $name, email: $email }) {
      user {
        id
        name
        email
        postsCount
      }
      errors
    }
  }
`;

class CreateUser extends Component {
  state = {
    name: "",
    email: "",
  };

  onSubmit = (e, createUser) => {
    e.preventDefault();
    createUser({ variables: this.state });
    // this.setState({ name: "", email: "" });
    this.props.selectUser();
  };

  render() {
    return (
      <Mutation mutation={CREATE_USER} update={this.props.onCreateUser}>
        {(createUserMutation) => (
          <div>
            <form onSubmit={(e) => this.onSubmit(e, createUserMutation)}>
              <div>
                <h4>Create new user</h4>
                <div>
                  <input
                    type="text"
                    value={this.state.name}
                    placeholder="Name"
                    onChange={(e) => this.setState({ name: e.target.value })}
                  />
                </div>
                <div>
                  <input
                    type="email"
                    value={this.state.email}
                    placeholder="Email"
                    onChange={(e) => this.setState({ email: e.target.value })}
                  />
                </div>
                <button type="submit">Create User</button>
              </div>
            </form>
          </div>
        )}
      </Mutation>
    );
  }
}

export default CreateUser;
