import React, { useState } from "react";
import Pagination from "./pagination";

const Profile = (props) => {
  const [showComments, setShowComments] = useState(false);
  const handleClick = (event) => {
    setShowComments(!showComments);
  };
  return (
    <>
      <div className="profile" onClick={handleClick}>
        <div className="imgLeft">
          <img src={props.profileImage} alt="" />
        </div>
        <div className="textRight">
          <h5>{props.name}</h5>
          <p>
            <i className={props.rating}></i>
            <i className={props.rating}></i>
            <i className={props.rating}></i>
            <i className={props.rating}></i>
            <i className={props.rating}></i>
          </p>
          <p>{props.address}</p>
        </div>
      </div>

      {showComments && (
        <div className="businessComment">
          <div className="textComment">
            <h5>{props.name}</h5>
            <p className="innerRating">
              <i className={props.rating}></i>
              <i className={props.rating}></i>
              <i className={props.rating}></i>
              <i className={props.rating}></i>
              <i className={props.rating}></i>
            </p>
            {/* <p className="commentUser">{props.comment}</p>
            <p className="commentUser">{props.comment}</p> */}
          </div>
          <Pagination profileImage={props.profileImage} />
        </div>
      )}
    </>
  );
};

export default Profile;
