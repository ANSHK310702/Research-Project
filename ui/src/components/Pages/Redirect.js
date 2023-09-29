import React, { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import styles from "./Redirect.module.css";
import { Auth } from "aws-amplify";

const Redirect = () => {
  const navigate = useNavigate();
  const [authenticated, setAuthenticated] = useState(false);

  const checkAuth = async () => {
    try {
      await Auth.currentAuthenticatedUser();
      console.log("I am authenticated!");
    } catch (err) {
      console.log(err);
      navigate("/login");
    }
  };

  checkAuth();
  return (
    <div
      className={
        styles.body +
        " container min-vh-100 d-flex justify-content-center align-items-center"
      }
    >
      <button
        className={styles.submit + " btn d-block"}
        onClick={() => {
          navigate("/service");
        }}
      >
        Access platform
      </button>
    </div>
  );
};

export default Redirect;
