import React from "react";
import { Link } from "react-router-dom";

const ProfileCard = ({ customerInfo }) => {
  return (
    <div className="dashboard__profile card profile-card">
      <div className="card-body profile-card__body">
        <div className="profile-card__avatar">
          <img src="images/user-avatar.png" alt="" />
        </div>
        <div className="profile-card__name">{customerInfo.displayName}</div>
        <div className="profile-card__email">{customerInfo.emailId}</div>
        <div className="profile-card__edit">
          <Link to="profile" className="btn btn-secondary btn-sm">
            Edit Profile
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
