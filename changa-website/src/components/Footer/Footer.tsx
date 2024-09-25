import React from 'react';
import { FaFacebook, FaTwitter, FaInstagram, FaYoutube, FaCcApplePay, FaCcPaypal, FaCcAmex } from 'react-icons/fa';
import { FaCcVisa, FaCcMastercard, FaBitcoin, FaGooglePay } from 'react-icons/fa';
import { SiMonero } from 'react-icons/si'; // Monero icon from react-icons
import './Footer.scss';
import Button from '../core/Button/Button';
import Input from '../core/Input/Input';

const Footer: React.FC = () => {
    return (
        <footer className="footer">
            <div className="footer-content">
                {/* First row: About, Links, Social */}
                <div className="footer-row">
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
                            <a href="https://www.youtube.com/watch?v=dQw4w9WgXcQ" target="_blank" rel="noopener noreferrer"><FaYoutube /></a>
                        </div>
                    </div>
                    <div className="footer-section payment-methods">
                        <h2 className="footer-title">We Accept</h2>
                        <div className="payment-icons">
                            <FaCcVisa />
                            <FaCcMastercard />
                            <FaGooglePay />
                            <FaCcApplePay />
                            <FaCcPaypal />
                            <FaCcAmex />
                            <FaBitcoin />
                            <SiMonero />
                        </div>
                    </div>
                </div>

                {/* Second row: Payment Methods, Newsletter */}
                <div className="footer-row">
                    
                    <div className="footer-section newsletter">
                        <h2 className="footer-title">Newsletter</h2>
                        <p>Subscribe to our newsletter to stay updated on the latest vinyl releases and offers.</p>
                        <form className="newsletter-form">
                            <Input type="email" placeholder="Enter your email" inputSize='small'/>
                            <Button variant="tertiary" onClick={() => console.log('Button clicked')}>
                                SUBSCRIBE
                            </Button>
                        </form>
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
