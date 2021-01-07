import React from 'react'
import { Button } from "./Button"
import { Link } from "react-router-dom"
import './Footer.css';

function Footer() {
    return (
        <div className="footer-container">
            <section className="footer-subscription">
                <p className="footer-subscription-heading">
                    Footer.js Line 8 to customize text
                </p>

                <p className="footer-subscription-text">
                    Footer.js Line 12 to customize text
                </p>
                
                <div className="input-areas">
                    <form>
                        <input type="email" name="email" placeholder= "Your e-mail Footer.js L17" className="footer-input" />
                        <Button buttonStyle="btn--outline">Subscribe (Footer.js L18)</Button>
                    </form>
                </div>
            </section>

            <div class="footer-links">
                <div className="footer-link-wrapper">
                    <div class="footer-link-items">
                        <h2>About us Footer.js:28</h2>
                        <Link to="/">O nama1</Link>
                        <Link to="/contact">Kontakt1</Link>
                    </div>
                    
                    <div class="footer-link-items">
                        <h2>About us Footer.js:35</h2>
                        <Link to="/">O nama2</Link>
                        <Link to="/contact">Kontakt2</Link>
                    </div>
                </div>

                <div className="footer-link-wrapper">
                    <div class="footer-link-items">
                        <h2>About us Footer.js:43</h2>
                        <Link to="/">O nama3</Link>
                        <Link to="/contact">Kontakt3</Link>
                    </div>

                    <div class="footer-link-items">
                        <h2>About us Footer.js:49</h2>
                        <Link to="/">O nama4</Link>
                        <Link to="/contact">Kontakt4</Link>
                    </div>
                </div>
            </div>

            <section class="social-media">
                <div class="social-media-wrap">
                    <div class="footer-logo">
                        <Link to="/" className="social-logo">
                            GS <i class="fas fa-car" />
                        </Link>
                    </div>
                
                    <small class="website-rights">GUMISERVIS GS (c) 2020</small>

                    <div class="social-icons">
                        <Link
                            class="social-icon-link facebook"
                            to="/"
                            target="_blank"
                            aria-label="Facebook"
                        >
                            <i class="fab fa-facebook-f"></i>
                        </Link>

                        <Link
                            class="social-icon-link instagram"
                            to="/"
                            target="_blank"
                            aria-label="Instagram"
                        >
                            <i class="fab fa-instagram"></i>
                        </Link>

                        <Link
                            class='social-icon-link youtube'
                            to='/'
                            target='_blank'
                            aria-label='Youtube'
                        >
                            <i class='fab fa-youtube' />
                        </Link>

                        <Link
                            class='social-icon-link twitter'
                            to='/'
                            target='_blank'
                            aria-label='Twitter'
                        >
                            <i class='fab fa-twitter' />
                        </Link>

                        <Link
                            class='social-icon-link linkedin'
                            to='/'
                            target='_blank'
                            aria-label='LinkedIn'
                        >
                            <i class='fab fa-linkedin' />
                        </Link>

                    </div>
                </div>
            </section>
        </div>
    )
}

export default Footer