import React from "react";
import { Button } from "./Button";
import { Link } from "react-router-dom";
import "./Footer.css";

function Footer() {
  return (
    <div className="footer-container">
      <section className="footer-subscription">
        <p className="footer-subscription-heading">GUMISERVIS GS</p>

        <p className="footer-subscription-text">RIJEKA</p>

        <div className="input-areas">
          <form>
            <input
              type="email"
              name="email"
              placeholder="Vaša adresa e-pošte..."
              className="footer-input"
            />
            <Button linkon="0" buttonstyle="btn--outline">
              Prijavite se na newsletter
            </Button>
          </form>
        </div>
      </section>

      <div className="footer-links">
        <div className="footer-link-wrapper">
          <div className="footer-link-items">
            <h2>O nama</h2>
            <Link to="/">Početna</Link>
            <Link to="/contact">Kontakt</Link>
          </div>

          <div className="footer-link-items">
            <h2>Kontakt</h2>
            <Link to="/">Početna</Link>
            <Link to="/contact">Kontakt</Link>
          </div>
        </div>

        <div className="footer-link-wrapper">
          <div className="footer-link-items">
            <h2>Pitanja</h2>
            <Link to="/">Početna</Link>
            <Link to="/help">Pomoć</Link>
          </div>

          <div className="footer-link-items">
            <h2>Za administratore</h2>
            <Link to="/">Početna</Link>
            <Link to="/login">Prijava</Link>
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
