import React from "react";
import "../App.css";
import "./HeroSection.css";
import { Button } from "./Button";

function HeroSection() {
  return (
    <div className="hero-container">
      {/* <video src="/videos/video-2.mp4" autoPlay loop muted /> */}

      <h1>Gumiservis GS.</h1>
      <p>Vodeći hrvatski gumiservis.</p>

      <div className="hero-btns">
        <Button
          linkon="1"
          className="btns"
          buttonstyle="btn--outline"
          buttonsize="btn--large"
          linkpath="/offer"
        >
          KRENI
        </Button>

        <Button
          linkon="1"
          className="btns"
          buttonstyle="btn--primary"
          buttonsize="btn--large"
          linkpath="/appointment"
        >
          PROCES NARUDŽBE <i className="far fa-play-circle" />
        </Button>
      </div>
    </div>
  );
}

export default HeroSection;
