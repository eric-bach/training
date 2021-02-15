import React from "react";

class UserWhoLikedPost extends React.Component {
  render() {
    const allUsers = this.props.data;
    return allUsers.map(user => {
      return (
        <React.Fragment>
          <div key={user}>
            <span style={{ fontStyle: "bold", color: "#ged" }}>{user}</span>
          </div>
        </React.Fragment>
      );
    });
  }
}

export default UserWhoLikedPost;
