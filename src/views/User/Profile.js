import * as React from "react";
import { ThemeContext } from "../../ThemeProvider";
import "../../styles/Profile.css";

function Profile() {
  const { user } = React.useContext(ThemeContext);
  console.log(user);
  return (
    <div className="profile-container">
      <div className="avatar-container">
        <img src={user.avatar} alt="Avatar" className="avatar-image" />
      </div>
      <div className="user-info">
        <h2>{user.email}</h2>
        <p>Phone: {user.phone_number}</p>
        <p>Birthday: {user.birthday}</p>
      </div>
    </div>
  );
}

export default Profile;
