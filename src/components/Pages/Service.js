import React from 'react'
import "./Service.css"
import Header from '../Basic/Header'
import Footer from '../Basic/Footer'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { FormControl, FormLabel } from '@mui/material';
import FileUpload from '../FileUpload';

const Service = () => {
  return (
    <React.Fragment>
        {/* <!-- header section strats --> */}
        <Header />
          <FileUpload />
        <Footer />
    </React.Fragment>
  )
}

export default Service