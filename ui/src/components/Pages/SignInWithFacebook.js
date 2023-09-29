import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook } from "@fortawesome/free-brands-svg-icons";

const FacebookLoginButton = (props) => {
  const handleFacebookLogin = () => {
    // Implement your Facebook login logic here
    console.log("Signing in with Facebook...");
  };

  return (
    <button onClick={(e) => props.onClick(e)} className="btn btn-primary">
      <FontAwesomeIcon icon={faFacebook} /> Sign in with Facebook
    </button>
  );
};

export default FacebookLoginButton;
