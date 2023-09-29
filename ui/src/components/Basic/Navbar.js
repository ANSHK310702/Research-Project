import React from 'react'
import { Link, useNavigate } from 'react-router-dom';
import "./Navbar.css"
import { useEffect, useState } from 'react';
import { Auth } from 'aws-amplify';

const Navbar = () => {

  const navigate = useNavigate();

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    checkAuth();
  }, [isLoggedIn]);

  const checkAuth = async () => {
    try {
      await Auth.currentAuthenticatedUser();
      setIsLoggedIn(true);
    } catch (err) {
      console.log("The error is " + err);
      setIsLoggedIn(false);
      
    }
  };

  const inOut = async (e) => {
    e.preventDefault();

    if(isLoggedIn) {
      
      try {
        await Auth.signOut();
        
        navigate("/");
        setIsLoggedIn(false);

      } catch(err) {
        console.log("Error signing out");
      }
    } else {
      navigate("/login");
    }
  }

  return (
    <nav className="navbar navbar-expand-lg custom_nav-container pt-3">
    <a className="navbar-brand mr-5" href="index.html">
      
      <span>
        AUSDAIS
      </span>
    </a>
    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent"
      aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <div className="d-flex ml-auto flex-column flex-lg-row align-items-center">
        <ul className="navbar-nav  ">
          <li className="nav-item active">
            <Link className="nav-link" to="/">Home</Link>
          </li>
          <li className="nav-item">
            <Link className='nav-link' to="/about">About</Link>
          </li>
          <li className="nav-item">
            <Link className='nav-link' to="/service">Service</Link>
          </li>
          <li className="nav-item">
            <Link className='nav-link' to="/contactus">Contact Us</Link>
          </li>
        </ul>
        <form className="form-inline">
          <button className="btn  my-2 my-sm-0 nav_search-btn" type="submit"></button>
        </form>
        
        {!isLoggedIn && <form className="form-inline signupbtn">
          <button className="btn signupbtn  my-2 mx-2 my-sm-0 text-white " type="submit">
            <Link className='nav-link' to='/signup'>Sign Up</Link>
          </button>
        </form>}


        <form className="form-inline loginbtn">
          
          <button onClick={inOut} className="btn p-3 nav-link  my-2 my-sm-0 text-white " type="submit">
            {isLoggedIn ? "Log out" : "Log in"}
          </button>
        </form>



      </div>
    </div>
  </nav>
  )
}

export default Navbar