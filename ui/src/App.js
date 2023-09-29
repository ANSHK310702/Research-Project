import React from 'react';
import { Link, Route, Routes, useNavigate } from 'react-router-dom';
import Home from './components/Pages/Home';
import About from './components/Pages/About';
import Service from './components/Pages/Service';
import ContactUs from './components/Pages/ContactUs';
import PhotoGallery from './components/PhotoGallery';
import SignUp from './components/Pages/SignUp';
import LogIn from './components/Pages/LogIn';
import { Amplify, Auth } from 'aws-amplify';
import awsconfig from './aws-exports.js';
import ResetPassword from "./components/Pages/reset-password"; 
import Redirect from './components/Pages/Redirect';


Amplify.configure(awsconfig);


const App = () => {



  return (
    <React.Fragment>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="service" element={<Service />} />
        <Route path="contactus" element={<ContactUs />} />
        <Route path="photogallery" element={<PhotoGallery />} />
        <Route path="signup" element={<SignUp />} />
        <Route path="login" element={<LogIn />} />
        <Route path="reset-password" element={<ResetPassword />} />
        <Route path="redirect" element={<Redirect  />} />
        
      </Routes>
    </React.Fragment>
  )
}

export default App