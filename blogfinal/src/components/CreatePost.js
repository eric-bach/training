import React from "react";
import { API, graphqlOperation, Auth } from "aws-amplify";
import { createPost } from "../graphql/mutations";

class CreatePost extends React.Component {
  state = {
    postOwnerId: "",
    postOwnerUsername: "",
    postTitle: "",
    postBody: ""
  };

  componentDidMount = async () => {
    await Auth.currentUserInfo().then(user => {
      console.log("Curr.User: ", user.username);
      console.log("Attr.Sub: ", user.attributes.sub);
      this.setState({
        postOwnerId: user.attributes.sub,
        postOwnerUsername: user.username
      });
    });
  };

  handleChangePost = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleAddPost = async event => {
    event.preventDefault();

    const input = {
      postOwnerId: this.state.postOwnerId,
      postOwnerUsername: this.state.postOwnerUsername,
      postTitle: this.state.postTitle,
      postBody: this.state.postBody,
      createdAt: new Date().toISOString()
    };

    await API.graphql(graphqlOperation(createPost, { input }));

    this.setState({ postTitle: "", postBody: "" });
  };

  render() {
    return (
      <form className="add-post" onSubmit={this.handleAddPost}>
        <input
          style={{ font: "19px" }}
          type="text"
          placeholder="Title"
          name="postTitle"
          required
          value={this.state.postTitle}
          onChange={this.handleChangePost}
        ></input>
        <textarea
          type="text"
          name="postBody"
          rows="3"
          cols="40"
          required
          placeholder="New Blog Post"
          value={this.state.postBody}
          onChange={this.handleChangePost}
        ></textarea>
        <input
          type="submit"
          className="btn"
          sylte={{ fontSize: "19px" }}
        ></input>
      </form>
    );
  }
}

export default CreatePost;
