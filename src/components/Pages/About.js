import React from "react";
import "./About.css";
import Header from "../Basic/Header";
import Footer from "../Basic/Footer";

const About = () => {
  return (
    <React.Fragment>
      <div className="hero_area">
        {/* <!-- header section strats --> */}
        <Header />
        {/* <!-- end header section --> */}
        {/* <!-- slider section --> */}
        <section className="slider_section position-relative">
          <div
            id="carouselExampleIndicators"
            className="carousel slide"
            data-ride="carousel"
          >
            <div className="carousel-inner">
              <div className="carousel-item active">
                <div className="container">
                  <div className="row">
                    <div className="col-md-7">
                      <div className="detail-box">
                        <div>
                          <h1>
                            Welcome To
                            <span> Plant Disease Detection Platform</span>
                          </h1>
                          <p>
                            Click on Browse and upload the picture of your
                            affected crop here.
                          </p>
                          <div className="btn-box">
                            <a href="" className="btn-1">
                              Browse
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* <!-- end section --> */}
      </div>
      <Footer />
    </React.Fragment>
  );
};

export default About;
