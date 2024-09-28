// src/Footer.js
import React, { useContext } from 'react';
import { DogContext } from './AppContext';

const Footer = () => {

    const { userData } = useContext(DogContext)

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section">
          <h4>Contact Us</h4>
          <p>Email: contact@dogadoptionapp.com</p>
          <p>Phone: +1 234 567 890</p>
        </div>
        <div className="footer-section">
          <h4>Quick Links</h4>
          <ul>
            <li><a href="/about">About Us</a></li>
            <li><a href="/dogs">Adopt a Dog</a></li>
            {
                userData ? (
                    <li><a href='/favorites'>My Favorited Dogs</a></li>
                ) : (
                    <>
                        <li><a href="/login">Login</a></li>
                        <li><a href="/signup">Sign Up</a></li>
                    </>
                )
            }
          </ul>
        </div>
        <div className="footer-section">
          <h4>Follow Us</h4>
          <ul>
            <li><a href="https://www.linkedin.com/in/adrian-suarez9382/">LinkedIn</a></li> 
            <li><a href="https://github.com/asuarez9382/AdoptADog">GitHub</a> </li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; 2024 Dog Adoption App. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
