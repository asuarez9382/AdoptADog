// src/AboutPage.js
import React from 'react';

const AboutPage = () => {
  return (
    <div className='about-page'>
        <div className="about-container">
        <h1>About the AdoptADog Application</h1>
        <p>
            Welcome to AdoptADog! This platform is designed to connect
            loving families with dogs in need of a home. Our features include:
        </p>
        <ul>
            <li>Adopt dogs and give them a forever home</li>
            <li>Favorite dogs to keep track of the ones you love</li>
            <li>Log in to manage your profile and activities</li>
            <li>Put dogs up for adoption to help them find new families</li>
            <li>Make and manage vet appointments for your dogs</li>
        </ul>
        <p>
            This application was developed as a project during my software engineering program, and is designed to mock a dog adoption website.
            The front end is built with React, while the back end is powered by Python Flask and SQLAlchemy.
        </p>
        </div>
    </div>
  );
};

export default AboutPage;
