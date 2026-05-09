import React, { useEffect, useState } from 'react'
import "./Header.css";
import { Link } from "react-router-dom";

const Header = () => {

  const headerBG =
    "https://images.pexels.com/photos/5175556/pexels-photo-5175556.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load";

  return (
    <>
      <div className="header-part">
        <div className="header_text">
          <div className='header_text-container'>
            <h1 className="heading poppins-bold">The Best Pizza in Town!</h1>
            <p className="header-desc">
              Fresh ingredients, handcrafted dough, and bold flavours — build your perfect pizza
              and get it delivered to your door in minutes.
            </p>
          </div>
          <Link to="/custom_pizza" className='header-btn'>
            Order Now
          </Link>
        </div>
        <div className="container" style={{ position: "relative", zIndex: "-99" }}>
          <div style={{ backgroundImage: `url(${headerBG})` }}></div>

        </div>
      </div>
    </>
  )
}

export default Header;