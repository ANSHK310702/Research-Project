import React, { useState } from "react";
import styles from "./SignUp.module.css";
import Header from "../Basic/Header";
import Footer from "../Basic/Footer";
import { Auth } from "aws-amplify";
import { Link } from "react-router-dom";
const initialFormState = {
  givenName: "",
  familyName: "",
  password: "",
  email: "",
  authCode: "",
  address: "",
  formType: "signUp",
};

const SignUp = () => {
  const [formState, updateFormState] = useState(initialFormState);

  function onChange(e) {
    updateFormState((formState) => ({
      ...formState,
      [e.target.name]: e.target.value,
    }));
  }

  async function signUp() {
    try {
      const { givenName, familyName, password, email, address, authCode } =
        formState;

      console.log(email);
      const { user } = await Auth.signUp({
        username: email,
        password: password,
        attributes: {
          given_name: givenName,
          family_name: familyName,
          email: email,
          address: address,
        },
      });

      updateFormState((formState) => ({
        ...formState,
        formType: "confirmSignUp",
      }));

      console.log(user);
    } catch (err) {
      console.log("error signing up:", err);
    }
  }

  async function confirmSignUp() {
    const { email, authCode } = formState;
    try {
      await Auth.confirmSignUp(email, authCode);
      console.log("Verified");
      updateFormState((formState) => ({
        ...formState,
        formType: "verified",
      }));
    } catch (error) {
      console.log("error confirming sign up", error);
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    signUp();
  };

  const handleVerification = (e) => {
    e.preventDefault();
    confirmSignUp();
  };

  if (formState.formType == "signUp") {
    return (
      <div className={styles.body}>
        {/* <!-- header section strats --> */}
        <Header />
        <div className="container min-vh-100 d-flex justify-content-center align-items-center">
          <form className={styles.form + " p-4 m-5"}>
            <div className="container">
              <div className="row justify-content-center">
                <div className="col-md-4   pb-2">
                  <h1 className={styles.formHeading}>Sign Up</h1>
                </div>
              </div>
              <div className="row p-3">
                <div className="col-md-6">
                  <div className="form-group rounded">
                    <label
                      className={styles.label + " pb-1"}
                      htmlFor="givenName"
                    >
                      Given Name
                    </label>
                    <input
                      name="givenName"
                      type="text"
                      className="form-control"
                      id="givenName"
                      placeholder="Enter given name"
                      onChange={onChange}
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <label
                      className={styles.label + " pb-1"}
                      htmlFor="familyName"
                    >
                      Family Name
                    </label>
                    <input
                      name="familyName"
                      type="text"
                      className="form-control"
                      id="familyName"
                      placeholder="Enter family name"
                      onChange={onChange}
                    />
                  </div>
                </div>
              </div>
              <div className="row p-3">
                <div className="col-md-6">
                  <div className="form-group">
                    <label className={styles.label + " pb-1"} htmlFor="email">
                      Email
                    </label>
                    <input
                      name="email"
                      type="email"
                      className="form-control"
                      id="email"
                      placeholder="Enter email"
                      onChange={onChange}
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <label
                      className={styles.label + " pb-1"}
                      htmlFor="password"
                    >
                      Password
                    </label>
                    <input
                      name="password"
                      type="password"
                      className="form-control"
                      id="password"
                      placeholder="Enter password"
                      onChange={onChange}
                    />
                  </div>
                </div>
              </div>
              <div className="row p-3">
                <div className="col-md-6">
                  <div className="form-group">
                    <label className={styles.label + " pb-1"} htmlFor="address">
                      Address
                    </label>
                    <input
                      name="address"
                      type="text"
                      className="form-control"
                      id="address"
                      placeholder="Enter address"
                      onChange={onChange}
                    />
                  </div>
                </div>
              </div>
              <div className="row m-3 d-flex justify-content-center">
                <div className="col-3 ">
                  <button
                    type="submit"
                    onClick={handleSubmit}
                    className={"btn " + styles.submit}
                  >
                    Submit
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>

        <Footer />
      </div>
    );
  } else if (formState.formType == "confirmSignUp") {
    return (
      <div className={styles.body}>
        {/* <!-- header section strats --> */}
        <Header />
        <div className="container min-vh-100 d-flex justify-content-center align-items-center">
          <div className={styles.form + " p-5 m-2"}>
            <div className="row p-2 justify-content-center">
              <div className="col w-auto pt-0 display-6 text-white">
                <h1 className={styles.formHeading}>Verify Yourself</h1>
              </div>
            </div>
            <div className="row p-4 justify-content-center">
              <div className="col-md-12  text-white">
                <label className="w-100" htmlFor="authCode">
                  Verification Code
                </label>
              </div>
            </div>
            <div className="row ps-4 justify-content-center">
              <div className="col-md-12 w-auto  text-white">
                <input
                  name="authCode"
                  type="text"
                  className="form-control "
                  id="givenName"
                  placeholder="Enter verification code"
                  onChange={onChange}
                />
              </div>
            </div>

            <div className="row mt-4 ms-4 me-1  justify-content-center w-auto ">
              <button
                type="submit"
                onClick={handleVerification}
                className={"btn " + styles.submit}
              >
                Verify
              </button>
            </div>
          </div>
        </div>

        <Footer />
      </div>
    );
  } else if (formState.formType == "verified") {
    return (
      <div className={styles.body}>
        {/* <!-- header section strats --> */}
        <Header />
        <div className="container min-vh-100 d-flex justify-content-center align-items-center">
          <div className={styles.form + " p-5 m-2"}>
            <div className="row p-2 justify-content-center">
              <div className="col w-auto pt-0 display-6 text-white">
                <h1 className={styles.formHeading}>You are verified!</h1>
              </div>
            </div>

            <div className="row mt-4 ms-4 me-1  justify-content-center w-auto ">
              <button type="submit" className={"btn " + styles.submit}>
                <Link to="/login" className="text-black">Login</Link>
              </button>
            </div>

            <div className="row mt-4 ms-4 me-1  justify-content-center w-auto "></div>
          </div>
        </div>

        <Footer />
      </div>
    );
  }
};

export default SignUp;
