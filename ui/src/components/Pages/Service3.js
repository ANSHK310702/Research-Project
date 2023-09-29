import React, { useEffect, useState } from "react";
import "./Service.css";
import Header from "../Basic/Header";
import Footer from "../Basic/Footer";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { FormControl, FormLabel } from "@mui/material";
import FileUpload from "../FileUpload";
import styles from "./Form.module.css";
import { Auth } from "aws-amplify";
import { redirect } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { faCanadianMapleLeaf } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSatellite,
  faCircle,
  faCheckCircle,
  faTimesCircle,
} from "@fortawesome/free-solid-svg-icons";
const Service = (props) => {
  const navigate = useNavigate();

  // useEffect(() => {
  //   checkAuth();
  // }, []);

  const [selectedOption, setSelectedOption] = useState(null);

  const handleOptionChange = (option) => {
    setSelectedOption(option);
  };


  const [uploadedImage, setUploadedImage] = useState(null);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setUploadedImage(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const checkAuth = async () => {
    try {
      await Auth.currentAuthenticatedUser();
    } catch (err) {
      console.log("The error is " + err);
      navigate("/login");
    }
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
                <h1 className={styles.formHeading}>Enter Your Details</h1>
              </div>
            </div>
            <div className="row p-3">
              {/* <div className="col-md-6">
                <div className="form-group rounded">
                  <label className={styles.label + " pb-1"} htmlFor="firstName">
                    First Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="firstName"
                    placeholder="Enter first name"
                  />
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group">
                  <label className={styles.label + " pb-1"} htmlFor="lastName">
                    Last Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="lastName"
                    placeholder="Enter last name"
                  />
                </div>
              </div>
            </div>
            <div className="row p-3">
              <div className="col-md-6">
                <div className="form-group">
                  <label className={styles.label + " pb-1"} htmlFor="state">
                    State
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="state"
                    placeholder="Enter state"
                  />
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group">
                  <label className={styles.label + " pb-1"} htmlFor="country">
                    Country
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="country"
                    placeholder="Enter country"
                  />
                </div>
              </div>
            </div>
            <div className="row p-3">
              <div className="col-md-6">
                <div className="form-group">
                  <label
                    className={styles.label + " pb-1"}
                    htmlFor="postalCode"
                  >
                    Postal Code
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="postalCode"
                    placeholder="Enter postal code"
                  />
                </div> */}
              {/* </div> */}

              {/* File Upload and Image */}
              <div className="row">
                <div className="col-md-6">
                  <div className="form-group">
                    <label className={styles.label + " pb-1"}>
                      File Upload
                    </label>
                    <input
                      type="file"
                      className="text-white"
                      onChange={handleImageUpload}
                    />
                  </div>
                  {uploadedImage && (
                    <img
                      src={uploadedImage}
                      alt="Uploaded"
                      className="mt-2"
                      style={{ width: "300px", height: "auto" }}
                    />
                  )}
                </div>
                <div className="col-md-6">
                    
                </div>      
                

              </div>

              {/* Satellite and leaf Icons */}
              <div className="row mt-5">
                <h3 className={styles.formHeading2 + " mb-4"}>Image Type</h3>
                <div className="col-md-3 mt-2">
                  <label className={styles.label}>
                    <input
                      type="radio"
                      value="option1"
                      checked={selectedOption === "option1"}
                      onChange={() => handleOptionChange("option1")}
                    />
                    <FontAwesomeIcon
                      icon={faSatellite}
                      color="white"
                      size="4x"
                    />
                    Satellite
                  </label>
                </div>

                <div className="col-md-3 mt-2">
                  <label className={styles.label}>
                    <input
                      type="radio"
                      value="option2"
                      checked={selectedOption === "option2"}
                      onChange={() => handleOptionChange("option2")}
                    />
                    <FontAwesomeIcon
                      icon={faCanadianMapleLeaf}
                      color="white"
                      size="4x"
                    />
                    Leaf
                  </label>
                </div>
              </div>
            </div>
            <div className="row m-3 d-flex justify-content-center">
              <div className="col-3 ">
                <button
                  type="submit"
                  className={"btn btn-primary " + styles.submit}
                >
                  Predict
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>

      <Footer />
    </div>
  );
};

export default Service;
