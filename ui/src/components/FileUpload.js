import React,  { useState, Fragment } from "react";
import { Button, FormControl, TextField } from "@mui/material";
import PhotoGallery from "./PhotoGallery";
import axios from "axios";
import { Form } from "react-router-dom";
import Header from "./Basic/Header";
import AWS from 'aws-sdk';

function FileUpload() {
  const [msg, setMsg] = useState("");
  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    console.log(file);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.post("http://localhost:8080", {});
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Fragment>
      <form onSubmit={handleSubmit}>
        <FormControl
          sx={{
            justifyContent: "center",
            alignItems: "center",
            display: "flex",
            width: "auto",
            height: "70vh",
          }}
        >
          <TextField
            type="file"
            onChange={handleFileUpload}
            variant="outlined"
          />
          <TextField
            type="text"
            onChange={(e) => {
              setMsg(e.target.value);
            }}
            placeholder="Enter Text"
          />
          <Button type="submit">Submit</Button>
        </FormControl>
      </form>
    </Fragment>
  );
}

export default FileUpload;
