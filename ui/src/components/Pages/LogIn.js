import { useState, React, useEffect } from "react";
import styles from "./LogIn.module.css";
import Header from "../Basic/Header";
import Footer from "../Basic/Footer";
import { Auth } from "aws-amplify";
import { redirect, useNavigate } from "react-router-dom";
import FacebookLoginButton from "./SignInWithFacebook";
import { CognitoIdentityServiceProvider } from "aws-sdk";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAmazon, faFacebook, faGoogle } from "@fortawesome/free-brands-svg-icons";

const initialFormState = {
  email: "",
  password: "",
};

const LogIn = () => {
  const [formState, updateFormState] = useState(initialFormState);
  const navigate = useNavigate();



  function onChange(e) {
    updateFormState((formState) => ({
      ...formState,
      [e.target.name]: e.target.value,
    }));
  }

  const signIn = async (email, password) => {
    try {
      await Auth.signIn(email, password);
      console.log("signed in");

      navigate("/service");
    } catch (err) {
      console.log("Error signing in user");
      console.log(err);
    }
  };

  const handleSignIn = (e) => {
    e.preventDefault();
    const { email, password } = formState;

    signIn(email, password);
  };

  return (
    <div className={styles.body}>
      {/* <!-- header section strats --> */}

      <Header />
      <div className="container min-vh-100 d-flex justify-content-center align-items-center">
        <form className={styles.form + " p-4 m-5"}>
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-md- w-auto pb-2">
                <h1 className={styles.formHeading}>Log In</h1>
              </div>
            </div>
            <div className="row p-3">
              <div className="col-md-12">
                <div className="form-group rounded">
                  <label className={styles.label + " pb-1"} htmlFor="email">
                    Email
                  </label>
                  <input
                    onChange={onChange}
                    name="email"
                    type="email"
                    className="form-control"
                    id="email"
                    placeholder="Enter email"
                  />
                </div>
              </div>
            </div>
            <div className="row p-3">
              <div className="col-md-12">
                <div className="form-group rounded">
                  <label className={styles.label + " pb-1"} htmlFor="password">
                    Password
                  </label>
                  <input
                    onChange={onChange}
                    name="password"
                    type="password"
                    className="form-control"
                    id="lastName"
                    placeholder="Enter password"
                  />
                </div>
              </div>
            </div>

            <div className="row m-3 d-flex justify-content-center">
              <div className="col-6 ">
                <button
                  type="submit"
                  onClick={handleSignIn}
                  className={"btn btn-primary " + styles.submit}
                >
                  Submit
                </button>
              </div>
            </div>
            <div className="row m-3 d-flex justify-content-center">
              <div className="col-6 ">
                <button
                  type="button"
                  onClick={() => navigate("/reset-password")}
                  className={"btn btn-primary " + styles.submit}
                >
                  Forgot?
                </button>
              </div>
            </div>
          </div>

          <div className="btn justify-content-center d-flex">


            <button
              onClick={(e) => {
                e.preventDefault();
                Auth.federatedSignIn({ provider: "Facebook" });
              }}
              className="btn btn-primary"
            >
              <FontAwesomeIcon icon={faFacebook} /> Sign in with Facebook
            </button>
          </div>
          <div className="btn justify-content-center d-flex">
            <button
              className="btn btn-danger"
              onClick={async (e) => {
                e.preventDefault();
                const credentials = await Auth.federatedSignIn({ provider: "Google" });
                
              }}
            >
              <FontAwesomeIcon icon={faGoogle}/> Sign in with Google
            </button>
          </div>
          <div className="btn justify-content-center d-flex">
            <button
            className="btn btn-warning"
              onClick={async (e) => {
                e.preventDefault();
                const credentials = await Auth.federatedSignIn({ provider: "LoginWithAmazon" });
                
              }}
            >
              <FontAwesomeIcon icon={faAmazon}/> Sign in with Amazon
            </button>
          </div>
        </form>
      </div>
      <Footer />
    </div>
  );
};

export default LogIn;
