import React, { useState } from "react";
import styles from "./Service.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLeaf, faSatellite } from "@fortawesome/free-solid-svg-icons";
import e from "cors";
import Header from "../Basic/Header";
import Dropdown from "./components/Dropdown";
import BarChart from "./components/BarChart";
import axios from "axios";

const data = [
  {
    model: "CNN",
    accuracy: 90,
  },
  {
    model: "Random Forest",
    accuracy: 93,
  },
  {
    model: "Decision Tree",
    accuracy: 90,
  },
  {
    model: "Log. Regression",
    accuracy: 76,
  },
  {
    model: "L.D Analysis",
    accuracy: 76,
  },
  {
    model: "SVM",
    accuracy: 92,
  },
];

const Service = () => {
  const [imageType, setImageType] = useState(null);
  const [selectedOption, setSelectedOption] = useState(null);
  const [showModel, setShowModel] = useState(true);
  const handleDropdownChange = (option) => {
    setSelectedOption(option);
  };

  const handleIconBoxClick = (get, type) => {
    // Set the selected image type
    setImageType(type);
    if (type == "satellite") {
      setShowModel(false);
    } else {
      setShowModel(true);
    }
    const clickedIconBox = get.target;

    // Select all icons and change the background color of the icon that is clicked
    const allIconBoxes = document.querySelectorAll(`.${styles.iconBox}`);

    allIconBoxes.forEach((icon) => {
      if (icon === clickedIconBox) {
        icon.classList.add(styles.selected); // Add selected class to clicked icon
      } else {
        icon.classList.remove(styles.selected); // Remove selected class from other icons
      }
    });
  };

  const [modelType, setModelType] = useState(null);
  // const handleButtonClick = (get, type) => {
  //   get.preventDefault();
  //   // Set the selected model type
  //   setModelType(type);

  //   const clickedButton = get.target;

  //   // Select all icons and change the background color of the icon that is clicked
  //   const allButtons = document.querySelectorAll(`.${styles.button}`);

  //   allButtons.forEach((button) => {
  //     if (button === clickedButton) {
  //       button.classList.add(styles.selectedButton); // Add selected class to clicked button
  //     } else {
  //       button.classList.remove(styles.selectedButton); // Remove selected class from other button
  //     }
  //   });
  // };
  const [uploadedImage, setUploadedImage] = useState(null);

  const [prediction, setPrediction] = useState("");
  const [solution, setSolution] = useState("");
  const [imageURL, setImageURL] = useState("");
  const [loading, setLoading] = useState(false);
  const [plotURL, setPlotURL] = useState(null);
  const [historyURL, setHistoryURL] = useState(null);

  const [rgb_image, setRGBImage] = useState(null);
  const [ndvi_image, setNDVIImage] = useState(null);
  const [scaled_ndvi_image, setScaledNDVIImage] = useState(null);


  const handleSubmit = async (e) => {
    // Reset the state
    setPrediction(null); 
    setSolution(null); 
    setImageURL(null);
    setPlotURL(null);
    setHistoryURL(null);
    setRGBImage(null);
    setNDVIImage(null);
    setScaledNDVIImage(null);


    const data = new FormData();
    for (const key in formData) {
      data.append(key, formData[key]);
    }

    e.preventDefault();

    console.log("handleSubmit called"); // Add this line
    setLoading(true); // Start loading

    data.append("imageType", imageType);

    if (imageType == "leaf") {
      // Check if all required data is selected/uploaded
      if (!imageType || !selectedOption || !formData) {
        alert("Please select an image type, model type, and upload an image.");
        return;
      }
      data.append('modelType', selectedOption);
    }
    else {
      if (!imageType || !formData) {
        alert("Please select an image type and upload an image.");
        return;
      }
    }

    try {
      const response = await axios.post("http://localhost:5000/predict", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (imageType == "leaf") { 
        setPrediction(response.data.prediction); // Update state with prediction
        setSolution(response.data.solution); // Update state with solution
        setImageURL(URL.createObjectURL(formData.image));

        // Fetch the plot image
        const plotResponse = await axios.get('http://localhost:5000/get_plot', {
          responseType: 'arraybuffer', // Ensure the response is treated as binary data
        });
        const plotURL = URL.createObjectURL(new Blob([plotResponse.data], { type: 'image/png' }));
        setPlotURL(plotURL);

        console.log('Plot URL:', plotURL); // Add this line to check the plot URL

        var historyResponse = null;
        // Fetch the training history/validation score image
        if (selectedOption == "CNN") {
          var historyResponse = await axios.get('http://localhost:5000/get_training_history', {
            responseType: 'arraybuffer', // Ensure the response is treated as binary data
          });
        }
        else if (selectedOption == "Random Forest") {
          var historyResponse = await axios.get('http://localhost:5000/get_rf_score', {
            responseType: 'arraybuffer', // Ensure the response is treated as binary data
          });
        }
        else if (selectedOption == "Decision Tree") {
          var historyResponse = await axios.get('http://localhost:5000/get_dt_score', {
            responseType: 'arraybuffer', // Ensure the response is treated as binary data
          });
        }
        else if (selectedOption == "Logistic Regression") {
          var historyResponse = await axios.get('http://localhost:5000/get_lr_score', {
            responseType: 'arraybuffer', // Ensure the response is treated as binary data
          });
        }
        else if (selectedOption == "Linear Discriminant Analysis") {
          var historyResponse = await axios.get('http://localhost:5000/get_lda_score', {
            responseType: 'arraybuffer', // Ensure the response is treated as binary data
          });
        }
        const historyURL = URL.createObjectURL(new Blob([historyResponse.data], { type: 'image/png' }));
        setHistoryURL(historyURL);

      }
      else {  
          // Fetch the uploaded RGB satellite image
          const rgbResponse = await axios.get('http://localhost:5000/get_rgb_image', {
            responseType: 'arraybuffer', // Ensure the response is treated as binary data
          });
          const rgbURL = URL.createObjectURL(new Blob([rgbResponse.data], { type: 'image/png' }));
          setRGBImage(rgbURL);

          // Fetch the uploaded NDVI satellite image
          const ndviResponse = await axios.get('http://localhost:5000/get_ndvi_image', {
            responseType: 'arraybuffer', // Ensure the response is treated as binary data
          });
          const ndviURL = URL.createObjectURL(new Blob([ndviResponse.data], { type: 'image/png' }));
          setNDVIImage(ndviURL);

          // Fetch the uploaded scaled NDWI satellite image
          const scaled_ndviResponse = await axios.get('http://localhost:5000/get_scaled_ndvi_image', {
            responseType: 'arraybuffer', // Ensure the response is treated as binary data
          });
          const scaled_ndviURL = URL.createObjectURL(new Blob([scaled_ndviResponse.data], { type: 'image/png' }));
          setScaledNDVIImage(scaled_ndviURL);

      }

      // Handle the response as needed
    } catch (error) {
      console.error("Error predicting:", error);
    } finally {
      setLoading(false); // Stop loading
    }
  };
  // const handleImageUpload = (event) => {
  //   const file = event.target.files[0];
  //   if (file) {
  //     const reader = new FileReader();
  //     reader.onload = (e) => {
  //       setUploadedImage(e.target.result);
  //     };
  //     reader.readAsDataURL(file);
  //   }
  // };

  const [formData, setFormData] = useState({
    image: null,
  });

  const handleImageUpload = (e) => {
    const selectedImage = e.target.files[0];
    setFormData({ ...formData, image: selectedImage });
  };

  return (
    <>
      <Header />
      <form className={styles.form + " container mx-auto"}>
        <h1 className={styles.formHeading}>Add Data</h1>

        {/* ROW I */}
        {/* User selects the Image Type */}
        <div className="row">
          <h4 className={styles.formHeading4 + " mt-5 mb-3 d-flex"}>
            I. Please specify the kind of image you are going to upload.
          </h4>
        </div>
        <div className="row justify-content-start">
          <div className="col-md-3">
            {/* Icon I */}
            <div
              title="leaf"
              id="leaf"
              onClick={(e) => handleIconBoxClick(e, "leaf")}
              className={styles.iconBox}
            >
              <FontAwesomeIcon
                className="aIcon"
                icon={faLeaf}
                color="white"
                size="2x"
              />
            </div>
          </div>

          <div className="col-md-3">
            {/* Icon II */}
            <div
              title="satellite"
              onClick={(e) => handleIconBoxClick(e, "satellite")}
              className={styles.iconBox}
            >
              <FontAwesomeIcon
                className="aIcon"
                icon={faSatellite}
                color="white"
                size="2x"
              />
            </div>
          </div>
        </div>
        {/* ROW I Ends */}

        {/* ROW II */}

        {/* User selects the Model Type */}
        {showModel && (
          <div>
            {" "}
            <div className="row ">
              <h4 className={styles.formHeading4 + "  mb-3 d-flex "}>
                II. Please specify the kind of model you want to use.
              </h4>
            </div>
            <div className="row d-flex ">
              <div className="col-md-6">
                <Dropdown onOptionSelected={handleDropdownChange} />
              </div>
            </div>
            <div className="col-md-7">
              <BarChart data={data} />
            </div>
          </div>
        )}

        {/* <div className="row justify-content-start d-flex ">
          <div className="col-md-3 ">
            <button
              className={styles.button}
              onClick={(e) => handleButtonClick(e, "RNN")}
            >
              RNN
            </button>
          </div>

          <div className="col-md-3 ">
            <button
              className={styles.button}
              onClick={(e) => handleButtonClick(e, "CNN")}
            >
              {" "}
              CNN
            </button>
          </div>
        </div> */}
        {/* ROW II Ends */}

        {/* ROW III */}
        <div className="row">
          <h4 className={styles.formHeading4 + " mb-1"}>
            III. Please upload your image.
          </h4>
        </div>
        <div className="row ">
          <div className="col-md-6 mb-4">
            <div className="form-group">
              <label className={styles.label + "mb-5"}>File Upload</label>
              <input
                type="file"
                className="text-white"
                onChange={handleImageUpload}
              />
            </div>
          </div>
        </div>
        {/* ROW III Ends */}

        {/* ROW IV */}
        <div className="row ">
          {uploadedImage && (
            <img
              src={uploadedImage}
              alt="Uploaded"
              className="mb-2 justify-content-center"
              style={{ width: "300px", height: "30-" }}
            />
          )}
        </div>
        {/* ROW IV Ends */}

        <div className="row m-3 w-25 align-self-center justify-content-center ">
          <button
            type="submit"
            className={"btn btn-primary " + styles.submit}
            onClick={handleSubmit}
          >
            Submit
          </button>
        </div>

        <div className="row m-3 d-flex justify-content-center">
          {loading ? (
            <p className={styles.predictionText}>Processing...</p>
          ) : (
            <>
              {imageURL && <img src={imageURL} alt="Uploaded" />}
              {prediction && (
                <p className={styles.predictionText}>
                  Result: {prediction}
                </p>
              )}
              {plotURL && <img src={plotURL} alt="Plot" />}
              {historyURL && <img src={historyURL} alt="Training History" />}

              {solution && <p className={styles.solutionText}>{solution}</p>}
              
              {rgb_image && <img src={rgb_image} alt="RGB Satellite Image" />}
              {ndvi_image && <img src={ndvi_image} alt="NDVI Image" />}
              {scaled_ndvi_image && <img src={scaled_ndvi_image} alt="Scaled NDVI Image" />}
            </>
          )}
        </div>
      </form>
    </>
  );
};

export default Service;
