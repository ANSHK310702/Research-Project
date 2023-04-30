import React from 'react';
import { Link, Route, Routes } from 'react-router-dom';
import Home from './components/Pages/Home';
import About from './components/Pages/About';
import Service from './components/Pages/Service';
import ContactUs from './components/Pages/ContactUs';
import PhotoGallery from './components/PhotoGallery';

const App = () => {
  return (
    <React.Fragment>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="service" element={<Service />} />
        <Route path="contactus" element={<ContactUs />} />
        <Route path="photogallery" element={<PhotoGallery />} />
        
      </Routes>
    </React.Fragment>
  )
}

export default App