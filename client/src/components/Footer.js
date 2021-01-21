import React from "react";
import { Button } from "./Button";
import { Link } from "react-router-dom";
import "./Footer.css";

function Footer() {
  return (
    <div className="footer-container">
      <section className="footer-subscription">
        <p className="footer-subscription-heading">
          Footer.js Line 11 to customize text
        </p>

        <p className="footer-subscription-text">
          Footer.js Line 15 to customize text
        </p>

        <div className="input-areas">
          <form>
            <input
              type="email"
              name="email"
              placeholder="Your e-mail Footer.js L17"
              className="footer-input"
            />
            <Button linkon="1" linkpath="/subscribe" buttonstyle="btn--outline">
              Subscribe (Footer.js L27)
            </Button>
          </form>
        </div>
      </section>

      <div className="footer-links">
        <div className="footer-link-wrapper">
          <div className="footer-link-items">
            <h2>About us Footer.js:28</h2>
            <Link to="/">O nama1</Link>
            <Link to="/contact">Kontakt1</Link>
          </div>

          <div className="footer-link-items">
            <h2>About us Footer.js:35</h2>
            <Link to="/">O nama2</Link>
            <Link to="/contact">Kontakt2</Link>
          </div>
        </div>

        <div className="footer-link-wrapper">
          <div className="footer-link-items">
            <h2>About us Footer.js:43</h2>
            <Link to="/">O nama3</Link>
            <Link to="/contact">Kontakt3</Link>
          </div>

          <div className="footer-link-items">
            <h2>About us Footer.js:49</h2>
            <Link to="/">O nama4</Link>
            <Link to="/contact">Kontakt4</Link>
          </div>
        </div>
      </div>

      <section className="social-media">
        <div className="social-media-wrap">
          <div className="footer-logo">
            <Link to="/" className="social-logo">
              GS <i className="fas fa-car" />
            </Link>
          </div>

          <small className="website-rights">GUMISERVIS GS (c) 2020</small>

          <div className="social-icons">
            <Link
              className="social-icon-link facebook"
              to="/"
              target="_blank"
              aria-label="Facebook"
            >
              <i className="fab fa-facebook-f"></i>
            </Link>

            <Link
              className="social-icon-link instagram"
              to="/"
              target="_blank"
              aria-label="Instagram"
            >
              <i className="fab fa-instagram"></i>
            </Link>

            <Link
              className="social-icon-link youtube"
              to="/"
              target="_blank"
              aria-label="Youtube"
            >
              <i className="fab fa-youtube" />
            </Link>

            <Link
              className="social-icon-link twitter"
              to="/"
              target="_blank"
              aria-label="Twitter"
            >
              <i className="fab fa-twitter" />
            </Link>

            <Link
              className="social-icon-link linkedin"
              to="/"
              target="_blank"
              aria-label="LinkedIn"
            >
              <i className="fab fa-linkedin" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Footer;
