import React, { useState } from "react";
import { Auth } from "aws-amplify";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styles from "./ResetPassword.module.css"; // Import your custom CSS file
import Header from "../Basic/Header";

const ResetPassword = () => {
  const [formState, updateFormState] = useState({
    email: "",
    resetCode: "",
    newPassword: "",
    showPasswordForm: false,
  });
  const navigate = useNavigate();

  const handleSendCode = async () => {
    const { email } = formState;

    try {
      await Auth.forgotPassword(email);
      console.log("Password reset code sent successfully");
      toast.success("Verification code sent to your email!");
      updateFormState({ ...formState, showPasswordForm: true });
    } catch (err) {
      console.log("Error sending password reset code", err);
      if (err.code === "UserNotFoundException") {
        toast.error("Email is not registered.");
      } else {
        toast.error("Error sending verification code");
      }
    }
  };

  const handleResetPassword = async () => {
    const { email, resetCode, newPassword } = formState;

    try {
      await Auth.forgotPasswordSubmit(email, resetCode, newPassword);
      console.log("Password reset successful");
      navigate("/login");
    } catch (err) {
      console.log("Error resetting password", err);
      toast.error("Error resetting password");
    }
  };

  const handleChange = (e) => {
    updateFormState((formState) => ({
      ...formState,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <div className={styles.body}>
      <Header/>
      <ToastContainer />

      <div className="container min-vh-100 d-flex justify-content-center align-items-center">
        <form className={styles.form + " p-4 m-5"}>
          <div className={styles["form-group"]}>
            <label className={styles.label} htmlFor="email">
              Email:
            </label>
            <input
              onChange={handleChange}
              name="email"
              type="email"
              className="form-control"
              id="email"
            />
          </div>
          <button
            type="button"
            onClick={handleSendCode}
            className={styles.submit + " btn"}
          >
            Send Reset Code
          </button>

          {formState.showPasswordForm && (
            <div>
              <div className={styles["form-group"]}>
                <label className={styles.label + " mt-4"} htmlFor="resetCode">
                  Reset Code:
                </label>
                <input
                  onChange={handleChange}
                  name="resetCode"
                  type="text"
                  className="form-control"
                  id="resetCode"
                />
              </div>
              <div className={styles["form-group"]}>
                <label  className={styles.label } htmlFor="newPassword">New Password:</label>
                <input
                  onChange={handleChange}
                  name="newPassword"
                  type="password"
                  className="form-control"
                  id="newPassword"
                />
              </div>
              <button
                type="button"
                onClick={handleResetPassword}
                className={styles.submit + " btn btn-primary"}
              >
                Reset Password
              </button>
            </div>
          )}
        </form>
      </div>
      {formState.showPasswordForm && (
        <div className="container min-vh-100 d-flex justify-content-center align-items-center">
          <form className={styles.form + " p-4 m-5"}></form>
        </div>
      )}
    </div>
  );
};

export default ResetPassword;
