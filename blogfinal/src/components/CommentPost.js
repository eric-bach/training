import React from "react";

class CommentPost extends React.Component {
  render() {
    const { content, commentOwnerUsername, createdAt } = this.props.commentData;

    return (
      <div className="comment">
        <span style={{ fontStyle: "italic", color: "#0ca5e297" }}>
          {"Commented by: "} {commentOwnerUsername}
          {" on "}
          <time style={{ fontStyle: "italic" }}>
            {new Date(createdAt).toDateString()}
          </time>
        </span>
        <p>{content}</p>
      </div>
    );
  }
}

export default CommentPost;
