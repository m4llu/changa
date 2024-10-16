import React from 'react';
import './AboutPage.scss';
import useStickyNav from '../../../hooks/useStickyNav';

const AboutPage: React.FC = () => {
    useStickyNav(true);
    return (
        <div className="about-page">
            <header className="about-header">
                <h1>About Us</h1>
            </header>
            <section className="about-content">
                <p>Welcome to our website! We are passionate about music and dedicated to bringing you the best albums from various genres. Our mission is to provide a platform where music lovers can discover, explore, and purchase their favorite albums.</p>
                <p>Our team is composed of music enthusiasts who are always on the lookout for the latest and greatest in the music world. We believe in the power of music to bring people together and create unforgettable experiences.</p>
                <p>Thank you for visiting our site. We hope you enjoy your time here and find the music that moves you.</p>
            </section>
        </div>
    );
};

export default AboutPage;