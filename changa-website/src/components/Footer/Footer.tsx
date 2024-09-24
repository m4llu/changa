import React from 'react';
import { FaFacebook, FaTwitter, FaInstagram, FaYoutube } from 'react-icons/fa';
import './Footer.scss'; // Make sure to create and style this CSS file

const Footer: React.FC = () => {
    return (
        <footer className="footer">
            <div className="footer-content">
                <div className="footer-section about">
                    <h2 className="footer-title">About Us</h2>
                    <p>
                        Welcome to <span className='changa'>CHANGA</span>, your number one source for all things vinyl. We're dedicated to giving you the very best of records, with a focus on quality, customer service, and uniqueness.
                    </p>
                </div>
                <div className="footer-section links">
                    <h2 className="footer-title">Quick Links</h2>
                    <ul>
                        <li><a href="/shop">Shop</a></li>
                        <li><a href="/about">About</a></li>
                        <li><a href="/contact">Contact</a></li>
                        <li><a href="/faq">FAQ</a></li>
                    </ul>
                </div>
                <div className="footer-section social">
                    <h2 className="footer-title">Follow Us</h2>
                    <div className="social-icons">
                        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer"><FaFacebook /></a>
                        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer"><FaTwitter /></a>
                        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"><FaInstagram /></a>
                        <a href="https://youtube.com" target="_blank" rel="noopener noreferrer"><FaYoutube /></a>
                    </div>
                </div>
            </div>
            <div className="footer-bottom">
                <p>&copy; 2024 Changa. All rights reserved.</p>
            </div>
        </footer>
    );
};

export default Footer;