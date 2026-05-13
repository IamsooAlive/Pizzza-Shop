import React from 'react';
import "./Footer.css";
import { Link, useNavigate } from "react-router-dom";

const Footer = () => {
  const navigate=useNavigate()
  return (
    <>
      <div className="footer">
        <div className='footer-links'>
          <div className='footer-links_main'>
            <p className='footer-logo logo poppins-bold' style={{cursor:"pointer"}}  onClick={()=>{navigate("/")}}>
              <i className="fa-solid fa-pizza-slice footer-pizza-icon"></i> PizzaLand
            </p>
            <p>Crechterwoord K12 182 DK Alknjkcb <br /> <br />
              <Link
                to="tel: 1800 XXX XXXX" style={{ cursor: "pointer" }}><i className="fa-solid fa-phone-volume" style={{ fontSize: "1.4rem" }}></i> 1800 XXX XXXX</Link></p>
            <ul type="none" style={{ display: "flex", gap: "1.1rem", fontSize: "1.88rem", color: "#fff" }}>
              <Link to="#">
                <i className="fa-brands fa-square-facebook"></i>
              </Link>
              <Link to="#">
                <i className="fa-brands fa-square-x-twitter"></i>
              </Link>
              <Link to="#">
                <i className="fa-brands fa-square-instagram"></i>
              </Link>
              <Link to="#">
                <i className="fa-brands fa-youtube"></i>
              </Link>
            </ul>
          </div>
          <div className="footer-links_div">
            <h4>Menu</h4>
            <p><a href="/#veg_pizzas">Veg Pizzas</a></p>
            <p><a href="/#chicken_pizzas">Chicken Pizzas</a></p>
            <p><a href="/#pizza_crusts">Pizza Crusts</a></p>
            <p><a href="/#pizza_toppings">Pizza Toppings</a></p>
            <p><Link to="/custom_pizza">Customize a Pizza</Link></p>


          </div>
          <div className="footer-links_div">
            <h4>Company</h4>
            <p><span>Blog</span></p>
            <p><Link to="/about">About Us</Link></p>
            <p><span>Investor</span></p>
            <p><span>Feedback</span></p>
            <p><span>Ads</span></p>
          </div>
        
          
          <div className="footer-links_div">
            <h4>Legal</h4>
            <p><span>Disclaimer</span></p>
            <p><span>Terms & Conditions</span></p>
            <p><span>Privacy Policy</span></p>
          </div>

        </div>
        <div className="footer-copyright">
          <p>Copyright &copy;2024 PizzaLand. All rights reserved.</p>
        </div>
      </div>



    </>
  )
}

export default Footer
